# Music-app: React + Node
A Simple Music Application using [React JS](https://reactjs.org/docs/getting-started.html), a JavaScript library to make awesome UI by Facebook, [Node JS](https://nodejs.org/docs/latest-v8.x/api/), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/). 

This application uses [React JS](https://reactjs.org/docs/getting-started.html) component oriented UI creation paradigm. All components are written in [JSX](https://reactjs.org/docs/jsx-in-depth.html) and ES6 style and are
combined to get a single build for production purpose using [Webpack 4](https://webpack.js.org/concepts/). 

ES6 `module` creation along with `import /export` is used. [Babel](https://babeljs.io/docs/en/babel-preset-react) is used to *transpile* all [JSX](https://reactjs.org/docs/jsx-in-depth.html) code to vanilla JavaScript code. To install all the dependecies `npm` is used.

For UI creation [HTML5](https://www.w3schools.com/html/html5_intro.asp) and [CSS3](https://www.w3schools.com/css/) are used. [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), the new feature of [CSS3](https://www.w3schools.com/css/) is used for layout creation purpose.

Back end is implemented using [Node JS](https://nodejs.org/docs/latest-v8.x/api/), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/). [Atlas](https://www.mongodb.com/cloud/atlas), the *Cloud* version of [MongoDB](https://docs.mongodb.com/)
is used.

## Features

- This is Simple Music Application
- It is a Full Stack Application
- All the song details are stored in the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). This is a *free/ shared* account on [Atlas](https://www.mongodb.com/cloud/atlas). **So Please use it wisely**
- Application is loaded with the songs
- Listening of the songs is supported
- Searching from the list of songs is possible
- Information about the song (Movie, Album, Artist) is available on click of the `i` icon
- Changing the rating is supported
- All the ratings are saved in the database i.e. *persistant* 
- Support for Playlist
- Create Playlist
- Songs of playlist 
- Add songs to playlist
- Shuffle playlist songs

## Installation

1. Clone the repository using `git clone https://github.com/sandysalunke/music-app.git` from `Git Bash / Command Prompt`
2. Navigate inside the directory by `cd music-app`
3. Install all the necessary dependecies by using `npm install` 
4. Navigate to the directory `cd server`
5. Run the server by `node server.js`
5. Open the web browser and type`http://localhost:3000` in the address bar to load the application 
 
*tested with <img src="screenshots/chrome.png" width="20px" title="Google Chrome">Google Chrome v70 and <img src="screenshots/firefox.png" width="25px" title="Firefox Developer edition">Mozilla Firefox Developer Editon*  

## Screenshots

Some screens of the application is given below for better understanding. 

<p> 1. Initial screen <br/> 
 <img src="screenshots/desktop 1.png" width="590px" title="initial screen"/>
</p>

<p> 2. Search songs <br/> 
 <img src="screenshots/desktop 6.png" width="590px" title="initial screen"/>
</p>
 
 <p> 3. After loading the songs <br/> 
 <img src="screenshots/desktop 2.png" width="590px" title="After loading the songs screen"/>
</p>

<p> 4. Playlist <br/> 
 <img src="screenshots/desktop 3.png" width="590px" title="Top 5 Songs screen"/>
</p>

<p> 5. Songs in playlist <br/> 
 <img src="screenshots/desktop 4.png" width="590px" title="Showing information of a song screen"/>
</p>

<p> 6. Add songs in playlist <br/> 
 <img src="screenshots/desktop 5.png" width="590px" title="Searching and showing searched songs screen"/>
</p>


