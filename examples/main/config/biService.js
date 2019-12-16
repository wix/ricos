//import webBiLogger from '@wix/web-bi-logger';
//import initSchemaLogger from '@wix/bi-logger-rich-editor'; //We need to create this one

const webBiLogger = ''; //DUMMY, needs to be removed
const initSchemaLogger = () => () => true; //DUMMY, needs to be removed

const logger = initSchemaLogger(webBiLogger)();

export const biLog = (funcName, params) => {
	if (logger[funcName] && typeof logger[funcName] === 'function') {
		logger[funcName](params);
	} else {
		console.error(`[biService.js:biLog] ${funcName} does not exists`);
	}
};

export const biLogSafe = callback => {
	if (callback && typeof callback === 'function') {
		try {
			callback(biLog, logger);
		} catch (error) {
			console.error(`[biService.js:biLogSafe] error`, error.message);
		}
	} else {
		console.error(`[biService.js:biLogSafe] callback is not a function`);
	}
};

//Comments in this file should be removed before merge.
//This is for testing purposes only.
export const debugBiLoggers = () => {
	return {
		onPluginAdd: (plugin_id, entry_point) => console.log('biPluginAdd', plugin_id, entry_point),
		onPluginDelete: (plugin_id) => console.log('biPluginDelete', plugin_id),
		onPluginChange: (plugin_id, changeObj) => console.log('biPluginChange', plugin_id, changeObj),
		onPublish: (postid, callback) => console.log('biOnPublish', ({ data }) => data),
	};
}

//This will be the final BI handler.
//TODO: Change event names according to their future creationg
//TODO: Decide params & change them here accordingly
export const biLoggers = () => {
	return {
		onPluginAdd: (plugin_id, entry_point) => {
			biLogSafe(biLog => {
				biLog("addPlugin", { plugin_id, entry_point });
			})
		},
		onPluginDelete: (plugin_id) => {
			biLogSafe(biLog => {
				biLog("deletePlugin", { plugin_id });
			})
		},
		onPluginChange: (plugin_id, { from, to }) => {
			biLogSafe(biLog => {
				biLog("changePlugin", { plugin_id, value: { from, to } });
			})
		},
		onPublish: (text) => {
			biLogSafe(biLog => {
				biLog("publishPost", { text });
			})
		},
	}
}
