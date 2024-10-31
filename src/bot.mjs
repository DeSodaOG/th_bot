import { Bot, InputFile, InlineKeyboard, InputMediaBuilder, Keyboard } from 'grammy'
import { Menu, MenuRange } from '@grammyjs/menu'

export const {

    // Telegram bot token from t.me/BotFather
    TELEGRAM_BOT_TOKEN: token,

    // Secret token to validate incoming updates
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(':').pop(),

} = process.env

// Default grammY bot instance
export const bot = new Bot(token)

const startText = '<b>👏Welcome to the Tele Hunter Community!</b> \n🐳 TeleHunter is the first telegram user traffic affiliate union. Build your first TG traffic affiliates system, make your affiliates help you earn passive income, and hunt for more telegram network value.!\n💰 Earn $Hunter Points by Inviting More! \n🔥 Participate the Contest to share $6000 Prize Pool. \n Homepage: <a href="https://telehunter.xyz">https://telehunter.xyz</a> \n X: <a href="https://x.com/Tele_Hunter_xyz">https://x.com/Tele_Hunter_xyz</a> \n Blog: <a href="https://medium.com/@telehunter">https://medium.com/@telehunter</a>'
const helpText = '<b>🧑‍🤝‍🧑Dear Hunters, please feel free to contact us anytime while using our products.</b> \n <b>📖 QA Doc</b>If you have any questions, please first look for answers in the QA section. \n <a href="https://telehunters-organization.gitbook.io/telehunter/getting-started/q-and-a">Here is the link</a>.'
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

    await ctx.replyWithPhoto("https://github.com/TeleHunter/TeleHunterBrandKit/blob/main/assets/banner.png", {
        caption: startText,
        show_caption_above_media: false,
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
    });
})

bot.command("start", async (ctx) => {
    // ctx.reply('<b>👏Welcome to the catizens universe!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
    // { parse_mode: "HTML" },)
    if (ctx.chat.type === 'private') {
        await ctx.reply('Hello', {
            reply_markup: keyboard
        });
    }

    console.log(ctx.chat.type)
    await ctx.replyWithPhoto("https://github.com/TeleHunter/TeleHunterBrandKit/blob/main/assets/banner.png", {
        caption: startText,
        show_caption_above_media: false,
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
    });
});

bot.command("help", async (ctx) => {
    // ctx.reply('<b>👏Welcome to the catizens universe!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
    // { parse_mode: "HTML" },)
    await ctx.reply(helpText, {
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
    });
});