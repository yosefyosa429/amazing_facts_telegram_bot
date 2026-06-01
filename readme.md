# 🤖 Amazing Facts Bot

AI-powered Telegram channel bot — Gemini ተጠቅሞ አስደናቂ እውነታዎችን በቋሚነት ይፖስታል።

---

## 📦 Install

```bash
npm install --ignore-scripts
```

---

## ⚙️ Setup

```bash
# 1. .env ፋይል ፍጠር
cp .env.example .env

# 2. .env ውስጥ መረጃዎችህን ሙሉ
#    API_ID, API_HASH → https://my.telegram.org
#    GEMINI_API_KEY   → https://aistudio.google.com
#    CHANNEL          → @yourchannel
```

---

## 🚀 አስነሳ

```bash
node index.js
```

**የመጀመሪያ ጊዜ** → ስልክ ቁጥርና ኮድ ይጠይቃል → session.txt ይፈጠራል  
**ቀጣዩ ጊዜ** → ቀጥታ ይነሳል ✅

---

## 📁 Files

| File | ዓላማ |
|------|------|
| index.js | መነሻ + session management |
| scheduler.js | Cron job — post በሰዓቱ |
| gemini.js | AI content generator |
| database.js | Duplicate checker + stats |
| topics.js | Topic list (8 topics) |

---

## 📊 Topics (rotate ያደርጋል)

- 🔬 ሳይንስ
- 🏛️ ታሪክ  
- 🌍 ተፈጥሮ
- 💻 ቴክኖሎጂ
- 🚀 ህዋ
- 🧬 የሰው አካል
- 🇪🇹 ኢትዮጵያ
- 🔢 ሂሳብ
