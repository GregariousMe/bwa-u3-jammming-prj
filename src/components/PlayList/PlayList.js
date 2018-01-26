
import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
}

    handleNameChange(event) {
      this.props.onNameChange(event.target.value);
    }

  render() {
    return (
    <div className="PlayList">
    <input onChange={this.handleNameChange} value={this.props.playListName} />
  <TrackList tracks={this.props.playListTracks}
          isRemoval={true}
          onRemove={this.props.onRemove}
          />
  <a className="PlayList-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
    );
  }
}

export default PlayList;
