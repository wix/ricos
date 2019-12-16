import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { getEntities } from '../../../packages/editor/web/src/lib/editorStateConversion';

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

WrapWithCallbacks.publish = async (post_id, editorState = {}, callBack = data => true) => {
	if (Object.entries(editorState).length === 0)
		return;
	const blocks = editorState.getCurrentContent().getBlocksAsArray();
	const entries = getEntities(editorState);
	const count = arr => arr.reduce((countArray, curr) => {
		return {
			...countArray,
			[curr]: !countArray[curr] ? 1 : countArray[curr] + 1,
		};
	}, {});
	const blockPlugins = blocks.filter(block => block.type !== 'unstyled' && block.type !== 'atomic').map(block => block.type);
	const entityPlugins = entries.map(entry => entry.entity.type);
	const post_content = {
		...count(blockPlugins), ...(count(entityPlugins))
	};
	callBack({ post_id, post_content });
}

WrapWithCallbacks.propTypes = {
	onAdd: PropTypes.func,
	onChange: PropTypes.func,
	onDelete: PropTypes.func,
}
