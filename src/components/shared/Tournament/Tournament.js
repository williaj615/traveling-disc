import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import tournamentShape from '../../../helpers/propz/tournamentShape';
import authData from '../../../helpers/data/authData';
import StatusForm from '../StatusForm/StatusForm';
import playerData from '../../../helpers/data/playerData';


class Tournament extends React.Component {
  state = {
    buttonLabel: 'Add to My Tournaments',
    buttonLabel2: 'Update My Attendance',
    player: {},
  }

  static propTypes = {
    tournament: tournamentShape.tournamentShape,
    deleteATournament: PropTypes.func,
    isPersonalTournament: PropTypes.bool,
    updateAPlayer: PropTypes.func,
    saveAPlayer: PropTypes.func,
    deleteAPlayer: PropTypes.func,
  }

  currentUser = authData.getUid();

  componentDidMount() {
    playerData.getMyPlayerByTournamentId(this.currentUser, this.props.tournament.id)
      .then((player) => this.setState({ player }))
      .catch((err) => console.error('SUPERerror', err));
  }

  deleteTournamentEvent = (e) => {
    e.preventDefault();
    const { deleteATournament, tournament } = this.props;
    deleteATournament(tournament.id);
  }

  render() {
    const {
      tournament,
      isPersonalTournament,
      updateAPlayer,
      saveAPlayer,
      deleteAPlayer,
    } = this.props;
    const { player } = this.state;
    return (
      <div className="card tournament-card col-3 m-3">
      { tournament.uid === this.currentUser
        ? (<div>
          <button className="delete-button btn btn-danger mb-2" onClick={this.deleteTournamentEvent}>X</button>
          <Link className="edit-button btn btn-dark" to={`/tourn/${tournament.id}/edit`}>Edit</Link>
          </div>)
        : null
      }
      <h3>{tournament.name}</h3>
      <p>{tournament.startDate}</p>
      <p>{tournament.endDate}</p>
      <p>{tournament.bidFee}</p>
      <p>{tournament.registrationLink}</p>
      <Link className="btn btn-secondary" to={`/tourn/${tournament.id}`}>View Tournament Details</Link>
      <StatusForm buttonLabel={this.state.buttonLabel} buttonLabel2={this.state.buttonLabel2} tournament={tournament} isPersonalTournament={isPersonalTournament} player={player} updateAPlayer={updateAPlayer} saveAPlayer={saveAPlayer} deleteAPlayer={deleteAPlayer}/>
    </div>
    );
  }
}

export default Tournament;
