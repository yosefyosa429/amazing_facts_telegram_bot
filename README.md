
```markdown
# 🤖 AI-Powered Amazing Facts Bot

An intelligent, AI-driven Telegram userbot that leverages the Google Gemini API to automatically generate and post fascinating facts to a Telegram channel on a scheduled basis.

---

## 📦 Installation

```bash
npm install --ignore-scripts

```
## ⚙️ Setup Configuration
 1. **Create your environment configuration file:**
   ```bash
   cp .env.example .env
   
   ```
 2. **Fill in your credentials inside the .env file:**
   * API_ID & API_HASH → Obtain from my.telegram.org
   * GEMINI_API_KEY → Obtain from Google AI Studio
   * CHANNEL → Your target channel username or ID (e.g., @yourchannel)
## 🚀 Running the Bot
Start the application using Node.js:
```bash
node index.js

```
 * **First Run:** The bot will prompt you for your phone number, Telegram login code (OTP), and 2SV password if enabled. Once authenticated, a session.txt file is automatically generated.
 * **Subsequent Runs:** The bot loads the session directly and starts up immediately without asking for credentials again.
## 📁 File Structure & Architecture
| File | Purpose |
|---|---|
| index.js | Application entry point and Telegram session management |
| scheduler.js | Cron job manager for automated scheduled posting |
| gemini.js | Google Generative AI integration for content generation |
| database.js | Duplicate checker and statistics tracking |
| topics.js | Topic pool management (rotates across 8 categories) |
## 📊 Covered Topics (Rotated Automatically)
The bot dynamically generates content across diverse categories to keep your channel engaging:
 * 🔬 Science
 * 🏛️ History
 * 🌍 Nature
 * 💻 Technology
 * 🚀 Space
 * 🧬 Human Body
 * 🇪🇹 Ethiopia
 * 🔢 Mathematics
## 🔒 Security Best Practices
 * Never commit your .env or session.txt files to public repositories. Ensure they are properly listed in your .gitignore.
```

```
