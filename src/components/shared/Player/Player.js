import React from 'react';
import playerShape from '../../../helpers/propz/playerShape';


class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;
    return (
      <div className="card tournament-card col-1 mb-1 mt-1">
      <p>{player.name}</p>
      <p>{player.status}</p>
    </div>
    );
  }
}

export default Player;
