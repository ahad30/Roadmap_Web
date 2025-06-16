require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();


const router = require('./src/routes');


// CORS
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    ""
  ],
  credentials: true,
  optionSuccessStatus: 200,
}


// Middleware

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Welcome to the Roadmap App Api!');
});

// Routes
app.use('/api/v1', router);


// Error Handler

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);

  if (!res.headersSent) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
});


//DB Connect

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });

  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
};

startServer();
