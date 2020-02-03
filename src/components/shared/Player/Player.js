import React from 'react';
import playerShape from '../../../helpers/propz/playerShape';
import './Player.scss';


class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;
    return (
      <div className="card player-card mb-1 mt-1">
      <p className="mt-1 mr-2 ml-2">{player.name}</p>
      <p>Status: {player.status}</p>
    </div>
    );
  }
}

export default Player;
