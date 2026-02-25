const express = require('express');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Sozlamalar (bir marta yetarli)
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const TOKEN = '8785346107:AAEEVuhBZw2fbWgDL3HPus15zM1q3u62TxA'; 
const CHAT_ID = '866216741'; 
const bot = new TelegramBot(TOKEN, { polling: false });

// API Endpoint
app.post('/api/contact', (req, res) => {
    const { name, phone, email } = req.body;
    const message = `🔔 **Yangi ariza!**\n👤 **Ism:** ${name}\n📞 **Tel:** ${phone}\n📧 **Email:** ${email}`;

    bot.sendMessage(CHAT_ID, message, { parse_mode: 'Markdown' })
        .then(() => res.status(200).json({ message: "Yuborildi" }))
        .catch((error) => {
            console.error("Telegram xatosi:", error);
            res.status(500).json({ error: "Telegram xatosi" });
        });
});

app.use(express.static(path.join(__dirname)));

// Asosiy sahifa
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Faqat bitta listen bo'lishi kerak
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});