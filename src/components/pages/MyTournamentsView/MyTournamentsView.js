import React from 'react';
import playerData from '../../../helpers/data/playerData';
import tournamentData from '../../../helpers/data/tournamentData';
import authData from '../../../helpers/data/authData';
import Tournament from '../../shared/Tournament/Tournament';

class MyTournamentsView extends React.Component {
  state = {
    myTournamentIds: [],
    myTournaments: [],
    myGoingTournaments: [],
    myWishlistTournaments: [],
    myPlayers: [],
    myGoingPlayers: [],
    myWishlistPlayers: [],
  }

  getMyGoingTournaments = () => {
    const currentUser = authData.getUid();
    const goingTournaments = [];
    playerData.getAllPlayers()
      .then((players) => {
        const myPlayerObjects = players.filter((x) => x.uid === currentUser);
        this.setState({ myPlayers: myPlayerObjects });
        const { myPlayers } = this.state;
        const goingPlayerObjects = myPlayers.filter((x) => x.status === 'going');
        this.setState({ myGoingPlayers: goingPlayerObjects });
        const { myGoingPlayers } = this.state;
        myGoingPlayers.forEach((goingPlayer) => {
          tournamentData.getSingleTournament(goingPlayer.tournamentId)
            .then((response) => {
              const newTournament = response.data;
              goingTournaments.push(newTournament);
            })
            .catch((err) => console.error('same damn error', err));
        });
      })
      .catch((err) => console.error('err on get my going tourneys', err));
    this.setState({ myGoingTournaments: goingTournaments });
  }

  getMyWishlistTournaments = () => {
    const currentUser = authData.getUid();
    const wishlistTournaments = [];
    playerData.getAllPlayers()
      .then((players) => {
        const myPlayerObjects = players.filter((x) => x.uid === currentUser);
        this.setState({ myPlayers: myPlayerObjects });
        const { myPlayers } = this.state;
        const wishlistPlayerObjects = myPlayers.filter((x) => x.status === 'wishlist');
        this.setState({ myWishlistPlayers: wishlistPlayerObjects });
        const { myWishlistPlayers } = this.state;
        myWishlistPlayers.forEach((wishlistPlayer) => {
          tournamentData.getSingleTournament(wishlistPlayer.tournamentId)
            .then((response) => {
              const newTournament = response.data;
              wishlistTournaments.push(newTournament);
            })
            .catch((err) => console.error('same damn error', err));
        });
      })
      .catch((err) => console.error('err on get my wishlist tourneys', err));
    this.setState({ myWishlistTournaments: wishlistTournaments });
  }

  // const tournamentIds = [];
  // Object.keys(myPlayerObjects).forEach((playerId) => {
  //   const playerObject = myPlayerObjects[playerId];
  //   const playerTournId = playerObject.tournamentId;
  //   tournamentIds.push(playerTournId);
  // });
  // this.setState({ myTournamentIds: tournamentIds });
  // console.log(this.state.myTournamentIds);
  // tournamentData.getAllTournaments()
  //   .then((tournaments) => {
  //     const filteredTourneys = tournaments.filter((x) => tournamentIds.includes(x.id));
  //     this.setState({ myTournaments: filteredTourneys });
  //     console.log(filteredTourneys);
  //   })
  //   .catch((err) => console.error('err on getting personal tourns', err));
  // const { myPlayers } = this.state;
  // console.log(myPlayers);
  // const goingPlayerObjects = myPlayers.filter((x) => ({

  // });
  // this.setState({ myGoingPlayers: goingPlayerObjects });
  // const goingTournaments = [];
  // const { myGoingPlayers } = this.state;
  // myGoingPlayers.forEach((goingPlayer) => {
  //   const newTournament = tournamentData.getSingleTournament(goingPlayer.tournamentId);
  //   goingTournaments.push(newTournament);
  // });
  // console.log(goingTournaments);


  // getGoingTournaments = () => {
  //   const { myPlayers } = this.state;
  //   const goingPlayerObjects = myPlayers.filter((x) => x.status === 'going');
  //   this.setState({ myGoingPlayers: goingPlayerObjects });
  //   const goingTournaments = [];
  //   const { myGoingPlayers } = this.state;
  //   myGoingPlayers.forEach((goingPlayer) => {
  //     const newTournament = tournamentData.getSingleTournament(goingPlayer.tournamentId)
  //       .then(() => goingTournaments.push(newTournament))
  //       .catch((err) => console.error('err on get going tourns', err));
  //   });
  //   this.setState({ myGoingTournaments: goingTournaments });
  // };

  // sortTournaments = () => {
  //   const { myTournamentIds } = this.state;
  //   myTournamentIds.forEach((tournamentId) => {
  //     playerData.getPlayersByTournamentId(tournamentId)
  //     .then((players) => {
  //       const filteredPlayers = players.filter((x) => players.includes(x.status === 'going'))
  //       this.setState({ })
  //     )
  //   })
  // }

  componentDidMount() {
    this.getMyGoingTournaments();
    this.getMyWishlistTournaments();
  }

  render() {
    const { myGoingTournaments } = this.state;
    return (
    <div className="going-tournaments-container d-flex flex-row flex-wrap justify-content-around col-10">
      {myGoingTournaments.map((tournament) => (<Tournament key={tournament.id} tournament={tournament}/>))}
    </div>
    );
  }
}

export default MyTournamentsView;
