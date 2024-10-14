const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const expenseCategoriesRoutes = require('./routes/category-expense.routes');
const incomeCategoriesRoutes = require('./routes/category-income.routes');
const operationsRoutes = require('./routes/operation.routes');
const balanceRoutes = require('./routes/balance.routes');

const app = express();

// Настройка CORS
const corsOptions = {
    origin: 'https://phoenix-intensive.github.io', // Укажите ваш источникн
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
};

// Используйте middleware
app.use(cors(corsOptions));
app.use(express.json());

// Подключите ваши маршруты
app.use("/api", authRoutes);
app.use("/api/categories/expense", expenseCategoriesRoutes);
app.use("/api/categories/income", incomeCategoriesRoutes);
app.use("/api/operations", operationsRoutes);
app.use("/api/balance", balanceRoutes);

// Обработчик для OPTIONS запросов
app.options('*', cors(corsOptions));

// Обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app; // Экспортируйте app для использования Vercel
