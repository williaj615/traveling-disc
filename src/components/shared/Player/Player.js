import React from 'react';
import playerShape from '../../../helpers/propz/playerShape';


class Player extends React.Component {
  static propTypes = {
    tournament: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;
    return (
      <div className="card tournament-card col-1 mb-1 mt-1">
      <p>{player.uid}</p>
    </div>
    );
  }
}

export default Player;
