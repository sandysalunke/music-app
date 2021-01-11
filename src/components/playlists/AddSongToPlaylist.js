import React, { Component } from 'react';
import axios from 'axios'

// components
import AddSong from './AddSong'
import SearchBar from '../allsongs/SearchBar'

// Constants
import Constants from '../Constants'

class SongsPanel extends Component {

    constructor(props) {
        super(props)

        console.log('props here', this.props)

        this.state = {
            songs: [],
            songsList: [],
            searchText: '',
            emptyMessage: 'List of the songs is populated...',
            isDataLoaded: false,
        }

        this.allConstants = new Constants();

        // to help the garbage collector
        this.changeSearchText = this.changeSearchText.bind(this);
        this.clearSerchText = this.clearSerchText.bind(this);
        this.checkIfEnterPressed = this.checkIfEnterPressed.bind(this);
        this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    }

    componentDidMount() {
        this.getSongs(this.props.playlistSongs);
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

    comparer(otherArray) {
        return (current) => {
            return otherArray.filter(function (other) {
                return other.value == current.value && other.display == current.display
            }).length == 0;
        }
    }

    // get all the playlists back end
    getSongs(playlistSongs) {
        let allConstants = this.allConstants
        axios({
            method: allConstants.method.GET,
            url: allConstants.getSongs,
            header: allConstants.header
        })
            .then((res) => {
                const songs = res.data.filter(song => !playlistSongs.some(playlistSong => song._id === playlistSong._id));

                this.setState({ songs: songs });
                this.setState({ songsList: songs });

                this.setState({ isDataLoaded: true });
            })
            .catch((err) => {
                console.log('Error occurred...', err)
            })
    }

    addSongToPlaylist(id) {
        let allConstants = this.allConstants;

        axios({
            method: allConstants.method.PUT,
            url: allConstants.addSongToPlaylist,
            header: allConstants.header,
            params: { playlistId: this.props.playlistDetails.id, songId: id }
        })
            .then((res) => {
                console.log("Song added to playlist...");
                let songs = this.state.songsList.filter(song => song._id != id);
                this.setState({ songs: songs });
                this.setState({ songsList: songs });
            })
            .catch((err) => {
                console.log('Error occurred...', err)
            })
    }

    render() {
        let { songs, searchText, emptyMessage, isDataLoaded } = this.state;

        let songsList = (songs.length > 0) ?
            songs.map((song) => {
                return <AddSong key={song._id} {...song} addSongToPlaylist={this.addSongToPlaylist} />
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
                        (isDataLoaded) ? songsList : loader
                    }
                </div>
            </div>
        );
    }
};

export default SongsPanel;