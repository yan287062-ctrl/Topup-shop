import os
import re
import io
import time
import asyncio
import sqlite3
import logging
import datetime
import urllib.parse
import pandas as pd
import requests
import cloudscraper

from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ContextTypes
)
from telegram.request import HTTPXRequest

# ----------------------------------------------------
# 1. Logging & Base Configurations
# ----------------------------------------------------
logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(message)s",
    level=logging.INFO
)
logger = logging.getLogger(__name__)

BOT_TOKEN = "8911924033:AAHoDJg0RCOJQH37SrxHQaVFqlHlI-0dgMU"  # မိမိ Bot Token
SUPER_ADMIN_ID = 1934339791         # Main Owner ID
INITIAL_ADMINS = [8098929686]
DB_NAME = "admin_safety_bot.db"
LOW_BALANCE_THRESHOLD = 100.0       # Coin ၁၀၀ အောက်ရောက်ပါက Alert ပေးမည်

# Diamond Products Pricing & Mappings
DIAMOND_MAP = {
    "55": {"pid": "22590", "cost": 39.0},
    "165": {"pid": "22591", "cost": 116.9},
    "275": {"pid": "22592", "cost": 187.5},
    "565": {"pid": "22593", "cost": 385.0},
    "86": {"pid": "13", "cost": 61.5},
    "172": {"pid": "23", "cost": 122.0},
    "257": {"pid": "25", "cost": 177.5},
    "706": {"pid": "26", "cost": 480.0},
    "2195": {"pid": "27", "cost": 1453.0},
    "3688": {"pid": "28", "cost": 2424.0},
    "5532": {"pid": "29", "cost": 3660.0},
    "9288": {"pid": "30", "cost": 6079.0},
    "weekly": {"pid": "16642", "cost": 76.0},
    "wdp": {"pid": "16642", "cost": 76.0},
    "wp": {"pid": "16642", "cost": 76.0},
    "twilight": {"pid": "33", "cost": 402.5},
    "tp": {"pid": "33", "cost": 402.5},
    "elite": {"pid": "26555", "cost": 39.0},
    "epic": {"pid": "26556", "cost": 187.5}
}

COMBO_MAP = {
    "343": ["257", "86"],         
    "429": ["257", "172"],        
    "514": ["257", "257"],        
    "600": ["257", "257", "86"],   
    "878": ["706", "172"],        
    "963": ["706", "257"],        
    "1049": ["706", "257", "86"], 
    "1135": ["706", "257", "172"],
    "1412": ["706", "706"]         
}

DOUBLE_DIAMONDS_PIDS = {
    " 50 +  50": "22590",
    "150 + 150": "22591",
    "250 + 250": "22592",
    "500 + 500": "22593"
}

COUNTRY_FLAGS = {
    "MM": "MYANMAR 🇲🇲", "MYANMAR": "MYANMAR 🇲🇲", "BURMA": "MYANMAR 🇲🇲",
    "SG": "SINGAPORE 🇸🇬", "SINGAPORE": "SINGAPORE 🇸🇬",
    "MY": "MALAYSIA 🇲🇾", "MALAYSIA": "MALAYSIA 🇲🇾",
    "ID": "INDONESIA 🇮🇩", "INDONESIA": "INDONESIA 🇮🇩",
    "PH": "PHILIPPINES 🇵🇭", "PHILIPPINES": "PHILIPPINES 🇵🇭",
    "TH": "THAILAND 🇹🇭", "THAILAND": "THAILAND 🇹🇭",
    "VN": "VIETNAM 🇻🇳", "VIETNAM": "VIETNAM 🇻🇳",
    "BR": "BRAZIL 🇧🇷", "BRAZIL": "BRAZIL 🇧🇷",
    "RU": "RUSSIA 🇷🇺", "RUSSIA": "RUSSIA 🇷🇺",
    "US": "USA 🇺🇸", "USA": "USA 🇺🇸",
    "GLOBAL": "GLOBAL 🌐"
}

