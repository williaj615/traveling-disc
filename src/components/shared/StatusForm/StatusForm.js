import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import authData from '../../../helpers/data/authData';
import tournamentShape from '../../../helpers/propz/tournamentShape';

class StatusForm extends React.Component {
  state = {
    newPlayerName: '',
    newPlayerUid: '',
    newPlayerTournamentId: '',
    newPlayerStatus: '',
  };

  static propTypes = {
    buttonLabel: PropTypes.string,
    buttonLabel2: PropTypes.string,
    tournament: tournamentShape.tournamentShape,
    isPersonalTournament: PropTypes.bool,
    updateAPlayer: PropTypes.func,
    saveAPlayer: PropTypes.func,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  savePlayerEvent = (e) => {
    const { tournament, saveAPlayer } = this.props;
    const currentUser = authData.getUid();
    const newPlayer = {
      name: this.state.newPlayerName,
      uid: currentUser,
      tournamentId: tournament.id,
      status: this.state.newPlayerStatus,
    };
    saveAPlayer(newPlayer);
    this.toggle();
  }

  updatePlayerEvent = (e) => {
    const { tournament, updateAPlayer } = this.props;
    const currentUser = authData.getUid();
    const playerId = this.props.player.id;
    const updatedPlayer = {
      name: this.state.newPlayerName,
      uid: currentUser,
      tournamentId: tournament.id,
      status: this.state.newPlayerStatus,
    };
    updateAPlayer(playerId, updatedPlayer);
    this.toggle();
  }

  deletePlayerEvent = (e) => {
    const { tournament, deleteAPlayer } = this.props;
    const playerId = this.props.player.id;
    deleteAPlayer(playerId);
    this.toggle();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.player !== this.props.player && this.props.player) {
      const { player } = this.props;
      this.setState({
        newPlayerName: player.name,
        newPlayerUid: player.uid,
        newPlayerTournamentId: player.tournamentId,
        newPlayerStatus: player.status,
      });
    }
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ newPlayerName: e.target.value });
  }

  goingStatusChange = (e) => {
    this.setState({ newPlayerStatus: 'going' });
  }

  wishlistStatusChange = (e) => {
    this.setState({ newPlayerStatus: 'wishlist' });
  }

  render() {
    const {
      tournament,
      buttonLabel,
      buttonLabel2,
      isPersonalTournament,
      player,

    } = this.props;
    return (
    <div>
    {isPersonalTournament ? <Button onClick={this.toggle}>{buttonLabel2}</Button>
      : <Button onClick={this.toggle}>{buttonLabel}</Button>}
    <Modal isOpen={this.state.modal} toggle={this.toggle}>
      <ModalHeader toggle={this.toggle} className="player-modal">{tournament.name}</ModalHeader>
      <ModalBody>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">First and last name</span>
          </div>
          <input value={this.state.newPlayerName} type="text" className="form-control" onChange={this.nameChange}/>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onChange={this.goingStatusChange} checked={this.state.newPlayerStatus === 'going'}/>
          <label className="form-check-label" htmlFor="exampleRadios1">
            I am going to this tournament!
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onChange={this.wishlistStatusChange} checked={this.state.newPlayerStatus === 'wishlist'}/>
          <label className="form-check-label" htmlFor="exampleRadios2">
            I would like to go to this tournament!
          </label>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={this.deletePlayerEvent}>Take this tournament off of my list.</Button>
        { !player
          ? <Button color="primary" onClick={this.savePlayerEvent}>Save</Button>
          : <Button color="warning" onClick={this.updatePlayerEvent}>Update</Button>
        }
        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
    </div>);
  }
}

export default StatusForm;
