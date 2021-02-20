import PropTypes from 'prop-types';
import { PollOptionPropTypes } from '../poll-context/types';

export const OptionPropTypes = {
  option: PollOptionPropTypes,
  removeEnabled: PropTypes.bool,
  update: PropTypes.func,
  remove: PropTypes.func,
  vote: PropTypes.func,
  unvote: PropTypes.func,
  poll: PropTypes.object,
  imageEnabled: PropTypes.bool,
  voteEnabled: PropTypes.bool,
  showResults: PropTypes.bool,
};
