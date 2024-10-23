import { Bot, InputFile, session, InputMediaBuilder } from 'grammy'
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
const photo = InputMediaBuilder.photo("https://grammy.dev/images/grammY.png", {
    caption: startText,
    show_caption_above_media: false,
    parse_mode: "HTML",
});
bot.command("start", async (ctx) => {
    // ctx.reply('<b>👏Welcome to the catizens universe!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
    // { parse_mode: "HTML" },)
    console.log("test")
    await ctx.replyWithMediaGroup([photo, photo]);
});
