export const configs = {
  fileUpload: {
    accept: '*',
    handleFileSelection: updateEntity => {
      const filenames = ['image.jpg', 'document.pdf', 'music.mp3'];
      const multiple = false;
      const count = multiple ? [1, 2, 3] : [1];
      const data = [];
      count.forEach(() => {
        const name = filenames[Math.floor(Math.random() * filenames.length)];
        const filenameParts = name.split('.');
        const type = filenameParts[filenameParts.length - 1];
        data.push({
          name,
          type,
          url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
        });
      });
      setTimeout(() => updateEntity({ data }), 500);
    },
  },
  giphy: {
    giphySdkApiKey: process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
};
