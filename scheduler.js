import cron from "node-cron";
import dotenv from "dotenv";
import { generateFact, formatPost } from "./gemini.js";
import { saveFact, isDuplicate, getNextTopicIndex, getStats } from "./database.js";
import { topics } from "./topics.js";

dotenv.config();

const CHANNEL = process.env.CHANNEL;

async function postFact(client) {
  try {
    console.log("\n⏰ አዲስ post ጊዜ ደረሰ...");

    // ✅ Topic rotation
    const topicIndex = await getNextTopicIndex(topics.length);
    const topic = topics[topicIndex];
    console.log(`📌 Topic: ${topic.name}`);

    // ✅ Gemini ይፈጥራል (duplicate ከሆነ እስከ 3 ጊዜ ይሞክራል)
    let fact = null;
    let attempts = 0;
    while (attempts < 3) {
      const generated = await generateFact(topic);
      if (generated && !(await isDuplicate(generated))) {
        fact = generated;
        break;
      }
      console.log(`⚠️ Duplicate ተገኝቷል፣ ዳግም እየሞከረ... (${attempts + 1})`);
      attempts++;
    }

    if (!fact) {
      console.log("❌ 3 ጊዜ ሞክሮ unique content አልተገኘም።");
      return;
    }

    // ✅ Format እና Post
    const post = formatPost(fact, topic);
    await client.sendMessage(CHANNEL, { message: post, parseMode: "md" });

    // ✅ DB ውስጥ አስቀምጥ
    await saveFact(fact, topic.name);

    const stats = await getStats();
    console.log(`✅ Post ተላከ! [${topic.emoji} ${topic.name}]`);
    console.log(`📊 ዛሬ: ${stats.today} posts | ጠቅላላ: ${stats.total} posts`);

  } catch (err) {
    console.error("❌ Post ስህተት:", err.message);
  }
}

export function startScheduler(client) {
  const interval = process.env.POST_INTERVAL || "0 */6 * * *";

  console.log(`\n⏱️  Scheduler ተጀምሯል — "${interval}"`);

  // ✅ ወዲያው አንድ test post ላክ
  postFact(client);

  // ✅ Cron scheduler
  cron.schedule(interval, () => {
    postFact(client);
  });
}
