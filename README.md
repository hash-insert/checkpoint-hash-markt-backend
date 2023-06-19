# hash-markt-backend

1. **Introduction**
  - This is a Full-Stack project that consists of the cliet side and server side.
  - Client side code is built by using React.js and Tailwind.css
  - The repository contains two folders, client and server
  - The client folder contains the frontend code
  - The server folder contains the backend code

2. **Setup**
  - To setup the repository in your local machine you need to clone the repository.
    - After cloning the repository for the client side to run, you need to install the necessary dependencies.
    - Run the following commands in the same order specified.
    ___
    >  - Open your terminal and navigate to the client folder:
        ```
        cd client
        ```
    >  - Install the necessary dependencies:
        ```
        npm install
l        ```
    >  - Start the frontend:
        ```
        npm start
        ```
    ___
    - To run the server, you need to install the necessary dependencies
    - Run the following commands in the same order specified.
    ___
    >  - Open your terminal and navigate to the Server folder:
        ```
        cd server
        ```
    >  - Install the necessary dependencies:
        ```
        npm install
        ```
    > - Start the backend:
        ```
        npm start
        ```
    ___

3. **Authentication**
  - Authentication is done by jsonWebTokens(jwt)
  - Passwords are encrypted before saving them to the database using bcrypt.
  - Comparing the passwords at the time of login using bcrypt
  - Generating tokens to acces the user details while the user is loggedin and using that token to do authentication