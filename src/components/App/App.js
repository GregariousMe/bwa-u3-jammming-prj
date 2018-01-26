import React from 'react';

import './App.css';
import Spotify from '../../util/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';


class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        searchResults: [],
        playListTracks: [],
        playListName: 'New Shamalongadingdong'

      };

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlayListName = this.updatePlayListName.bind(this);
      this.savePlayList = this.savePlayList.bind(this);
      this.search = this.search.bind(this);
    }

    updatePlayListName(name) {
      this.setState({playListName: name});
    }

    addTrack(track) {
      let tracks = this.state.playListTracks;
      if (!tracks.includes(track)){
        tracks.push(track);
        this.setState({playListTracks: tracks});
      }
    }

    removeTrack(track) {
      let tracks = this.state.playListTracks;
      tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

      this.setState({playListTracks: tracks});
    }



    savePlayList() {
      const trackURIs = this.state.playListTracks.map(track => track.uri);
      Spotify.savePlayList(this.state.playListName, trackURIs);
      this.setState({
        playListTracks: [],
        playListName: 'New Personal Grooves' });
    }

    search(term) {
      Spotify.search(term).then(SearchResults)
      {
        this.setState({SearchResults: SearchResults})
      };
    }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">

      <SearchBar
        onSearch={this.state.search}/>

      <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} />

      <PlayList
        playListName={this.state.playListName}
        playListTracks={this.state.playListTracks}
        onNameChange={this.state.updatePlayListName}
        onSave={this.state.savePlayList}
        />

      </div>
    </div>
  </div>
    );
  }
}

export default App;