# ----------------------------------------------------
# 2. Database Initialization & Handlers
# ----------------------------------------------------
def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("PRAGMA journal_mode=WAL;")
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY,
            name TEXT,
            cookie TEXT DEFAULT '',
            role TEXT DEFAULT 'reseller',
            shop_name TEXT DEFAULT 'Smile Store',
            expire_date TEXT,
            created_at TEXT
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            uid TEXT,
            zone TEXT,
            player TEXT,
            diamond_count TEXT,
            cost REAL DEFAULT 0.0,
            order_id TEXT,
            status TEXT,
            processed_time REAL DEFAULT 0.0,
            time TEXT
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    """)
    cursor.execute("INSERT OR IGNORE INTO settings (key, value) VALUES ('maintenance', 'off')")
    
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    for admin_id in INITIAL_ADMINS:
        role = "owner" if admin_id == SUPER_ADMIN_ID else "reseller"
        cursor.execute("""
            INSERT OR IGNORE INTO users (user_id, name, cookie, role, expire_date, created_at)
            VALUES (?, ?, '', ?, '2099-12-31', ?)
        """, (admin_id, f"Admin_{admin_id}", role, now))
        
    conn.commit()
    conn.close()

def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def is_maintenance():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT value FROM settings WHERE key='maintenance'")
    res = cursor.fetchone()
    conn.close()
    return res['value'] == 'on' if res else False

def is_authorized_user(user_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, expire_date FROM users WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return False
    
    if row['expire_date']:
        try:
            exp = datetime.datetime.strptime(row['expire_date'], "%Y-%m-%d")
            if datetime.datetime.now() > exp:
                return False
        except ValueError:
            pass
    return True

def set_user_cookie(user_id, cookie_str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET cookie = ? WHERE user_id = ?", (cookie_str, user_id))
    conn.commit()
    conn.close()

def get_user_cookie(user_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT cookie FROM users WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    return row['cookie'] if row and row['cookie'] else None

def get_user_profile(user_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    return row

def log_order(user_id, uid, zone, player, diamond, cost, order_id, status, proc_time):
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("""
        INSERT INTO orders (user_id, uid, zone, player, diamond_count, cost, order_id, status, processed_time, time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (user_id, uid, zone, player, diamond, cost, order_id, status, proc_time, now))
    conn.commit()
    conn.close()

def parse_cookies(cookie_str):
    cookies = {}
    if not cookie_str:
        return cookies
    for cookie in cookie_str.split(";"):
        cookie = cookie.strip()
        if "=" in cookie:
            parts = cookie.split("=", 1)
            cookies[parts[0]] = parts[1]
    return cookies

def save_session_cookies(scraper, user_id):
    try:
        cookie_dict = scraper.cookies.get_dict()
        if cookie_dict:
            cookie_str = "; ".join([f"{k}={v}" for k, v in cookie_dict.items()])
            set_user_cookie(user_id, cookie_str)
            return cookie_str
    except Exception as e:
        logger.error(f"Cookie Save Error: {e}")
    return get_user_cookie(user_id)

# ----------------------------------------------------
# 3. Network Helper Functions
# ----------------------------------------------------
def safe_post_sync(scraper, url, headers, data, max_retries=3, allow_redirects=True):
    for attempt in range(1, max_retries + 1):
        try:
            return scraper.post(url, headers=headers, data=data, timeout=15, allow_redirects=allow_redirects)
        except Exception as e:
            if attempt == max_retries:
                raise e
            time.sleep(1)

def safe_get_sync(scraper, url, headers, max_retries=3):
    for attempt in range(1, max_retries + 1):
        try:
            return scraper.get(url, headers=headers, timeout=12)
        except Exception as e:
            if attempt == max_retries:
                raise e
            time.sleep(1)

def check_smile_balance_sync(cookie_str):
    if not cookie_str:
        return None
    try:
        scraper = cloudscraper.create_scraper()
        cookie_dict = parse_cookies(cookie_str)
        scraper.cookies.update(cookie_dict)
        
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": "https://www.smile.one/"
        }
        
        response = safe_get_sync(scraper, "https://www.smile.one/customer/order", headers=headers)
        if response and response.status_code == 200:
            html_content = response.text
            if "Saldo" in html_content or "smilecoin" in html_content or "balance" in html_content:
                username_match = re.search(r'class="[^"]*user-name[^"]*">(?:<[^>]+>)*\s*([^<]+)', html_content, re.IGNORECASE)
                username = username_match.group(1).strip() if username_match else "Smile User"
                
                balance = "0.00"
                class_patterns = [
                    r'class="[^"]*(?:coin-num|saldo-num|coin-balance|user-coin|balance-num)[^"]*">(?:<[^>]+>)*\s*([\d.,]+)',
                    r'class="[^"]*(?:coin|saldo|balance|money)[^"]*">(?:<[^>]+>)*\s*([\d.,]+)',
                    r'Saldo(?:<[^>]+>|\s|:)*([\d.,]+)',
                    r'smilecoin(?:<[^>]+>|\s|:|=)*([\d.,]+)'
                ]
                
                candidates = []
                for pat in class_patterns:
                    matches = re.findall(pat, html_content, re.IGNORECASE)
                    for m in matches:
                        clean_m = m.strip().replace(",", ".")
                        if clean_m and clean_m != ".":
                            candidates.append(clean_m)
                
                if candidates:
                    preferred = [c for c in candidates if "." in c and c not in ["1.0", "1.00", "0.0", "0.00"]]
                    balance = preferred[0] if preferred else candidates[0]
                
                return {"status": "Alive", "name": username, "balance": balance}
        return None
    except Exception as e:
        logger.error(f"Balance Check Error: {e}")
        return None

