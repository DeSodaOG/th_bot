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



bot.on('message:new_chat_members', ctx => {

    ctx.reply("Hello, new member.")

})

const startText = '<b>👏Welcome to the catizens universe!</b> \n 🐱Upgrade your cats, earn more coins, boost your ranking, and get more airdrop rewards! \n <a href="https://grammy.dev">Homepage</a>.'

const inlineKeyboard = new InlineKeyboard().url(
    "start app",
    "https://t.me/tqweqeetris_bot/testapp?startapp=referral=99281932"
).row().url(
    "Join Community",
    "https://grammy.dev/zh/plugins/keyboard"
).row().url(
    "Follow X",
    "https://x.com/CatizenAI"
);

const labels = [
    "Yes, they certainly are",
    "I'm not quite sure",
    "No. 😈",
];
const buttonRows = labels
    .map((label) => [Keyboard.text(label)]);
const keyboard = Keyboard.from(buttonRows).resized();

bot.command("start", async (ctx) => {
    // ctx.reply('<b>👏Welcome to the catizens universe!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
    // { parse_mode: "HTML" },)
    await ctx.reply('Hello', {
        reply_markup: keyboard,
    });
    console.log("test")
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