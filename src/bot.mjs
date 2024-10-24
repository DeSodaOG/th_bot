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

const startText = '<b>👏Welcome to the catizens universe!</b> \n 🐱Upgrade your cats, earn more coins, boost your ranking, and get more airdrop rewards! \n <a href="https://grammy.dev">Homepage</a>.'
const helpText = '<b>🧑‍🤝‍🧑Dear Catizens, please feel free to contact us anytime while using our products.</b> \n <b>📖 QA Doc</b>If you have any questions, please first look for answers in the QA section. \n links: <a href="https://grammy.dev">https://grammy.dev</a>.'
const inlineKeyboard = new InlineKeyboard().url(
    "start app",
    "https://t.me/TeleHunterBot/thapp?startapp"
).row().url(
    "Join Community",
    "https://grammy.dev/zh/plugins/keyboard"
).row().url(
    "Follow X",
    "https://x.com/CatizenAI"
);

const keyboard = new Keyboard().webApp(
    "start app",
    "https://th-mini-app-mvp.vercel.app",
).resized();

bot.on('message:new_chat_members', async (ctx) => {
    await ctx.reply("Hello, new hunters! refresh your Mini APP to claim the init 10000 rewards.");

    await ctx.replyWithPhoto("https://grammy.dev/images/grammY.png", {
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
    await ctx.replyWithPhoto("https://grammy.dev/images/grammY.png", {
        caption: startText,
        show_caption_above_media: false,
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
    });
});


bot.callbackQuery("click-payload", async (ctx) => {
    await ctx.answerCallbackQuery({
        text: "You were curious, indeed!",
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