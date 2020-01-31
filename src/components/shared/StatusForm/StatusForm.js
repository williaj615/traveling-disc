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
import playerData from '../../../helpers/data/playerData';
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
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  savePlayerEvent = (e) => {
    const { tournament } = this.props;
    const currentUser = authData.getUid();
    const newPlayer = {
      name: this.state.newPlayerName,
      uid: currentUser,
      tournamentId: tournament.id,
      status: this.state.newPlayerStatus,
    };
    playerData.savePlayer(newPlayer)
      .then(() => {
        this.props.history.push('/');
      })
      .catch((errOnSavePlayer) => console.error('err on save tournament', errOnSavePlayer));
    this.setState({
      modal: false,
      newPlayerName: '',
      newPlayerUid: '',
      newPlayerTournamentId: '',
      newPlayerStatus: '',
    });
  }

  updatePlayerEvent = (e) => {
    e.preventDefault();
    const { tournament } = this.props;
    const currentUser = authData.getUid();
    const { playerId } = this.props;
    const updatedPlayer = {
      name: this.state.newPlayerName,
      uid: currentUser,
      tournamentId: tournament.id,
      status: this.state.newPlayerStatus,
    };
    playerData.updatePlayer(playerId, updatedPlayer)
      .then(() => {
        this.props.history.push('/personal');
      })
      .catch((errOnUpdatePlayer) => console.error('err on update player', errOnUpdatePlayer));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.player !== this.props.player && this.props.player) {
      const { player } = this.props;
      console.log('player', player);
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

  // goingtatusChange = (e) => {
  //   e.preventDefault();
  //   if (this.state.newPlayerStatus === 'wishlist' || '') {
  //     this.setState({ newPlayerStatus: 'going' });
  //   } else if (this.state.newPlayerStatus === 'going') {
  //     this.setState({ newPlayerStatus: 'wishlist' });
  //   } else {
  //     console.error('no valid status change');
  //   }
  // };

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
        <Button color="danger">Take this tournament off of my list.</Button>
        <Button color="primary" onClick={this.savePlayerEvent}>Save</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
    </div>);
  }
}

export default StatusForm;
