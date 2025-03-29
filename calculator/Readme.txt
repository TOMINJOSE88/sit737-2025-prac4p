Calculator

This project is a basic calculator built using Node.js and Express. It performs simple arithmetic operations like addition, subtraction, multiplication, and division. Logging is handled using the Winston library.



Setup Instructions

Clone the Repository:

git clone :
cd calculator

Install Dependencies:

npm install express winston

Folder Layout:

calculator
├── index.js
├── package.json
└── logs/
    ├── combined.log
    └── error.log

How to Run

Start the microservice with:

node index.js

Access it in your browser at:

http://localhost:3000

API Endpoints

Each endpoint accepts num1 and num2 as query parameters.

Operation

URL Example

Add

/add?num1=5&num2=3

Subtract

/subtract?num1=10&num2=4

Multiply

/multiply?num1=2&num2=8

Divide

/divide?num1=20&num2=5

Error Responses

Invalid input:

{
  "error": "Invalid input. Please provide two numbers."
}

Divide by zero:

{
  "error": "Invalid input. Cannot divide by zero."
}

Logging Info

Logs are stored in the logs directory:

All logs: combined.log

Error logs: error.log
