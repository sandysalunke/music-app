import React, { Component } from 'react';
import axios from 'axios'

// components
import PlaylistItem from './PlaylistItem';
import PlaylistHome from './PlaylistHome';

// Constants
import Constants from '../Constants';

class SongsPanel extends Component {

    constructor(props) {
        super(props)
        console.log('props here', this.props)
        this.state = {
            isPlaylistSelected: false,
            selectedPlaylist: {},
            playlists: this.props.playlists,
            emptyMessage: 'Playlist is populated...',
            isDataLoaded: false,
            playlistName: '',
        }

        this.allConstants = new Constants();

        this.loadPlaylist = this.loadPlaylist.bind(this);
        this.goToPlaylists = this.goToPlaylists.bind(this);
        this.getPlaylists = this.getPlaylists.bind(this);
        this.createPlaylist = this.createPlaylist.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playlists.length != this.props.playlists.length) {
            this.setState({ playlists: nextProps.playlists })
        }
    }

    componentWillMount() {
        this.getPlaylists();
    }

    loadPlaylist(props) {
        this.setState({ isPlaylistSelected: true });
        this.setState({ selectedPlaylist: { id: props._id, name: props.name, created: props.created } });
    }

    // get all the playlists back end
    getPlaylists() {
        let allConstants = this.allConstants
        axios({
            method: allConstants.method.GET,
            url: allConstants.getPlaylists,
            header: allConstants.header,
        })
            .then((res) => {
                this.setState({ playlists: res.data });
                this.setState({ isDataLoaded: true });
            })
            .catch((err) => {
                console.log('Error occurred...', err)
            })
    }

    goToPlaylists() {
        this.setState({ isPlaylistSelected: false });
    }

    handleChange(event) {
        this.setState({ playlistName: event.target.value });
    }

    createPlaylist() {
        if (this.state.playlistName != '') {
            let allConstants = this.allConstants
            axios({
                method: allConstants.method.POST,
                url: allConstants.createPlaylist,
                header: allConstants.header,
                params: { name: this.state.playlistName, user: "5ff81956aa8201bec3135498" }
            })
                .then((res) => {
                    this.setState({ playlistName: '' });
                    this.getPlaylists();
                })
                .catch((err) => {
                    console.log('Error occurred...', err)
                })
        }
    }

    render() {
        let { playlists, isPlaylistSelected, emptyMessage, isDataLoaded, playlistName } = this.state

        let playlistGrid = (playlists.length > 0) ?
            playlists.map((playlist) => {
                return <PlaylistItem key={playlist._id} {...playlist} loadPlaylist={this.loadPlaylist} />
            })
            :
            emptyMessage;

        let playlistHome = <PlaylistHome playlistDetails={this.state.selectedPlaylist} goBackToPlayLists={this.goToPlaylists} />;

        let playListPanel = (isPlaylistSelected) ? playlistHome : playlistGrid;

        let createPlaylistPanel = <div className="song-actions">
            <span className="playlistName"></span>
            <span>
                <span className="playlistName">
                    <input className="createProjectInput" placeholder="Type playlist name here" type="text" value={playlistName} onChange={this.handleChange} />
                </span>
                <span>
                    <button className="addSongBtn" type="button" onClick={this.createPlaylist} >Create Playlist</button>
                </span>
            </span>
        </div>;

        let loader = <i className="fa fa-spinner fa-spin fa-lg loaderIcon" aria-hidden="true"></i>;

        return (
            <div className="show-songs">
                { (!isPlaylistSelected) ? createPlaylistPanel : '' }
                <div className="song-list">
                    {
                        (isDataLoaded) ? playListPanel : loader
                    }
                </div>
            </div>
        );
    }
};

export default SongsPanel;