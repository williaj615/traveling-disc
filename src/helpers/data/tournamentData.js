import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllTournaments = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tournaments.json`)
    .then((result) => {
      const allTournamentsObj = result.data;
      const tournaments = [];
      if (allTournamentsObj != null) {
        Object.keys(allTournamentsObj).forEach((tournamentId) => {
          const newTournament = allTournamentsObj[tournamentId];
          newTournament.id = tournamentId;
          tournaments.push(newTournament);
        });
      }
      resolve(tournaments);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getAllTournaments };
