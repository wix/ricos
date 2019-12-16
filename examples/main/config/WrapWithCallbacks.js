import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { getPostContentSummary } from '../../../packages/editor-common/web/src/Utils/draftUtils';

export default class WrapWithCallbacks extends React.Component {

	render() {
		const { onPluginAdd, onPluginChange, onPluginDelete, children } = this.props;
		const { props: { helpers = {} } = {} } = children;
		helpers.activityCallbacks = {
			onPluginAdd: async (...args) => onPluginAdd(...args),
			onPluginChange: async (...args) => onPluginChange(...args),
			onPluginDelete: async (...args) => onPluginDelete(...args),
		}
		return Children.only(React.cloneElement(children, { helpers }));
	}
}

WrapWithCallbacks.publish = async (post_id, editorState = {}, callBack = data => true) => {
	const post_content = getPostContentSummary(editorState);
	callBack({ post_id, post_content });
}

WrapWithCallbacks.propTypes = {
	onAdd: PropTypes.func,
	onChange: PropTypes.func,
	onDelete: PropTypes.func,
}