def get_player_name_api_sync(uid, zone):
    try:
        url = f"https://api.isan.eu.org/nickname/ml?id={uid}&zone={zone}"
        res = requests.get(url, timeout=10)
        if res.status_code == 200:
            data = res.json()
            name = (
                data.get("name") or data.get("nickname") or
                data.get("data", {}).get("name") or data.get("data", {}).get("nickname")
            )
            raw_region = (
                data.get("region") or data.get("country") or data.get("country_code") or
                data.get("data", {}).get("region") or data.get("data", {}).get("country")
            )
            region = COUNTRY_FLAGS.get(str(raw_region).upper().strip(), f"{raw_region} 🌐") if raw_region else "GLOBAL 🌐"
            return str(name) if name else None, region
        return None, "GLOBAL 🌐"
    except Exception:
        return None, "GLOBAL 🌐"

def mask_code(code: str) -> str:
    clean_code = code.strip()
    if len(clean_code) <= 8:
        return clean_code[:2] + "****" + clean_code[-2:]
    return clean_code[:4] + "****" + clean_code[-4:]

def redeem_smile_code_sync(cookie_str, card_code):
    if not cookie_str:
        return False, "Cookie မရှိပါ။"
    try:
        scraper = cloudscraper.create_scraper()
        scraper.cookies.update(parse_cookies(cookie_str))
        
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "X-Requested-With": "XMLHttpRequest",
            "Referer": "https://www.smile.one/customer/order"
        }
        
        csrf_token = ""
        csrf_match = re.search(r"_csrf=([^;]+)", cookie_str)
        if csrf_match:
            csrf_token = urllib.parse.unquote(csrf_match.group(1))
            
        payload = {
            "_csrf": csrf_token,
            "card_no": card_code.strip(),
            "cardno": card_code.strip()
        }
        
        res = safe_post_sync(scraper, "https://www.smile.one/customer/order/cardcharge", headers=headers, data=payload)
        
        if res and res.status_code == 200:
            try:
                res_json = res.json()
                status_val = res_json.get("status") or res_json.get("code")
                if status_val == 200 or res_json.get("success") is True:
                    return True, "Success"
                else:
                    msg = res_json.get("msg") or res_json.get("info") or "Code မမှန်ပါ သို့မဟုတ် သုံးပြီးသားဖြစ်ပါသည်။"
                    return False, msg
            except Exception:
                if "success" in res.text.lower() or "ok" in res.text.lower():
                    return True, "Success"
                return False, "Code ဖြည့်၍ မရပါ။"
        return False, "Smile Server Error"
    except Exception as e:
        logger.error(f"Redeem Error: {e}")
        return False, str(e)

# ----------------------------------------------------
# Execution Plan Builder (Multi-Item & Multi-Qty)
# ----------------------------------------------------
def build_execution_plan(diamond_input):
    execution_plan = []
    display_items = []
    total_cost = 0.0
    
    sub_inputs = re.split(r'[\+,\s]+', diamond_input.strip().lower())
    
    for item_str in sub_inputs:
        if not item_str:
            continue
            
        qty = 1
        item_key = item_str
        
        mult_match = re.match(r'^(\d+)[x\*]?([a-z0-9_]+)$', item_str)
        if mult_match:
            qty = int(mult_match.group(1))
            item_key = mult_match.group(2)
        else:
            mult_match_suffix = re.match(r'^([a-z0-9_]+)[x\*](\d+)$', item_str)
            if mult_match_suffix:
                item_key = mult_match_suffix.group(1)
                qty = int(mult_match_suffix.group(2))

        if item_key in COMBO_MAP:
            combo_items = COMBO_MAP[item_key]
            for _ in range(qty):
                for sub in combo_items:
                    pid, cost = DIAMOND_MAP[sub]["pid"], DIAMOND_MAP[sub]["cost"]
                    execution_plan.append((pid, cost, sub))
                    total_cost += cost
            display_items.append(f"{item_key} Diamonds" if qty == 1 else f"{item_key} Diamonds x{qty}")

        elif item_key in DIAMOND_MAP:
            pid, cost = DIAMOND_MAP[item_key]["pid"], DIAMOND_MAP[item_key]["cost"]
            for _ in range(qty):
                execution_plan.append((pid, cost, item_key))
                total_cost += cost
            
            if item_key in ["wp", "wdp", "weekly"]:
                display_items.append(f"Weekly Pass {qty}X")
            elif item_key.isdigit():
                display_items.append(f"{item_key} Diamonds" if qty == 1 else f"{item_key} Diamonds x{qty}")
            else:
                display_items.append(f"{item_key.upper()} {qty}X" if qty > 1 else item_key.upper())
        else:
            return [], "", 0.0

    product_display = " + ".join(display_items)
    return execution_plan, product_display, total_cost

