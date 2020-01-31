import React from 'react';
import Tournament from '../../shared/Tournament/Tournament';
import playerData from '../../../helpers/data/playerData';
import Smash from '../../../helpers/data/smash';

class MyTournamentsView extends React.Component {
  state = {
    myGoingTournaments: [],
    myWishlistTournaments: [],
  }

  getMyTournaments = () => {
    Smash.myTournaments()
      .then((mine) => {
        this.setState({ myGoingTournaments: mine.myGoingTournaments, myWishlistTournaments: mine.myWishlistTournaments });
      })
      .catch((err) => console.error('err on get my wishlist tourneys', err));
  }

  updateAPlayer = (playerId, updatedPlayer) => {
    playerData.updatePlayer(playerId, updatedPlayer)
      .then(() => {
        this.toggle();
      })
      .catch((errOnUpdatePlayer) => console.error('err on update player', errOnUpdatePlayer));
  }

  componentDidMount() {
    this.getMyTournaments();
  }

  render() {
    const { myGoingTournaments, myWishlistTournaments } = this.state;
    return (
    <div>
      <div className="going-tournaments-container d-flex flex-row flex-wrap justify-content-around col-8">
        {myGoingTournaments.map((tournament) => (<Tournament key={tournament.id} tournament={tournament} isPersonalTournament={true} updateAPlayer={this.updateAPlayer}/>))}
      </div>
      <div className="wishlist-tournaments-container d-flex flex-row flex-wrap justify-content-around col-8">
        {myWishlistTournaments.map((tournament) => (<Tournament key={tournament.id} tournament={tournament} isPersonalTournament={true} playerId={tournament.playerId} updateAPlayer={this.updateAPlayer}/>))}
      </div>
    </div>
    );
  }
}

export default MyTournamentsView;
