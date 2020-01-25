import PropTypes from 'prop-types';

const tournamentShape = PropTypes.shape({
  id: PropTypes.string,
  bidFee: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  registrationLink: PropTypes.string.isRequired,
  isBeach: PropTypes.bool.isRequired,
  isInternational: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { tournamentShape };