# ----------------------------------------------------
# 4. Telegram Bot Commands
# ----------------------------------------------------
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if not is_authorized_user(user_id):
        await update.message.reply_text("❌ သင့်တွင် ဤ Bot ကို အသုံးပြုခွင့်မရှိပါ သို့မဟုတ် သက်တမ်းကုန်သွားပါပြီ။")
        return
        
    welcome_text = (
        "🤖 <b>Smile One Reseller TopUp Bot</b>\n\n"
        "<b>📌 Reseller Commands:</b>\n"
        "• <code>.addck [COOKIE]</code> - Cookie အသစ် ထည့်သွင်းရန်\n"
        "• <code>.topup [CODE]</code> - Voucher Code ဖြင့် Coin ဖြည့်ရန်\n"
        "• <code>.setshop [SHOP_NAME]</code> - ဆိုင်နာမည် ပြောင်းလဲရန်\n"
        "• <code>.role [UID] [ZONE]</code> - Account Name & 2X Double စစ်ရန်\n"
        "• <code>.ml [UID] [ZONE] [ITEM]</code> - Topup ရိုက်ရန် (eg: <code>.ml 1234 5678 2x86</code> သို့ <code>86+172</code>)\n"
        "• <code>.today</code> - ဒီနေ့ အရောင်းစာရင်းချုပ် ကြည့်ရန်\n"
        "• <code>.check [ORDER_ID]</code> - Order စာရင်း စစ်ဆေးရန်\n"
        "• <code>.history</code> - နောက်ဆုံး ၁၀ စာရင်း ကြည့်ရန်\n"
        "• <code>.export</code> - Order များ Excel ထုတ်ယူရန်\n"
    )

    if user_id == SUPER_ADMIN_ID:
        welcome_text += (
            "\n<b>👑 Owner Commands:</b>\n"
            "• <code>.addadmin [USER_ID] [NAME] [DAYS]</code>\n"
            "• <code>.deladmin [USER_ID]</code>\n"
            "• <code>.broadcast [MESSAGE]</code>\n"
            "• <code>.maintenance [on/off]</code>\n"
        )

    await update.message.reply_text(welcome_text, parse_mode="HTML")

