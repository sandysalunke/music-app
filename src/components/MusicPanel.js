import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'

// components
import SongsPanel from './allsongs/SongsPanel'
import TopFivePanel from './topfive/TopFivePanel'
import PlaylistsPanel from './playlists/PlaylistsPanel'
import NavBar from './layout/NavBar'

// Constants
import Constants from './Constants'

class MusicPanel extends Component {
    // static propTypes = {
    //   className: PropTypes.string,
    // };

    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            playlists: [],
            links: [{
                to: '/',
                desc: 'All Songs',
                id: 1
            },
            /*{
                to: '/topfive/',
                desc: 'Top 5 Songs',
                id: 2
            },*/
            {
                to: '/playlists/',
                desc: 'Playlists',
                id: 3
            },
            ],
            active: 1
        }

        this.allConstants = new Constants()
    }

    componentDidMount() {

    }

    makeActiveLink(index) {
        console.log('Index', index)

        this.setState({ active: index })
    }

    render() {
        let { songs, playlists, links, active } = this.state

        return (
            <Router>
                <div className="music-panel">
                    <NavBar links={links} active={active} makeActiveLink={this.makeActiveLink.bind(this)} />
                    <Switch>
                        <Route exact path="/"
                            render={(props) => (
                                <SongsPanel {...props} songs={songs} />
                            )} />

                        <Route path="/topfive/"
                            render={(props) => (
                                <TopFivePanel songs={songs} />
                            )} />

                        <Route path="/playlists/"
                            render={(props) => (
                                <PlaylistsPanel playlists={playlists} />
                            )} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default MusicPanel;