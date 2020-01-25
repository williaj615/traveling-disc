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
        <p>{tournament.startDate}</p>
        <p>{tournament.endDate}</p>
        <p>{tournament.bidFee}</p>
        <p>{tournament.registrationLink}</p>
        <h3>Players interested in {tournament.name}</h3>
        <div className="d-flex flex-row flex-wrap justify-content-around">
        {tourneyPlayers.map((player) => (<Player key={player.id} player={player}/>))}
        </div>
      </div>
    );
  }
}

export default SingleTournament;