# Admin Management
async def add_admin(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != SUPER_ADMIN_ID:
        return
    text = re.sub(r"^[./]addadmin\s*", "", update.message.text).strip()
    parts = text.split()
    
    if len(parts) < 3:
        await update.message.reply_text("❌ Format: `.addadmin [USER_ID] [NAME] [DAYS]`", parse_mode="Markdown")
        return
        
    try:
        t_id, t_name, days = int(parts[0]), parts[1], int(parts[2])
        exp_date = (datetime.datetime.now() + datetime.timedelta(days=days)).strftime("%Y-%m-%d")
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO users (user_id, name, role, expire_date, created_at)
            VALUES (?, ?, 'reseller', ?, ?)
            ON CONFLICT(user_id) DO UPDATE SET name=?, expire_date=?, role='reseller'
        """, (t_id, t_name, exp_date, now, t_name, exp_date))
        conn.commit()
        conn.close()
        
        await update.message.reply_text(f"✅ **Reseller အသစ် ထည့်သွင်းပြီးပါပြီ!**\n👤 {t_name} (`{t_id}`)\n📅 Expiry: {exp_date}", parse_mode="Markdown")
    except Exception:
        await update.message.reply_text("❌ မှန်ကန်သော တန်ဖိုးများ ရိုက်ထည့်ပါ။")

async def del_admin(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != SUPER_ADMIN_ID:
        return
    t_id = re.sub(r"^[./]deladmin\s*", "", update.message.text).strip()
    if not t_id.isdigit():
        await update.message.reply_text("❌ Format: `.deladmin [USER_ID]`", parse_mode="Markdown")
        return
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE user_id = ?", (int(t_id),))
    conn.commit()
    conn.close()
    await update.message.reply_text(f"❌ User ID `{t_id}` အား ဖျက်ထုတ်လိုက်ပါပြီ။", parse_mode="Markdown")

async def set_maintenance_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != SUPER_ADMIN_ID:
        return
    mode = re.sub(r"^[./]maintenance\s*", "", update.message.text).strip().lower()
    if mode not in ['on', 'off']:
        await update.message.reply_text("❌ Usage: `.maintenance on` သို့မဟုတ် `.maintenance off`", parse_mode="Markdown")
        return
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE settings SET value=? WHERE key='maintenance'", (mode,))
    conn.commit()
    conn.close()
    await update.message.reply_text(f"🛠️ Maintenance status: **{mode.upper()}**", parse_mode="Markdown")

async def broadcast_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != SUPER_ADMIN_ID:
        return
    msg_text = re.sub(r"^[./]broadcast\s*", "", update.message.text).strip()
    if not msg_text:
        await update.message.reply_text("❌ Usage: `.broadcast [စာသား]`", parse_mode="Markdown")
        return
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT user_id FROM users")
    users = cursor.fetchall()
    conn.close()
    
    count = 0
    for u in users:
        try:
            await context.bot.send_message(chat_id=u['user_id'], text=f"📢 <b>[အသိပေးစာ]</b>\n\n{msg_text}", parse_mode="HTML")
            count += 1
        except Exception:
            pass
    await update.message.reply_text(f"✅ လူပေါင်း {count} ဦးထံ စာပို့ပြီးပါပြီ။")

# User & Shop Settings
async def set_shop_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if not is_authorized_user(user_id):
        return
    shop_name = re.sub(r"^[./]setshop\s*", "", update.message.text).strip()
    if not shop_name:
        await update.message.reply_text("❌ Usage: `.setshop [Shop Name]`", parse_mode="Markdown")
        return
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET shop_name=? WHERE user_id=?", (shop_name, user_id))
    conn.commit()
    conn.close()
    await update.message.reply_text(f"✅ ဆိုင်နာမည်ကို **{shop_name}** ဟု ပြောင်းလိုက်ပါပြီ။", parse_mode="Markdown")

async def add_cookie(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if not is_authorized_user(user_id):
        return
        
    raw_cookie = re.sub(r"^[./]addck\s*", "", update.message.text).strip()
    if not raw_cookie:
        await update.message.reply_text("❌ Format: `.addck [Cookie String]`", parse_mode="Markdown")
        return

    set_user_cookie(user_id, raw_cookie)
    status_msg = await update.message.reply_text("🔄 Cookie ချိတ်ဆက် စစ်ဆေးနေပါသည်...")
    
    profile = await asyncio.to_thread(check_smile_balance_sync, raw_cookie)
    if profile:
        await status_msg.edit_text(
            f"✅ <b>Cookie ချိတ်ဆက်မှု အောင်မြင်ပါသည်!</b>\n\n"
            f"👤 <b>Account Name:</b> {profile['name']}\n"
            f"💰 <b>Coin Balance:</b> {profile['balance']} Coins\n"
            f"🚦 <b>Status:</b> Active",
            parse_mode="HTML"
        )
    else:
        await status_msg.edit_text("⚠️ <b>Cookie Warning:</b> Cookie ပျက်နေပါသည် သို့မဟုတ် သက်တမ်းကုန်သွားပါပြီ။ ပြန်လည်စစ်ဆေးပါ။", parse_mode="HTML")

# Code Redeem Handler
async def handle_topup_code(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if not is_authorized_user(user_id):
        await update.message.reply_text("❌ အသုံးပြုခွင့် မရှိသေးပါ သို့မဟုတ် သက်တမ်းကုန်သွားပါပြီ။")
        return

    text = re.sub(r"^[./](topup|redeem)\s*", "", update.message.text).strip()
    if not text:
        await update.message.reply_text("❌ Format: `.topup [CODE]` သို့မဟုတ် `/topup [CODE]`", parse_mode="Markdown")
        return

    card_code = text.split()[0]
    cookie_str = get_user_cookie(user_id)
    if not cookie_str:
        await update.message.reply_text("⚠️ Cookie မရှိသေးပါ၊ `.addck` ဖြင့် Cookie အရင်ထည့်ပေးပါ။", parse_mode="Markdown")
        return

    status_msg = await update.message.reply_text("⏳ Code ဖြည့်သွင်းနေပါသည်...")
    
    is_success, failure_reason = await asyncio.to_thread(redeem_smile_code_sync, cookie_str, card_code)
    masked = mask_code(card_code)
    
    if is_success:
        refreshed = await asyncio.to_thread(check_smile_balance_sync, cookie_str)
        new_balance = refreshed["balance"] if refreshed else "0.0"
        
        receipt = (
            "🧾 <b>Code Redeem</b>\n\n"
            f"<b>Status  :</b> Success\n"
            f"<b>Code    :</b> <code>{masked}</code>\n"
            f"<b>Balance :</b> {new_balance}"
        )
        await status_msg.edit_text(receipt, parse_mode="HTML")
    else:
        receipt = (
            "🧾 <b>Code Redeem</b>\n\n"
            f"<b>Status  :</b> Failed ({failure_reason})\n"
            f"<b>Code    :</b> <code>{masked}</code>"
        )
        await status_msg.edit_text(receipt, parse_mode="HTML")

# Role & 2X Double Check
async def check_role(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if not is_authorized_user(user_id):
        return
        
    text = re.sub(r"^[./]role\s*", "", update.message.text).strip()
    parts = text.split()
    if len(parts) < 2:
        await update.message.reply_text("❌ Format: `.role [UID] [ZONE]`", parse_mode="Markdown")
        return
        
    uid, zone = parts[0], parts[1]
    status_msg = await update.message.reply_text(f"🔍 UID: {uid} ကို စစ်ဆေးနေပါသည်...")
    
    current_cookie = get_user_cookie(user_id)
    if not current_cookie:
        await status_msg.edit_text("⚠️ Cookie မရှိသေးပါ၊ `.addck` ဖြင့် Cookie အရင်ထည့်ပါ။", parse_mode="Markdown")
        return

    username, region_str = await asyncio.to_thread(get_player_name_api_sync, uid, zone)
    if not username:
        username = "Unknown"

    def check_double_diamonds_sync():
        nonlocal username, region_str
        results = {}
        scraper = cloudscraper.create_scraper()
        scraper.cookies.update(parse_cookies(current_cookie))
        
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Referer": "https://www.smile.one/merchant/mobilelegends"
        }
        
        for label, pid in DOUBLE_DIAMONDS_PIDS.items():
            try:
                payload = {
                    "user_id": str(uid), "zone_id": str(zone), "pid": str(pid),
                    "checkrole": "check", "pay_methond": "smilecoin", "channel_method": "smilecoin"
                }
                res = safe_post_sync(scraper, "https://www.smile.one/merchant/mobilelegends/query", headers=headers, data=payload)
                if res and res.status_code == 200:
                    q_data = res.json()
                    s_name = q_data.get("username") or q_data.get("data", {}).get("username")
                    if s_name and username == "Unknown":
                        username = str(s_name)
                    
                    res_str = str(res.text).lower()
                    if "2x" in res_str or "double" in res_str or "first" in res_str:
                        results[label] = "✅"
                    else:
                        results[label] = "❌"
                else:
                    results[label] = "❌"
            except Exception:
                results[label] = "❌"
        return results

    double_res = await asyncio.to_thread(check_double_diamonds_sync)

    report_text = f"""<code>=== Mlbb ID Details ===</code>

<code>UID    : {uid} ({zone})</code>
<code>Name   : {username}</code>
<code>Region : {region_str}</code>
<code>========================</code>
<code>Double Diamonds Status</code>
<code>========================</code>
<code>>  50 +  50  : {double_res.get(" 50 +  50", "❌")}</code>
<code>> 150 + 150  : {double_res.get("150 + 150", "❌")}</code>
<code>> 250 + 250  : {double_res.get("250 + 250", "❌")}</code>
<code>> 500 + 500  : {double_res.get("500 + 500", "❌")}</code>"""

    await status_msg.edit_text(report_text, parse_mode="HTML")

# Topup Recharge Execution (.ml)
async def handle_recharge(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if not is_authorized_user(user_id):
        await update.message.reply_text("❌ အသုံးပြုခွင့် မရှိသေးပါ သို့မဟုတ် သက်တမ်းကုန်သွားပါပြီ။")
        return

    if is_maintenance():
        await update.message.reply_text("🛠️ လက်ရှိ စနစ်ပြုပြင်နေသဖြင့် ခေတ္တ ပိတ်ထားပါသည်...")
        return
        
    lines = [line.strip() for line in update.message.text.split('\n') if line.strip()]
    if not lines:
        return
        
    first_line = re.sub(r"^[./]ml\s*", "", lines[0]).strip()
    accounts_list = []
    
    if first_line:
        p = first_line.split(maxsplit=2)
        if len(p) >= 3:
            accounts_list.append((p[0], p[1], p[2].lower()))
            
    for line in lines[1:]:
        p = line.split(maxsplit=2)
        if len(p) >= 3:
            accounts_list.append((p[0], p[1], p[2].lower()))
            
    if not accounts_list:
        await update.message.reply_text("❌ Format: `.ml [UID] [ZONE] [ITEM]`", parse_mode="Markdown")
        return
        
    usr_profile = get_user_profile(user_id)
    current_cookie = usr_profile['cookie']
    shop_name = usr_profile['shop_name'] or "Smile Store"

    if not current_cookie:
        await update.message.reply_text("⚠️ Cookie မရှိသေးပါ၊ `.addck` ဖြင့် Cookie အရင်ထည့်ပေးပါ။", parse_mode="Markdown")
        return

    profile_check = await asyncio.to_thread(check_smile_balance_sync, current_cookie)
    if not profile_check:
        await update.message.reply_text("⚠️ Cookie သက်တမ်း ကုန်နေပါသည်၊ `.addck` ဖြင့် Cookie အသစ် ပြန်ထည့်ပါ။", parse_mode="Markdown")
        return

    for uid, zone, diamond_input in accounts_list:
        execution_plan, product_display, total_cost = build_execution_plan(diamond_input)
        if not execution_plan:
            await update.message.reply_text(f"❌ Product/Combo '{diamond_input}' မရှိပါ။")
            continue
            
        start_time = time.time()
        now_time = datetime.datetime.now().strftime("%I:%M%p %d.%m.%Y")
        status_msg = await update.message.reply_text(f"⏳ Processing [{uid}]...")

        username, _ = await asyncio.to_thread(get_player_name_api_sync, uid, zone)
        if not username:
            username = "Verified Buyer"

        current_have = float(profile_check["balance"])
        
        # Balance Check
        if current_have < total_cost:
            proc_time = round(time.time() - start_time, 2)
            log_order(user_id, uid, zone, username, product_display, 0.0, "FAILED", "Balance Insufficient", proc_time)
            
            invoice = (
                f"=== Transaction Report ===\n"
                f"UID     : {uid} ({zone})\n"
                f"Name    : {username}\n"
                f"Order   : {product_display}\n"
                f"Status  : ❌ Balance မလောက်ပါ\n"
                f"Time    : {now_time}\n"
                f"===== {shop_name} =====\n"
                f"Amount  : {total_cost:.1f} Coins\n"
                f"Assets  : {current_have:.1f} Coins"
            )
            await status_msg.edit_text(invoice)
            continue

        def process_topup_sync():
            nonlocal current_cookie, username
            success_count = 0
            order_id = "-"
            failure_reason = "မအောင်မြင်ပါ"
            
            csrf_token = ""
            csrf_match = re.search(r"_csrf=([^;]+)", current_cookie)
            if csrf_match:
                csrf_token = urllib.parse.unquote(csrf_match.group(1))

            for pid, cost, item_name in execution_plan:
                scraper = cloudscraper.create_scraper()
                scraper.cookies.update(parse_cookies(current_cookie))
                
                headers = {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "X-Requested-With": "XMLHttpRequest",
                    "Referer": "https://www.smile.one/merchant/mobilelegends"
                }
                
                # --------------------------------------------------------
                # ၁။ Endpoint Query (ID Check ပြုလုပ်ခြင်း နှင့် Flow ID တောင်းခြင်း)
                # --------------------------------------------------------
                query_payload = {
                    "_csrf": csrf_token,
                    "user_id": str(uid),
                    "zone_id": str(zone),
                    "pid": str(pid),
                    "checkrole": "check",
                    "pay_methond": "smilecoin",
                    "channel_method": "smilecoin"
                }
                
                query_res = safe_post_sync(
                    scraper, 
                    "https://www.smile.one/merchant/mobilelegends/query", 
                    headers=headers, 
                    data=query_payload
                )
                
                flowid = ""
                fetched_username = ""
                loop_error_info = "ID သို့မဟုတ် Zone မှားယွင်းနေပါသည်။"
                
                if query_res and query_res.status_code == 200:
                    try:
                        q_data = query_res.json()
                        fetched_username = q_data.get("username") or q_data.get("data", {}).get("username") or ""
                        flowid = q_data.get("flowid") or q_data.get("data", {}).get("flowid") or q_data.get("f_id") or ""
                        loop_error_info = q_data.get("info") or q_data.get("msg") or q_data.get("message") or loop_error_info
                        
                        if fetched_username:
                            username = str(fetched_username)
                    except Exception as e:
                        logger.error(f"Query Error: {e}")

                # ID Check မမှန်ပါက သို့မဟုတ် flowid မထွက်လာပါက ဆက်မဝယ်ဘဲ ချက်ချင်းရပ်မည်
                if not flowid:
                    failure_reason = f"ID Check မှားယွင်းပါသည် ({loop_error_info})"
                    break

                # --------------------------------------------------------
                # ၂။ Endpoint Pay (ID မှန်မှ ဝယ်ယူမှု ဆက်လက်ပြုလုပ်ခြင်း)
                # --------------------------------------------------------
                pay_payload = {
                    "_csrf": csrf_token,
                    "user_id": str(uid),
                    "zone_id": str(zone),
                    "pay_methond": "smilecoin",
                    "pid": str(pid),
                    "product_id": str(pid),
                    "channel_method": "smilecoin",
                    "flowid": str(flowid)
                }
                
                pay_res = safe_post_sync(
                    scraper, 
                    "https://www.smile.one/merchant/mobilelegends/pay", 
                    headers=headers, 
                    data=pay_payload, 
                    allow_redirects=False
                )
                save_session_cookies(scraper, user_id)

                if pay_res and pay_res.status_code in [200, 201, 302]:
                    success_count += 1
                    try:
                        p_data = pay_res.json()
                        order_id = p_data.get("order_id") or f"S{int(time.time())}"
                    except Exception:
                        order_id = f"S{int(time.time())}"
                else:
                    failure_reason = "Smile Server Error"
                    break

            is_all_success = (success_count == len(execution_plan))
            return is_all_success, order_id if is_all_success else failure_reason

        is_success, final_serial = await asyncio.to_thread(process_topup_sync)
        proc_time = round(time.time() - start_time, 2)
        
        refreshed = await asyncio.to_thread(check_smile_balance_sync, current_cookie)
        updated_balance = refreshed["balance"] if refreshed else "N/A"

        if is_success:
            log_order(user_id, uid, zone, username, product_display, total_cost, final_serial, "SUCCESS", proc_time)
            
            invoice = (
                f"=== Transaction Report ===\n"
                f"UID     : {uid} ({zone})\n"
                f"Name    : {username}\n"
                f"Order   : {product_display}\n"
                f"SN      : {final_serial}\n"
                f"Time    : {now_time}\n"
                f"===== {shop_name} =====\n"
                f"Amount  : {total_cost:.1f} Coins\n"
                f"Assets  : {updated_balance} Coins"
            )
            await status_msg.edit_text(invoice)

            # Low Balance Alert check
            try:
                if refreshed and float(refreshed["balance"]) < LOW_BALANCE_THRESHOLD:
                    await update.message.reply_text(f"⚠️ **Low Balance Alert:** သင်၏ Smile Coin Balance ({refreshed['balance']} Coins) သာ ကျန်ပါတော့သည်။")
            except Exception:
                pass
        else:
            log_order(user_id, uid, zone, username, product_display, 0.0, "FAILED", f"Failed ({final_serial})", proc_time)
            
            invoice = (
                f"=== Transaction Report ===\n"
                f"UID     : {uid} ({zone})\n"
                f"Name    : {username}\n"
                f"Order   : {product_display}\n"
                f"Reason  : {final_serial}\n"
                f"Time    : {now_time}\n"
                f"===== {shop_name} =====\n"
            )
            await status_msg.edit_text(invoice)

# Summary, Check, History & Export Commands
async def today_stats(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if not is_authorized_user(user_id):
        return
    today_str = datetime.datetime.now().strftime("%Y-%m-%d")
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT COUNT(*) as total, 
               SUM(CASE WHEN status='SUCCESS' THEN 1 ELSE 0 END) as success,
               SUM(cost) as total_cost
        FROM orders 
        WHERE user_id=? AND DATE(time)=?
    """, (user_id, today_str))
    res = cursor.fetchone()
    conn.close()

    total = res['total'] or 0
    success = res['success'] or 0
    cost = res['total_cost'] or 0.0

    msg = (
        f"<b>📊 ဒီနေ့ အရောင်း စာရင်းချုပ် ({today_str})</b>\n\n"
        f"• စုစုပေါင်း Order: <b>{total}</b> ခု\n"
        f"• အောင်မြင်သော Order: <b>{success}</b> ခု\n"
        f"• ကုန်ကျစရိတ်: <b>{cost:.2f}</b> Coins"
    )
    await update.message.reply_text(msg, parse_mode="HTML")

