const express = require('express');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// DIQQAT: TOKEN va CHAT_ID ni qayta tekshiring
const TOKEN = '8785346107:AAEEVuhBZw2fbWgDL3HPus15zM1q3u62TxA'; 
const CHAT_ID = '866216741'; // @userinfobot bergan raqamni aynan shu yerga yozing

const bot = new TelegramBot(TOKEN, { polling: false });

app.use(cors());
app.use(express.json());

app.post('/api/contact', (req, res) => {
    const { name, phone, email } = req.body;

    const message = `
🔔 **Yangi ariza!**
👤 **Ism:** ${name}
📞 **Tel:** ${phone}
📧 **Email:** ${email}
    `;

    bot.sendMessage(CHAT_ID, message, { parse_mode: 'Markdown' })
        .then(() => {
            console.log("✅ Xabar muvaffaqiyatli ketdi!");
            res.status(200).json({ message: "Yuborildi" });
        })
        .catch((error) => {
            console.error("❌ Telegram xatosi:", error.response ? error.response.body : error.message);
            res.status(500).json({ error: error.message });
        });
});

app.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT} manzilida ishlamoqda`);
});