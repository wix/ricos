/* eslint-disable camelcase */
export const DEFAULTS = {
  config: {},
  configViewer: {
    resolveFileUrl: () =>
      new Promise(resolve =>
        setTimeout(
          () =>
            resolve('http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf'),
          1000
        )
      ),
    downloadTarget: '_blank',
  },
};

export const THEME = colors => {
  const { textColor, actionColor, bgColor } = colors;
  return {
    file_upload_name: {
      color: textColor,
    },
    file_upload_extension: {
      color: textColor,
    },
    file_upload_type: {
      color: textColor,
    },
    file_upload_icon: {
      color: actionColor,
      '& > g': {
        '& > g': {
          stroke: bgColor,
        },
        '& > path': {
          fill: bgColor,
        },
      },
    },
    file_upload_state: {
      color: textColor,
    },
    file_upload_container: {},
  };
};
