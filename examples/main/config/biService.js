//This is for testing purposes only.
export const debugBiLoggers = () => {
	return {
		onPluginAdd: (plugin_id, entry_point) => console.log('biPluginAdd', plugin_id, entry_point),
		onPluginDelete: (plugin_id) => console.log('biPluginDelete', plugin_id),
		onPluginChange: (plugin_id, changeObj) => console.log('biPluginChange', plugin_id, changeObj),
		onPublish: (postid, callback) => console.log('biOnPublish', ({ data }) => data),
	};
}