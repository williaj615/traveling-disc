import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import tournamentShape from '../../../helpers/propz/tournamentShape';
import authData from '../../../helpers/data/authData';
import StatusForm from '../StatusForm/StatusForm';
import playerData from '../../../helpers/data/playerData';
import './Tournament.scss';


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
      <div className="card tournament-card d-flex text-center col-3 m-2">
      { tournament.uid === this.currentUser
        ? (
          <div className="card-header">
            <div className="d-flex flex-row justify-content-end ml-0">
              <button className="delete-button btn ml-2 mr-0 p-0" onClick={this.deleteTournamentEvent}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
              <Link className="edit-button btn mr-0 ml-3 mt-0 p-0" to={`/tourn/${tournament.id}/edit`}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link>
            </div>
            <div className="d-flex flex-column text-center">
              <h3 className="mt-0">{tournament.name}</h3>
            </div>
          </div>)
        : (<h3 className="mt-4">{tournament.name}</h3>)
      }
      <div className="card-body">
        <p>{tournament.startDate}</p>
        <p>{tournament.endDate}</p>
        <p>{tournament.bidFee}</p>
        <p>{tournament.registrationLink}</p>
        <Link className="btn btn-secondary" to={`/tourn/${tournament.id}`}>View Tournament Details</Link>
        <StatusForm buttonLabel={this.state.buttonLabel} buttonLabel2={this.state.buttonLabel2} tournament={tournament} isPersonalTournament={isPersonalTournament} player={player} updateAPlayer={updateAPlayer} saveAPlayer={saveAPlayer} deleteAPlayer={deleteAPlayer}/>
      </div>
    </div>
    );
  }
}

export default Tournament;
