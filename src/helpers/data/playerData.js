import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayersByTournamentId = (tournamentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json?orderBy="tournamentId"&equalTo="${tournamentId}"`)
    .then((result) => {
      const allPlayersObj = result.data;
      const players = [];
      if (allPlayersObj != null) {
        Object.keys(allPlayersObj).forEach((player) => {
          const newPlayer = allPlayersObj[player];
          newPlayer.id = player.id;
          players.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getPlayersByTournamentId };
