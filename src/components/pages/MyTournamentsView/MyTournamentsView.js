import React from 'react';
import playerData from '../../../helpers/data/playerData';
import tournamentData from '../../../helpers/data/tournamentData';
import authData from '../../../helpers/data/authData';

class MyTournamentsView extends React.Component {
  state = {
    // myPlayers: [],
    myTournamentIds: [],

  }

  // get all players
  // filter players for those with uid equal to the current user
  // get all the tournament ids of those players (myTournamentIds)
  // get all Tournaments
  // filter for the ones that match (myTournamentIds)

  getMyTournaments = () => {
    const currentUser = authData.getUid();
    playerData.getAllPlayers()
      .then((players) => {
        const myPlayerObjects = players.filter((x) => x.uid === currentUser);
        // this.setState({ myPlayers: myPlayerObjects });
        Object.keys(myPlayerObjects).forEach((playerId) => {
          const playerObject = myPlayerObjects[playerId];
          const playerTournId = playerObject.tournamentId;
          this.state.myTournamentIds.push(playerTournId);
        });
        console.log(this.state.myTournamentIds);
      })
      .catch((err) => console.error('err on get my players', err));
    // tournamentData.getAllTournaments()
    // .then((tournaments) => )
  }

  // getMyTournaments = (uid) => {
  //   const currentUser = authData.getUid();
  //   playerData.getPlayersByUid(currentUser)
  //     .then((players) => Object.keys(players).forEach((playerId) => {
  //       const tournamentPlayer = players[playerId];
  //       this.setState({ tournamentId: tournamentPlayer.tournamentId });
  //       this.state.myTournamentIds.push(this.state.tournamentId);
  //     }));
  //   console.log(this.state.myTournamentIds);

  // }

  componentDidMount() {
    this.getMyTournaments();
  }

  render() {
    return (
      <div>Viewing Your Personal Tournaments!</div>
    );
  }
}

export default MyTournamentsView;
