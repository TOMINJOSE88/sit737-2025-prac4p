const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;

// Setup Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Middleware to parse query params and log requests
app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

// Utility to validate numbers
const validateNumbers = (num1, num2, res) => {
  if (isNaN(num1) || isNaN(num2)) {
    const error = 'Invalid input: num1 and num2 must be valid numbers.';
    logger.error(error);
    res.status(400).json({ error });
    return false;
  }
  return true;
};

// Addition
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  if (!validateNumbers(num1, num2, res)) return;
  const result = parseFloat(num1) + parseFloat(num2);
  logger.info(`Addition: ${num1} + ${num2} = ${result}`);
  res.json({ result });
});

// Subtraction
app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;
  if (!validateNumbers(num1, num2, res)) return;
  const result = parseFloat(num1) - parseFloat(num2);
  logger.info(`Subtraction: ${num1} - ${num2} = ${result}`);
  res.json({ result });
});

// Multiplication
app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;
  if (!validateNumbers(num1, num2, res)) return;
  const result = parseFloat(num1) * parseFloat(num2);
  logger.info(`Multiplication: ${num1} * ${num2} = ${result}`);
  res.json({ result });
});

// Division
app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;
  if (!validateNumbers(num1, num2, res)) return;
  if (parseFloat(num2) === 0) {
    const error = 'Division by zero is not allowed.';
    logger.error(error);
    res.status(400).json({ error });
    return;
  }
  const result = parseFloat(num1) / parseFloat(num2);
  logger.info(`Division: ${num1} / ${num2} = ${result}`);
  res.json({ result });
});

// Start the server
app.listen(port, () => {
  console.log(`Calculator microservice is running at http://localhost:${port}`);
});
