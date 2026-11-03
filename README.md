
```markdown
# 🚀 AI-Powered Amazing Facts Telegram Bot

An automated, intelligent Node.js userbot that generates fascinating, AI-crafted facts and automatically publishes them to a Telegram channel on a structured schedule.

---

## 📁 Project Structure

```text
AMAZING-FACTS-BOT/
├── .env                  # Environment variables (API keys, Telegram credentials)
├── .gitignore            # Git exclusion rules (node_modules, session, env)
├── database.js           # Database handler & storage configuration
├── facts.db.json         # Local database for tracking generated/posted facts
├── gemini.js             # Google Generative AI integration for fact generation
├── index.js              # Main application entry point & Telegram client setup
├── package.json          # Project metadata, scripts, and dependencies
├── scheduler.js          # Cron job scheduler for automated posting
├── session.txt           # Persistent GramJS session string (auto-generated)
└── topics.js             # Topic pool and categories for the AI generator

```
## 🛠️ Tech Stack & Dependencies
 * **Runtime:** Node.js (ES Modules / type: "module")
 * **Telegram MTProto Client:** telegram (GramJS)
 * **AI Generation:** @google/generative-ai (Gemini API)
 * **Automation:** node-cron
 * **Configuration:** dotenv
 * **Database:** sql.js (with local JSON state backup support)
## ⚙️ Prerequisites
Before running the bot, ensure you have:
 * **Node.js** (v16 or higher) installed.
 * A Telegram API API_ID and API_HASH from my.telegram.org.
 * A Google Gemini API Key from Google AI Studio.
## 📦 Installation & Setup
 1. **Clone or open the project folder** in your terminal (Termux or PC).
 2. **Install dependencies:**
   ```bash
   npm install
   
   ```
 3. **Create and configure your .env file** in the root directory:
   ```env
   API_ID=your_telegram_api_id
   API_HASH=your_telegram_api_hash
   GEMINI_API_KEY=your_google_gemini_api_key
   CHANNEL=your_channel_username_or_id
   
   ```
## 🏃 Usage
Start the application using the npm start script:
```bash
npm start

```
 * **First-Time Authentication:** The bot will prompt you via the terminal for your phone number, Telegram login code (OTP), and 2-Step Verification (2SV) password if enabled. Once verified, it will securely save your session string into session.txt.
 * **Subsequent Runs:** The bot will automatically load the session from session.txt, connect to Telegram, and initialize the background scheduler without re-authenticating.
## 🔒 Security & Best Practices
 * **Never** commit your .env, session.txt, or database credentials to public repositories.
 * Ensure your .gitignore file includes:
   ```text
   node_modules/
   .env
   session.txt
   
   ```
## 📄 License
This project is open-source and available under the MIT License.
```

```
