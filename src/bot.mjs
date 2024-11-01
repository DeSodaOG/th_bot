import { Bot, InlineKeyboard, Keyboard, Context, session, SessionFlavor } from 'grammy'
import { I18n, I18nFlavor } from "@grammyjs/i18n";

export const {

    // Telegram bot token from t.me/BotFather
    TELEGRAM_BOT_TOKEN: token,

    // Secret token to validate incoming updates
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(':').pop(),

} = process.env

const i18n = new I18n({
    defaultLocale: "en",
    useSession: true, // 是否在会话中存储用户的语言
    directory: "locales", // 从 locales/ 加载所有翻译文件
});

// Default grammY bot instance
export const bot = new Bot(token)

bot.use(
    session({
        initial: () => {
            return {};
        },
    }),
);

bot.use(i18n);

const startText = '<b>👏Welcome to the Tele Hunter Community!</b> \n🐳 TeleHunter is the first telegram user traffic affiliate union. Build your first TG traffic affiliates system, make your affiliates help you earn passive income, and hunt for more telegram network value.!\n💰 Earn $Hunter Points by Inviting More! \n🔥 Participate the Contest to share $6000 Prize Pool. \n <b>Homepage:</b> <a href="https://telehunter.xyz">https://telehunter.xyz</a> \n <b>X:</b> <a href="https://x.com/Tele_Hunter_xyz">https://x.com/Tele_Hunter_xyz</a> \n <b>Blog:</b> <a href="https://medium.com/@telehunter">https://medium.com/@telehunter</a>'
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
    if (ctx.chat.type === 'private') {
        await ctx.reply(ctx.t("Hello Hunter!"), {
            reply_markup: keyboard
        });
    }

    await ctx.replyWithPhoto("https://s1.imagehub.cc/images/2024/10/31/a32a301cfef3bfd5b21aea9074078d9f.png", {
        caption: ctx.t(startText),
        show_caption_above_media: false,
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
    });
});

bot.command("help", async (ctx) => {
    // ctx.reply('<b>👏Welcome to the catizens universe!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
    // { parse_mode: "HTML" },)
    await ctx.reply(ctx.t(helpText), {
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
    });
});