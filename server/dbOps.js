// dependencies
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

// most important don't forget
const ObjectId = mongodb.ObjectID;

// mongodb+srv://sandipsalunke:sandip@1234@cluster0.cjyun.mongodb.net/allapps?retryWrites=true&w=majority
// mongodb://sandipsalunke:sandip@1234@cluster0-shard-00-00.cjyun.mongodb.net:27017,cluster0-shard-00-01.cjyun.mongodb.net:27017,cluster0-shard-00-02.cjyun.mongodb.net:27017/allapps?ssl=true&replicaSet=atlas-ui0dsm-shard-0&authSource=admin&retryWrites=true&w=majority
const URI_TO_CONNECT_MONGODB = "mongodb://sandipsalunke:sandip%401234@cluster0-shard-00-00.cjyun.mongodb.net:27017,cluster0-shard-00-01.cjyun.mongodb.net:27017,cluster0-shard-00-02.cjyun.mongodb.net:27017/allapps?ssl=true&replicaSet=atlas-ui0dsm-shard-0&authSource=admin&retryWrites=true&w=majority";
const DB_NAME = "allapps"

// this function will connect db and based on API send response
let connectDB = async (apiName, collectionName, req, res) => {
    try {
        let client = await MongoClient.connect(URI_TO_CONNECT_MONGODB, { useNewUrlParser: true })
        // perform actions on the collection object
        const collection = client.db(DB_NAME).collection(collectionName)

        // perform several db actions based on API names
        chooseApiAndSendResponse(apiName, collection, req, res, client)
    } catch (err) {
        console.log('FAILED TO CONNECT DB ...', err)
    }
}

// choose the particular function for an API and process it
let chooseApiAndSendResponse = (apiName, collection, req, res, client) => {
    switch (apiName) {
        case 'getSongs':
            makeGetSongs(collection, req, res, client)
            break;
        case 'updateRating':
            makeUpdateRating(collection, req, res, client)
            break;
        case 'getPlaylists':
            makeGetplaylists(collection, req, res, client)
            break;
        case 'getPlaylistSongs':
            makeGetplaylistSongs(collection, req, res, client)
            break;
        case 'addSongToPlaylist':
            makeAddSongToPlaylist(collection, req, res, client)
            break;
        case 'createPlaylist':
            makeCreatePlaylist(collection, req, res, client)
            break;
    }
}

// handle request for welcome API
let makeGetSongs = async (collection, req, res, client) => {

    let output = { "message": "failed" }
    try {
        let data = await collection.find({}).toArray()
        output = [...data] || []
        sendOutputAndCloseConnection(client, output, res)

    } catch (err) {
        console.log("ERror occurred .. ", err)
        sendOutputAndCloseConnection(client, output)
    }
}

// handle request for getPlaylist API
let makeGetplaylists = async (collection, req, res, client) => {

    let output = { "message": "failed" }
    try {
        let data = await collection.find({}).toArray()
        output = [...data] || []
        sendOutputAndCloseConnection(client, output, res)

    } catch (err) {
        console.log("ERror occurred .. ", err)
        sendOutputAndCloseConnection(client, output)
    }
}

// handle request for getPlaylist API
let makeGetplaylistSongs = async (collection, req, res, client) => {

    let output = { "message": "failed" }
    try {
        // destructing es6 style
        let { id } = req.params

        let data = await collection.find({ _id: ObjectId(id) }).toArray();
        let songs = await client.db(DB_NAME).collection('songs').find({ "_id": { "$in": data[0].songs } }).toArray();
        output = [...songs] || []
        sendOutputAndCloseConnection(client, output, res)

    } catch (err) {
        console.log("ERror occurred .. ", err)
        sendOutputAndCloseConnection(client, output)
    }
}

let makeUpdateRating = async (collection, req, res, client) => {
    let output = { message: 'failed' }
    try {
        // destructing es6 style
        let { id, rating } = req.params

        // avoid NaN while saving the rating
        rating = (isNaN(parseInt(rating))) ? 1 : rating

        let docs = await collection.updateOne({ _id: ObjectId(id) }, { $set: { rating } })
        output = { message: 'success' }

        // prints the number of modified docs in the console
        console.log('number of modified documents', docs.result.nModified)
        sendOutputAndCloseConnection(client, output, res)
    } catch (err) {
        // if err just close the connection
        sendOutputAndCloseConnection(client, output)
    }
}

let makeAddSongToPlaylist = async (collection, req, res, client) => {
    let output = { message: 'failed' }
    try {
        // destructing es6 style
        let { playlistId, songId } = req.query

        let docs = await collection.updateOne({ _id: ObjectId(playlistId) }, { $push: { "songs": ObjectId(songId) } })
        output = { message: 'success' }

        // prints the number of modified docs in the console
        console.log('number of modified documents', docs.result.nModified)
        sendOutputAndCloseConnection(client, output, res)
    } catch (err) {
        // if err just close the connection
        sendOutputAndCloseConnection(client, output)
    }
}

let makeCreatePlaylist = async (collection, req, res, client) => {
    let output = { message: 'failed' }
    try {
        // destructing es6 style
        let { name, user } = req.query;

        let payload = { name: name, user: user, created: Date.now(), songs: [] };

        let docs = await collection.insert(payload)
        output = { message: 'success' }

        // prints the number of modified docs in the console
        console.log('number of modified documents', docs.result.nModified)
        sendOutputAndCloseConnection(client, output, res)
    } catch (err) {
        // if err just close the connection
        sendOutputAndCloseConnection(client, output)
    }
}

// function to send the response and close the db connection
function sendOutputAndCloseConnection(client, output, res) {
    if (output && res) {
        res.json(output)
    }

    // close the database connection after sending the response
    client.close()
}

// exports
module.exports = {
    connectDB
}