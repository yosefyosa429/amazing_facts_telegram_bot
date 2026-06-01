import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import fs from "fs";
import readline from "readline";
import dotenv from "dotenv";
import { startScheduler } from "./scheduler.js";

dotenv.config();

const SESSION_FILE = "session.txt";
const API_ID = parseInt(process.env.API_ID);
const API_HASH = process.env.API_HASH;

// ✅ Session ከፋይል ማንበብ (ካለ)
const savedSession = fs.existsSync(SESSION_FILE)
  ? fs.readFileSync(SESSION_FILE, "utf-8").trim()
  : "";

const session = new StringSession(savedSession);
export const client = new TelegramClient(session, API_ID, API_HASH, {
  connectionRetries: 5,
});

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  console.log("🚀 Amazing Facts Bot እየተነሳ ነው...");

  await client.start({
    phoneNumber: async () => await ask("📱 ስልክ ቁጥርህን አስገባ (e.g. +2519...): "),
    phoneCode: async () => await ask("🔑 Telegram ኮድህን አስገባ: "),
    password: async () => await ask("🔒 2FA password (ካለ): "),
    onError: (err) => console.error("❌ Login ስህተት:", err.message),
  });

  // ✅ Session አስቀምጥ
  const sessionStr = client.session.save();
  fs.writeFileSync(SESSION_FILE, sessionStr);
  console.log("💾 Session ተቀምጧል — ቀጣዩ ጊዜ አይጠይቅም።");

  rl.close();

  console.log("✅ ከ Telegram ጋር ተገናኝቷል!");
  console.log(`📡 Channel: ${process.env.CHANNEL}`);

  // Scheduler ጀምር
  startScheduler(client);
}

main().catch(console.error);
