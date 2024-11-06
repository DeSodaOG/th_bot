import { Bot, InlineKeyboard, Keyboard } from 'grammy'

import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

async function inputNewUser(uid) {
    try {
        pool.connect((err) => {
            if (err) throw err
            console.log("Connect to PostgreSQL successfully!")
        })
        const { rows } = await pool.query('INSERT INTO bot_user(uid) VALUES($1) RETURNING *', [uid]);
        console.log(rows)
    } catch (err) {
        console.log(err);
    }
}

export const {

    // Telegram bot token from t.me/BotFather
    TELEGRAM_BOT_TOKEN: token,

    // Secret token to validate incoming updates
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(':').pop(),

} = process.env

// Default grammY bot instance
export const bot = new Bot(token)

const startText = '<b>👏Welcome to the Tele Hunter Community!</b> \n🐳 TeleHunter is the first telegram user traffic affiliate union. Build your first TG traffic affiliates system, make your affiliates help you earn passive income, and hunt for more telegram network value.!\n💰 Earn $Hunter Points by Inviting More! \n🔥 Participate the Contest to share $6000 Prize Pool. \n <b>Homepage:</b> <a href="https://telehunter.xyz">https://telehunter.xyz</a> \n <b>X:</b> <a href="https://x.com/Tele_Hunter_xyz">https://x.com/Tele_Hunter_xyz</a> \n <b>Blog:</b> <a href="https://medium.com/@telehunter">https://medium.com/@telehunter</a>'
const ru_startText = '<b>👏Добро пожаловать в сообщество Tele Hunter!</b> \n🐳 TeleHunter — первый союз партнёров по трафику пользователей Telegram. Создайте свою первую партнерскую систему трафика TG, заставьте своих партнеров помогать вам получать пассивный доход и стремитесь к большей ценности сети Telegram.!\n💰 Зарабатывайте $Hunter Points, приглашая больше людей! \n🔥 Примите участие в конкурсе и разделите призовой фонд в размере 6000 долларов США.. \n <b>Домашняя страница:</b> <a href="https://telehunter.xyz">https://telehunter.xyz</a> \n <b>X:</b> <a href="https://x.com/Tele_Hunter_xyz">https://x.com/Tele_Hunter_xyz</a> \n <b>Блог:</b> <a href="https://medium.com/@telehunter">https://medium.com/@telehunter</a>';

const helpText = '<b>🧑‍🤝‍🧑Dear Hunters, please feel free to contact us anytime while using our products.</b> \n <b>📖 QA Doc</b>If you have any questions, please first look for answers in the QA section. \n <a href="https://telehunters-organization.gitbook.io/telehunter/getting-started/q-and-a">Here is the link</a>.'
const ru_helpText = '<b>🧑‍🤝‍🧑Уважаемые охотники, пожалуйста, обращайтесь к нам в любое время во время использования нашей продукции.</b> \n <b>📖 Q&A Док</b>Если у вас есть какие-либо вопросы, сначала поищите ответы в разделе QA. \n <a href="https://telehunters-organization.gitbook.io/telehunter/getting-started/q-and-a">Вот ссылка</a>.';

const inlineKeyboard = new InlineKeyboard().url(
    "start app",
    "https://t.me/TeleHunterBot/thapp?startapp"
).row().url(
    "Join Offical Channel",
    "https://t.me/tele_hunter_channel"
).row().url(
    "Follow X",
    "https://x.com/Tele_Hunter_xyz"
);

const keyboard = new Keyboard().webApp(
    "start app",
    "https://th-mini-app-mvp.vercel.app",
).resized();

bot.on('message:new_chat_members', async (ctx) => {
    // await ctx.reply("Hello, new hunter! claim the init 10000 rewards.");

    await ctx.replyWithPhoto("https://s1.imagehub.cc/images/2024/10/31/a32a301cfef3bfd5b21aea9074078d9f.png", {
        caption: startText,
        show_caption_above_media: false,
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
    });
})

bot.command("start", async (ctx) => {
    // ctx.reply('<b>👏Welcome to the catizens universe!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
    // { parse_mode: "HTML" },)
    const is_ru = ctx.from.language_code === 'ru' || ctx.from.language_code == 'be' || ctx.from.language_code === 'uk';
    console.log(ctx.from.language_code)
    if (ctx.chat.type === 'private') {
        await inputNewUser(ctx.chat.id);

        await ctx.reply(is_ru ? "Привет, Хантер!" : "Hello Hunter!", {
            reply_markup: keyboard
        });
    }

    await ctx.replyWithPhoto("https://s1.imagehub.cc/images/2024/10/31/a32a301cfef3bfd5b21aea9074078d9f.png", {
        caption: is_ru ? ru_startText : startText,
        show_caption_above_media: false,
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
    });
});

bot.command("help", async (ctx) => {
    // ctx.reply('<b>👏Welcome to the catizens universe!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
    // { parse_mode: "HTML" },)
    const is_ru = ctx.from.language_code === 'ru' || ctx.from.language_code == 'be' || ctx.from.language_code === 'uk';

    await ctx.reply(is_ru ? ru_helpText : helpText, {
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
    });
});