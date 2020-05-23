import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/tooltip.scss';

const PLACE_BUTTON = 'place-bottom';

// TODO: add tooltip configuration ability
class TooltipHost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ReactTooltip: undefined };
  }
  async componentDidMount() {
    const ReactTooltip = await import('react-tooltip').then(ReactTooltip => ReactTooltip.default);
    this.setState({ ReactTooltip });
  }

  render() {
    const { theme } = this.props;
    const { ReactTooltip } = this.state;
    const mergedStyles = mergeStyles({ styles, theme });
    return ReactTooltip ? (
      <ReactTooltip
        className={mergedStyles.tooltip}
        effect={'solid'}
        delayShow={300}
        multiline
        overridePosition={({ left, top: originalTop }, currentEvent, currentTarget, node) => {
          const isBottomTooltip = node?.className && node.className.indexOf(PLACE_BUTTON) > -1;
          const top = originalTop - (isBottomTooltip ? 30 : 0);
          return { top, left };
        }}
      />
    ) : null;
  }
}

TooltipHost.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default TooltipHost;
