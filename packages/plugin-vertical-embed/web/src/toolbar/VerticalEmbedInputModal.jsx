import PropTypes from 'prop-types';
import { Component } from 'react';

// import { contentTypeMap } from '../constants';
// import ItemsList from './itemsList/ItemsList';
// import styles from '../../statics/styles/vertical-embed-modal.scss';
// import generalStyles from '../../statics/styles/general.scss';
export default class VerticalEmbedInputModal extends Component {}

VerticalEmbedInputModal.propTypes = {
  onConfirm: PropTypes.func,
  onReplace: PropTypes.func,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  verticalsApi: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};
