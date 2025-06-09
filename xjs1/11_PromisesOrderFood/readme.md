# 🍕 Order Food - Promises Demo

This project demonstrates the use of JavaScript **Promises** in a food ordering simulation. It shows how `.then()` and `.catch()` chaining works when handling asynchronous operations such as placing and delivering an order.
## 🧠 What It Does

- Generates a random chance of whether an order can be placed (using `Math.random()`).
- If the order is placed successfully, proceeds to a simulated delivery step.
- Again, randomly decides if the delivery can be completed or not.
- Uses `.then()` chaining to handle the success flow (order placed → order delivered).
- Uses `.catch()` to handle errors (like order not placed or delivery failed).
- Updates the DOM with status messages (`h2`) based on the result.
- Demonstrates how asynchronous flows work in JavaScript using Promises.

## 🎯 Concepts Demonstrated

- JavaScript Promises
- `.then()` chaining
- `.catch()` error handling
- DOM manipulation (`createElement`, `append`, `textContent`)
- Conditional UI updates
