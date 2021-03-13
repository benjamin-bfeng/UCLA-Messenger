

# BruinChat

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

BruinChat is a messaging app designed for UCLA students to be able to connect with each other and share their thoughts with fellow students in the same class. Students are able to interact with their peers by sending messages, and are able to join different chats corresponding to the courses they are taking. Currently only supports the courses in the School of Engineering.

### Built With
- [React](https://reactjs.org/)
- [Material UI](https://material-ui.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [Socket.io](https://socket.io/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

First, clone the repository to your local machine using

```zsh
git clone https://github.com/benjamin-bfeng/BruinChat.git
```

Frontend and backend are in the respective `client` and `server` folders,
and each one is run separately.

### Frontend

Installing Dependencies
```zsh
cd client
npm install
```

Run with
```sh
npm start
```
while in the `client` folder.

### Backend

Installing Dependencies
```zsh
cd server
npm install
```
To link your mongoDB database, create the .env file inside the server folder and initialize your environment variable as such:
```
MONGODB_URI=[INSERT YOUR MONGODB CONNECTION STRING]
```
Run with
```sh
npm run run_server
```
while in the `server` folder.

<!-- USAGE EXAMPLES -->

## Usage

Login or Signup
![image](https://user-images.githubusercontent.com/40645885/110919286-edd68700-82d0-11eb-9d60-037c23e0d773.png)
Homepage
![image](https://user-images.githubusercontent.com/40645885/110919633-56bdff00-82d1-11eb-9d57-1552b5a9a78e.png)
Edit Profile
![image](https://user-images.githubusercontent.com/40645885/110919559-3d1cb780-82d1-11eb-99e3-a25f8af13d26.png)
Search for and Add Classes
![image](https://user-images.githubusercontent.com/40645885/110919744-72c1a080-82d1-11eb-9343-dbee97462287.png)
Like Messages
![image](https://user-images.githubusercontent.com/40645885/110919855-91279c00-82d1-11eb-906d-7f23c8976a93.png)
View a Profile
![image](https://user-images.githubusercontent.com/40645885/110919914-9dabf480-82d1-11eb-9b31-bf66397afbc0.png)

<!-- CONTACT -->

## Contact
Contributors:
Benjamin Feng- benjamin.bfeng@gmail.com
Arnav Garg -  arnavga@gmail.com
Isaac Li - isaac.li@ucla.edu
Joshua Si - jjsi@g.ucla.edu
Artavazd Torosyan - Iamferme@gmail.com

Project Link: [https://github.com/benjamin-bfeng/BruinChat](https://github.com/benjamin-bfeng/BruinChat)
