import React from 'react';

import './SingleTournament.scss';
import tournamentData from '../../../helpers/data/tournamentData';
import playerData from '../../../helpers/data/playerData';
import Player from '../../shared/Player/Player';

class SingleTournament extends React.Component {
  state = {
    tournament: {},
    tourneyPlayers: [],
  }

  componentDidMount() {
    const { tournId } = this.props.match.params;
    tournamentData.getSingleTournament(tournId)
      .then((response) => {
        this.setState({ tournament: response.data });
      })
      .catch((err) => console.error('error in get single tournament', err));

    playerData.getPlayersByTournamentId(tournId)
      .then((response) => {
        this.setState({ tourneyPlayers: response });
        console.log(response);
      })
      .catch((err) => console.error('error in get tournament players', err));
  }


  render() {
    // const { tournamentId } = this.props.match.params;
    const { tournament } = this.state;
    const { tourneyPlayers } = this.state;
    return (
      <div className="SingleTournament">
        <h1>{tournament.name}</h1>
        <div className="single-tourn-info pt-4">
          <h4 className="label">Dates: </h4>
          <p>{tournament.startDate} - {tournament.endDate}</p>
          <h4 className="label"> Bid Fee: </h4>
          <p>{tournament.bidFee}</p>
          <h4 className="label"><a href={tournament.registrationLink}>Register here! </a></h4>
          <h3 className="mt-5">Players interested in {tournament.name}:</h3>
          <div className="interested-players-wrapper d-flex flex-row flex-wrap justify-content-around">
          {tourneyPlayers.map((player) => (<Player key={player.id} player={player}/>))}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleTournament;
