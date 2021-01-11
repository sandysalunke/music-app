import React, { Component } from 'react';

class Song extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log('props in the song component\n', this.props)
        let { movie, album, name, genre, singers, _id } = this.props

        return (
            <div className="song-info">
                <div className="song-name">{name}
                    <div className="song-artist">
                        <span className="movie-info">{`${(movie) ? `Movie: ${movie}` : `Album: ${album}`}`}</span>
                        <div className="popover">
                            <span className="popover-icon fa fa-info-circle"></span>
                            <div className="popover-content">
                                <span className="popover-info">{`Name: ${name}`}</span>
                                <span className="popover-info">{`Movie: ${(movie) ? movie : album}`}</span>
                                <span className="popover-info">{`Genre: ${genre.join(', ')}`}</span>
                                <span className="popover-info">{`Singers: ${singers.join(', ')}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listen-song">
                </div>
                <div className="song-rating">
                    <button className="addSongBtn" type="button" onClick={() => this.props.addSongToPlaylist(_id)} >Add</button>
                </div>
            </div>
        );
    }
};

export default Song;