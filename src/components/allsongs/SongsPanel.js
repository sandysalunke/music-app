import React, { Component } from 'react';
import axios from 'axios'

// components
import Song from './Song';
import SearchBar from './SearchBar';

// Constants
import Constants from '../Constants';

class SongsPanel extends Component {

    constructor(props) {
        super(props)
        console.log('props here', this.props)
        this.state = {
            songs: this.props.songs,
            songsList: this.props.songs,
            searchText: '',
            emptyMessage: 'List of the songs is populated...',
            isDataLoaded: false,
        }

        this.allConstants = new Constants();

        // to help the garbage collector
        this.changeRating = this.changeRating.bind(this)
        this.changeSearchText = this.changeSearchText.bind(this);
        this.clearSerchText = this.clearSerchText.bind(this);
        this.checkIfEnterPressed = this.checkIfEnterPressed.bind(this);
        this.getSongs = this.getSongs.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.songs.length != this.props.songs.length) {
            this.setState({ songs: nextProps.songs })
        }
    }

    componentWillMount() {
        this.getSongs();
    }


    // change the rating of an song
    changeRating(id, rating) {
        console.log('Code reached in the MusicPanel', id, rating)

        let newSongs = [...this.state.songs]

        newSongs.forEach((ele, index, arr) => {
            if (ele._id == id) {
                arr[index].rating = rating
            }
        })

        this.setState({ songs: newSongs })
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


    // get all the songs from back end
    getSongs() {
        let allConstants = this.allConstants
        axios({
            method: allConstants.method.GET,
            url: allConstants.getSongs,
            header: allConstants.header
        })
            .then((res) => {
                this.setState({ songs: res.data });
                this.setState({ songsList: res.data });
                this.setState({ isDataLoaded: true });
            })
            .catch((err) => {
                console.log('Error occurred...', err)
            })
    }

    changeSearchText(event) {
        let searchText = event.target.value;
        this.setState({ searchText: searchText });
        if (searchText == "") {
            this.setState({ songs: this.state.songsList });
        } else {
            this.modifySongs();
        }
    }

    // when the X is pressed
    clearSerchText() {
        this.setState({ searchText: '' });
        this.setState({ songs: this.state.songsList });
    }

    checkIfEnterPressed(event) {
        event.persist()

        if (event.which == 13 || event.keyCode == 13) {
            this.modifySongs()
        }
    }

    // modify the list of songs based on searched text
    modifySongs() {
        let toBeSearchedSongs = [...this.state.songsList]
        let searchValue = this.state.searchText.toLowerCase()
        // console.log('search value is', searchValue)

        if (searchValue != '') {
            // if the user is searching something only then 
            toBeSearchedSongs = toBeSearchedSongs.filter((song) => {

                let songAttrs = `${song.name}, ${song.genre.join(', ')}, ${song.singers.join(', ')}, ${(song.movie) ? song.movie : song.album}`
                songAttrs = songAttrs.toLowerCase()
                // console.log('attrs:', songAttrs, songAttrs.includes(searchValue))

                return songAttrs.includes(searchValue)
            })
        }

        this.setState({ songs: toBeSearchedSongs })

        if (toBeSearchedSongs.length == 0) {
            this.setState({ emptyMessage: 'Not found try with something else' })
        }
    }

    render() {

        let { songs, searchText, emptyMessage, isDataLoaded } = this.state;

        let songsPanel = (songs.length > 0) ?
            songs.map((song) => {
                return <Song key={song._id} {...song} changeRating={this.changeRating} />
            })
            :
            emptyMessage;

        let loader = <i className="fa fa-spinner fa-spin fa-lg loaderIcon" aria-hidden="true"></i>;

        return (
            <div className="show-songs">
                <SearchBar
                    searchText={searchText}
                    clearSerchText={this.clearSerchText}
                    checkIfEnterPressed={this.checkIfEnterPressed}
                    changeSearchText={this.changeSearchText} />

                <div className="song-list">
                    {
                        (isDataLoaded) ? songsPanel : loader
                    }
                </div>
            </div>
        );
    }
};



export default SongsPanel;