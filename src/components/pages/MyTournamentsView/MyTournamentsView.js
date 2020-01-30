import React from 'react';
import playerData from '../../../helpers/data/playerData';
import tournamentData from '../../../helpers/data/tournamentData';
import authData from '../../../helpers/data/authData';
import Tournament from '../../shared/Tournament/Tournament';

class MyTournamentsView extends React.Component {
  state = {
    myTournamentIds: [],
    myTournaments: [],
  }

  getMyTournaments = () => {
    const currentUser = authData.getUid();
    playerData.getAllPlayers()
      .then((players) => {
        const myPlayerObjects = players.filter((x) => x.uid === currentUser);
        const tournamentIds = [];
        Object.keys(myPlayerObjects).forEach((playerId) => {
          const playerObject = myPlayerObjects[playerId];
          const playerTournId = playerObject.tournamentId;
          tournamentIds.push(playerTournId);
        });
        this.setState({ myTournamentIds: tournamentIds });
        console.log(this.state.myTournamentIds);
        tournamentData.getAllTournaments()
          .then((tournaments) => {
            const filteredTourneys = tournaments.filter((x) => tournamentIds.includes(x.id));
            this.setState({ myTournaments: filteredTourneys });
            console.log(filteredTourneys);
          })
          .catch((err) => console.error('err on getting personal tourns', err));
      })
      .catch((err) => console.error('err on get my players', err));
  }

  componentDidMount() {
    this.getMyTournaments();
  }

  render() {
    const { myTournaments } = this.state;
    return (
      <div className="all-tournaments-container d-flex flex-row flex-wrap justify-content-around col-10">
        {myTournaments.map((tournament) => (<Tournament key={tournament.id} tournament={tournament}/>))}
      </div>
    );
  }
}

export default MyTournamentsView;
