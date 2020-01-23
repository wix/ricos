//This is for testing purposes only.
export const debugBiLoggers = {
	onPluginAdd: async (plugin_id, entry_point, version) => console.log('biPluginAdd', plugin_id, entry_point, version),
	onPluginDelete: async (plugin_id, version) => console.log('biPluginDelete', plugin_id, version),
	onPluginChange: async (plugin_id, changeObj, version) => console.log('biPluginChange', plugin_id, changeObj, version),
	onPublish: async (postid, callback, version) => console.log('biOnPublish', ({ data }) => data, version),
};
