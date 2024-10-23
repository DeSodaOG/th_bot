import { Bot, InputFile, session } from 'grammy'
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

bot.command("start", async (ctx) => {
    ctx.reply('<b>Hi!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
        { parse_mode: "HTML" },)

});
