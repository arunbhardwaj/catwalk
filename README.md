# 🐈‍⬛ catwalk
Not-Express Express shopping app

## About The Project

Catwalk is the collaborative efforts of 4 software engineers within a 5 day time frame. This project simulated real-world development of a product page, complete with an image gallery, add-to-cart features, reviews, questions and answers with support for user uploaded images.

## How to Install and Run

### Installation
1. Get a GitHub API token with the permissions described [below](#update-your-config-with-github-auth-token).
2. Install packages ```npm i```
3. Enter your aforementioned GitHub API token to the `config.js` file. If it doesn't exist, make a copy of the `config.example.js` file and rename it to `config.js`. *Never push any file with your API tokens to the web!*
4. Compile and bundle the React and media files ```npm run build```
5. Run the webpack server ```npm run start```
6. Navigate to `localhost:{portNumber}` (typically `portNumber` will be 3000) in your browser.

### Update your config with Github Auth Token
To access the GitHub API without rate limits, you'll need a personal access token with the following scopes:
- read:org
- user
- read:user
- user:email
- user:follow

Make a copy of `config.example.js`, rename it to `config.js`, and add your personal access token.
