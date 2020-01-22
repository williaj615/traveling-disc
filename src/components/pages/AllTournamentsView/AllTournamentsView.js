import React from 'react';
import tournamentData from '../../../helpers/data/tournamentData';
import Tournament from '../../shared/Tournament/Tournament';

class AllTournamentsView extends React.Component {
  state = {
    tournaments: [],

  }

  getTournaments = () => {
    tournamentData.getAllTournaments()
      .then((tournaments) => {
        this.setState({ tournaments });
      })
      .catch((err) => console.error('error on get all tournaments', err));
  }

  componentDidMount() {
    this.getTournaments();
  }

  render() {
    return (
      <div className="all-tournaments-container d-flex flex-row flex-wrap justify-content-around">
        {this.state.tournaments.map((tournament) => (<Tournament key={tournament.id} tournament={tournament} />))}
      </div>
    );
  }
}

export default AllTournamentsView;
