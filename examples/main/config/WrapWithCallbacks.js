import React, { Children } from 'react';
import PropTypes from 'prop-types';

export default class WrapWithCallbacks extends React.Component {

	render() {
		const { onPluginAdd, onPluginChange, onPluginDelete, children } = this.props;
		const { props: { helpers = {} } = {} } = children;
		helpers.activityCallbacks = {
			onPluginAdd,
			onPluginChange,
			onPluginDelete,
		}
		return Children.only(React.cloneElement(children, { helpers }));
	}
}

WrapWithCallbacks.propTypes = {
	onAdd: PropTypes.func,
	onChange: PropTypes.func,
	onDelete: PropTypes.func,
}
