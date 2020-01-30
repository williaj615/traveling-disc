import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayersByTournamentId = (tournamentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json?orderBy="tournamentId"&equalTo="${tournamentId}"`)
    .then((result) => {
      const allPlayersObj = result.data;
      const players = [];
      if (allPlayersObj != null) {
        Object.keys(allPlayersObj).forEach((playerId) => {
          const newPlayer = allPlayersObj[playerId];
          newPlayer.id = playerId;
          players.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((err) => {
      reject(err);
    });
});

const getAllPlayers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json`)
    .then((result) => {
      const allPlayersObj = result.data;
      const players = [];
      if (allPlayersObj != null) {
        Object.keys(allPlayersObj).forEach((playerId) => {
          const newPlayer = allPlayersObj[playerId];
          newPlayer.id = playerId;
          players.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((err) => {
      reject(err);
    });
});

const savePlayer = (newPlayer) => axios.post(`${baseUrl}/players.json`, newPlayer);

const updatePlayer = (playerId, updatedPlayer) => axios.put(`${baseUrl}/players/${playerId}.json`, updatedPlayer);

export default {
  getPlayersByTournamentId,
  savePlayer,
  updatePlayer,
  getAllPlayers,
};
