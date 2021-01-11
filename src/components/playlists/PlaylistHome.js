import React, { Component } from 'react';
import axios from 'axios'

// components
import Song from '../allsongs/Song'
import AddSongToPlaylist from './AddSongToPlaylist'

// Constants
import Constants from '../Constants'

class SongsPanel extends Component {

    constructor(props) {
        super(props)

        console.log('props here', this.props)

        this.state = {
            playlistSongs: [],
            emptyMessage: 'List of the songs is populated...',
            addSongToPlayList: false,
            isDataLoaded: false,
        }

        this.changeRating = this.changeRating.bind(this)
        this.allConstants = new Constants();
        this.shuffleSongs = this.shuffleSongs.bind(this);
        this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.getPlaylistSongs();
    }

    // change the rating of an song
    changeRating(id, rating) {
        console.log('Code reached in the MusicPanel', id, rating)

        let newSongs = [...this.state.playlistSongs]

        newSongs.forEach((ele, index, arr) => {
            if (ele._id == id) {
                arr[index].rating = rating
            }
        })

        this.setState({ playlistSongs: newSongs })
        this.modifySong(id, rating)
    }

    // modify the song by API call
    modifySong(id, rating) {
        let { allConstants } = this
        axios({
            method: allConstants.method.PUT,
            url: allConstants.updateRating.replace('{id}', id).replace('{rating}', rating),
            header: allConstants.header
        })
            .then((res) => {
                console.log(res.data.message)
            })
            .catch((err) => {
                console.log('Some Error occurred during the update', err)
            })
    }

    // get all the playlists back end
    getPlaylistSongs() {
        let allConstants = this.allConstants
        axios({
            method: allConstants.method.GET,
            url: allConstants.getPlaylistSongs.replace('{id}', this.props.playlistDetails.id),
            header: allConstants.header,
        })
            .then((res) => {
                if (res.data.length > 0) {
                    this.setState({ playlistSongs: res.data });
                    this.setState({ emptyMessage: "List of the songs is populated..." });
                } else {
                    this.setState({ emptyMessage: "No song is added to this Playlist, please add songs" });
                }
                this.setState({ isDataLoaded: true });
            })
            .catch((err) => {
                console.log('Error occurred...', err)
            })
    }

    shuffleSongs() {
        let songs = this.state.playlistSongs;
        let currentIndex = songs.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = songs[currentIndex];
            songs[currentIndex] = songs[randomIndex];
            songs[randomIndex] = temporaryValue;
        }

        this.setState({ playlistSongs: songs });
    }

    addSongToPlaylist() {
        this.setState({ addSongToPlaylist: true });
    }

    goBack() {
        this.setState({ addSongToPlaylist: false });
        this.setState({ isDataLoaded: false });
        this.getPlaylistSongs();
    }

    render() {
        let { playlistSongs, emptyMessage, addSongToPlaylist, isDataLoaded } = this.state;
        let { playlistDetails } = this.props;

        let songsGrid = (playlistSongs.length > 0) ?
            playlistSongs.map((song) => {
                return <Song key={song._id} {...song} changeRating={this.changeRating} />
            })
            :
            emptyMessage;

        let playlistHome = (addSongToPlaylist) ? <AddSongToPlaylist playlistSongs={playlistSongs} playlistDetails={playlistDetails} /> : songsGrid;

        let loader = <i className="fa fa-spinner fa-spin fa-lg loaderIcon" aria-hidden="true"></i>;

        return (
            <div className="show-songs">
                <div className="song-actions">
                    <span className="playlistName">{playlistDetails.name}</span>
                    <span>
                        {(!addSongToPlaylist) ? <button className="addSongBtn" type="button" onClick={this.props.goBackToPlayLists} >Go to Playlist</button> : ''}
                        {(!addSongToPlaylist && isDataLoaded) ? <button className="addSongBtn" type="button" onClick={this.addSongToPlaylist} >Add Song</button> : ''}
                        {(addSongToPlaylist) ? <button className="addSongBtn" type="button" onClick={this.goBack} >Go Back</button> : ''}
                        {(playlistSongs.length > 0 && !addSongToPlaylist) ? <button className="addSongBtn" type="button" onClick={this.shuffleSongs} >Shuffle Play</button> : ""}
                    </span>
                </div>
                {
                    (isDataLoaded) ? playlistHome : loader
                }
            </div>
        );
    }
};

export default SongsPanel;