import authData from './authData';
import tournamentData from './tournamentData';
import playerData from './playerData';


const myTournaments = () => new Promise((resolve, reject) => {
  const currentUser = authData.getUid();
  tournamentData.getAllTournaments()
    .then((tournaments) => {
      playerData.getPlayersByUid(currentUser)
        .then((players) => {
          const mine = {
            myGoingTournaments: [],
            myWishlistTournaments: [],
          };
          players.forEach((player) => {
            const selectedTournament = tournaments.find((x) => x.id === player.tournamentId);
            selectedTournament.playerId = player.id;
            if (player.status === 'wishlist') {
              mine.myWishlistTournaments.push(selectedTournament);
            } else {
              mine.myGoingTournaments.push(selectedTournament);
            }
          });
          resolve(mine);
        });
    })
    .catch((err) => reject(err));
});

export default { myTournaments };
