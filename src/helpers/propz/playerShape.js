import PropTypes from 'prop-types';

const playerShape = PropTypes.shape({
  id: PropTypes.string,
  uid: PropTypes.string.isRequired,
  tournamentId: PropTypes.string.isRequired,
});

export default { playerShape };
