import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import tournamentShape from '../../../helpers/propz/tournamentShape';
import authData from '../../../helpers/data/authData';


class Tournament extends React.Component {
  static propTypes = {
    tournament: tournamentShape.tournamentShape,
    deleteATournament: PropTypes.func,
  }

  deleteTournamentEvent = (e) => {
    e.preventDefault();
    const { deleteATournament, tournament } = this.props;
    deleteATournament(tournament.id);
  }

  currentUser = authData.getUid();

  render() {
    const { tournament } = this.props;
    return (
      <div className="card tournament-card col-3 m-3">
      { tournament.uid === this.currentUser
        ? (<div><button className="delete-button btn btn-danger mb-2" onClick={this.deleteTournamentEvent}>X</button><button className="edit-button btn btn-dark">Edit</button></div>)
        : null
      }
      <h3>{tournament.name}</h3>
      <p>{tournament.startDate}</p>
      <p>{tournament.endDate}</p>
      <p>{tournament.bidFee}</p>
      <p>{tournament.registrationLink}</p>
      <button className="btn btn-primary">Add to My Tournaments</button>
      <Link className="btn btn-secondary" to={`/tourn/${tournament.id}`}>View</Link>
    </div>
    );
  }
}

export default Tournament;
