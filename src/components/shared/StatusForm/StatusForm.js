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

class StatusForm extends React.Component {
  state = {
    newPlayerName: '',
    newPlayerUid: '',
    newPlayerTournamentId: '',
    newPlayerStatus: '',
  };

  static propTypes = {
    buttonLabel: PropTypes.string,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  savePlayerEvent = (e) => {
    const currentUser = authData.getUid();
    const newPlayer = {
      name: this.state.newPlayerName,
      uid: currentUser,
      tournamentId: this.state.newPlayerTournamentId,
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

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ newPlayerName: e.target.value });
  }

  statusChange = (e) => {

  };


  render() {
    const { tournament } = this.props;
    return (
    <div>
    <Button>{this.props.buttonLabel}</Button>
    <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
      <ModalHeader toggle={this.toggle} className="player-modal">{tournament.name}</ModalHeader>
      <ModalBody>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">First and last name</span>
          </div>
          <input type="text" className="form-control" onChange={this.nameChange}/>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
          <label className="form-check-label" for="exampleRadios1">
            I am going to this tournament!
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
          <label className="form-check-label" for="exampleRadios2">
            I would like to go to this tournament!
          </label>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.savePlayerEvent}>Save</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
    </div>);
  }
}

export default { StatusForm };
