import React, { Component } from 'react';

// components

class Song extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log('props in the song component\n', this.props)
        let { name, created } = this.props

        return (
            <div className="song-info" onClick={() => this.props.loadPlaylist(this.props)}>
                <div className="song-name playlistName">
                    {name}
                </div>
                <div className="listen-song">
                </div>
                <div className="song-rating">
                    {new Date(created).toDateString()}
                </div>
            </div>
        );
    }
};

export default Song;