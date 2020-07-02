import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from './mergeStyles';
import styles from '../../statics/styles/tooltip.scss';

const PLACE_BUTTON = 'place-bottom';

// TODO: add tooltip configuration ability
class TooltipHost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ReactTooltip: false };
  }
  async componentDidMount() {
    const ReactTooltip = await lazy(() =>
      import('react-tooltip').then(ReactTooltip => ReactTooltip)
    );
    this.setState({ ReactTooltip });
  }
  render() {
    const { theme } = this.props;
    const { ReactTooltip } = this.state;
    const mergedStyles = mergeStyles({ styles, theme });
    return (
      ReactTooltip && (
        <Suspense fallback={<div />}>
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
        </Suspense>
      )
    );
  }
}

TooltipHost.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default TooltipHost;
