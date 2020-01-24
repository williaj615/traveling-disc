import React from 'react';
import { Link } from 'react-router-dom';
import tournamentShape from '../../../helpers/propz/tournamentShape';
import authData from '../../../helpers/data/authData';


class Tournament extends React.Component {
  static propTypes = {
    tournament: tournamentShape.tournamentShape,
  }

  currentUser = authData.getUid();

  render() {
    const { tournament } = this.props;
    return (
      <div className="card tournament-card col-3 m-3">
      <button className="delete-button btn btn-danger mb-2" >X</button>
      <button className="edit-button btn btn-dark">Edit</button>
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
