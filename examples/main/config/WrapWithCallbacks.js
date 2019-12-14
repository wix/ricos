import React, { Children } from 'react';
import PropTypes from 'prop-types';

export default class WrapWithCallbacks extends React.Component {

	editor = ({ children, ...rest }) => {
		return Children.only(React.cloneElement(children, { ...rest }));
	};

	render() {
		const { container, onPluginAdd, onPluginChange, onPluginDelete, ...rest } = this.props;
		const { helpers = {} } = rest;
		const Editor = this.editor;
		helpers.activityCallbacks = {
			onPluginAdd,
			onPluginChange,
			onPluginDelete,
		}
		return <Editor {...rest} helpers={helpers} />
	}
}

WrapWithCallbacks.propTypes = {
	container: PropTypes.string,
	onAdd: PropTypes.func,
	onChange: PropTypes.func,
	onDelete: PropTypes.func,
}
