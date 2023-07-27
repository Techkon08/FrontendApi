# FrontendApi


- This is a full stack web application that uses Express.js on the backend and React.js on the frontend.

- The Express.js server handles the backend functionality:
  - It provides an API endpoint that accepts POST requests with a stock symbol and a date.
  - It fetches stock market data for the given symbol and date from the Polygon.io API.
  - It sends a response containing stock data (open, high, low, close prices and volume).

- The React.js application handles the frontend functionality:
  - It presents a form for the user to input a stock symbol and a date.
  - On form submission, it makes a POST request to the server with the user-inputted data.
  - It receives the stock data response from the server and displays the data on the webpage.
  - It also has error handling capabilities and displays appropriate error messages to the user.
