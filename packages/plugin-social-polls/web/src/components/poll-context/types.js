import PropTypes from 'prop-types';

export const PollOptionPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  mediaId: PropTypes.string,
  count: PropTypes.number,
  rating: PropTypes.number,
});

export const PollPropTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  mediaId: PropTypes.string,
  settings: PropTypes.shape({
    multipleVotes: PropTypes.bool.isRequired,
    votesDisplay: PropTypes.bool.isRequired,
    votersDisplay: PropTypes.bool.isRequired,
    voteRole: PropTypes.string.isRequired,
    resultsVisibility: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(PollOptionPropTypes).isRequired,
};

export const PollActionsPropTypes = {
  changePollTitle: PropTypes.func,
  changePollImage: PropTypes.func,
  updatePollOption: PropTypes.func,
  addOption: PropTypes.func,
  removeOption: PropTypes.func,
};

export const PollContextPropTypes = {
  poll: PropTypes.shape({
    ...PollPropTypes,
    ...PollActionsPropTypes,
  }),
};
