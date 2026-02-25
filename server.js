const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = 3000;

// Telegram sozlamalari
const TOKEN = '8785346107:AAEHMRv3LlHDrXJAo5CFDJUkMGuAWmL1wCc'; // BotFather'dan olingan token
const CHAT_ID = '8785346107';     // Sizning chat ID'ngiz
const bot = new TelegramBot(TOKEN, { polling: false });

app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
    const { name, phone, email } = req.body;

    // Telegram'ga yuboriladigan xabar matni
    const message = `
🔔 **Yangi ariza!**
👤 **Ism:** ${name}
📞 **Tel:** ${phone}
📧 **Email:** ${email}
    `;

    bot.sendMessage(CHAT_ID, message, { parse_mode: 'Markdown' })
        .then(() => {
            res.status(200).json({ message: "Xabar Telegramga yuborildi!" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Xabar yuborishda xatolik yuz berdi." });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});