async def check_order(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        await update.message.reply_text("❌ Usage: `.check [Order ID]`", parse_mode="Markdown")
        return
    o_id = context.args[0].replace("#", "")
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders WHERE order_id=? OR id=?", (o_id, o_id))
    order = cursor.fetchone()
    conn.close()

    if not order:
        await update.message.reply_text("❌ Order ရှာမတွေ့ပါ။")
        return

    msg = (
        f"<b>🔎 Order Details (#{order['order_id']})</b>\n\n"
        f"• User ID: {order['uid']} ({order['zone']})\n"
        f"• Player Name: {order['player']}\n"
        f"• Item: {order['diamond_count']}\n"
        f"• Status: {order['status']}\n"
        f"• Time: {order['time']}\n"
        f"• Processing Time: {order['processed_time']}s"
    )
    await update.message.reply_text(msg, parse_mode="HTML")

async def view_history(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if not is_authorized_user(user_id):
        return
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT uid, zone, player, diamond_count, order_id, status, time FROM orders WHERE user_id=? ORDER BY id DESC LIMIT 10", (user_id,))
    rows = cursor.fetchall()
    conn.close()
    
    if not rows:
        await update.message.reply_text("📭 Order စာရင်း မရှိသေးပါ။")
        return
        
    report = "📜 <b>နောက်ဆုံး ၁၀ ခုမြောက် Order များ</b>\n\n"
    for i, row in enumerate(rows, 1):
        report += f"{i}. 👤 <code>{row['player']}</code> ({row['uid']})\n   📦 {row['diamond_count']} | ID: <code>{row['order_id']}</code>\n   🚦 Status: {row['status']} | 🕒 {row['time']}\n\n"
    await update.message.reply_text(report, parse_mode="HTML")

async def export_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if not is_authorized_user(user_id):
        return
        
    conn = get_db()
    if user_id == SUPER_ADMIN_ID:
        df = pd.read_sql_query("SELECT * FROM orders ORDER BY id DESC", conn)
    else:
        df = pd.read_sql_query("SELECT * FROM orders WHERE user_id=? ORDER BY id DESC", conn, params=(user_id,))
    conn.close()
    
    if df.empty:
        await update.message.reply_text("📭 Export ထုတ်ရန် စာရင်း မရှိသေးပါ။")
        return

    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Orders')
    output.seek(0)

    await update.message.reply_document(
        document=output,
        filename=f"orders_{user_id}_{datetime.datetime.now().strftime('%Y%m%d')}.xlsx",
        caption="📊 **Order History Excel File**",
        parse_mode="Markdown"
    )

# ----------------------------------------------------
# 5. Application Launcher
# ----------------------------------------------------
def main():
    init_db()
    
    request_kwargs = HTTPXRequest(connect_timeout=30.0, read_timeout=30.0)
    app = Application.builder().token(BOT_TOKEN).request(request_kwargs).build()
    
    # Handlers Setup
    handlers = [
        ("start", start),
        ("addadmin", add_admin),
        ("deladmin", del_admin),
        ("maintenance", set_maintenance_cmd),
        ("broadcast", broadcast_cmd),
        ("setshop", set_shop_cmd),
        ("addck", add_cookie),
        ("topup", handle_topup_code),
        ("redeem", handle_topup_code),
        ("role", check_role),
        ("ml", handle_recharge),
        ("today", today_stats),
        ("check", check_order),
        ("history", view_history),
        ("export", export_data)
    ]
    
    for cmd, fn in handlers:
        app.add_handler(CommandHandler(cmd, fn))
        app.add_handler(MessageHandler(filters.Regex(rf"^[./]{cmd}"), fn))
    
    print("🚀 Reseller Topup Bot fully updated and running!", flush=True)
    app.run_polling(drop_pending_updates=True, poll_interval=2.0)

if __name__ == "__main__":
    main()
