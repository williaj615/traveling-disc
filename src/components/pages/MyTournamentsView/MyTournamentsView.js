import React from 'react';
import Tournament from '../../shared/Tournament/Tournament';
import playerData from '../../../helpers/data/playerData';
import Smash from '../../../helpers/data/smash';
import './MyTournamentsView.scss';

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
      .then(() => this.getMyTournaments());
  }

  deleteAPlayer = (playerId) => {
    playerData.deletePlayer(playerId)
      .then(() => this.getMyTournaments());
  }

  componentDidMount() {
    this.getMyTournaments();
  }

  render() {
    const { myGoingTournaments, myWishlistTournaments } = this.state;
    return (
    <div className="my-page-container">
      <h2>I'm going to these tournaments!</h2>
      <div className="going-tournaments-container d-flex flex-row flex-wrap justify-content-around col-8">
        {myGoingTournaments.map((tournament) => (<Tournament key={tournament.id} tournament={tournament} isPersonalTournament={true} updateAPlayer={this.updateAPlayer} deleteAPlayer={this.deleteAPlayer}/>))}
      </div>
      <h2>Wishlist Tournaments</h2>
      <div className="wishlist-tournaments-container d-flex flex-row flex-wrap justify-content-around col-8">
        { myWishlistTournaments.length > 0
          ? myWishlistTournaments.map((tournament) => (<Tournament key={tournament.id} tournament={tournament} isPersonalTournament={true} playerId={tournament.playerId} updateAPlayer={this.updateAPlayer} deleteAPlayer={this.deleteAPlayer}/>))
          : ''
        }
      </div>
    </div>
    );
  }
}

export default MyTournamentsView;
