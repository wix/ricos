const { groupBy } = require('lodash');
module.exports = function(Handlebars) {
  Handlebars.registerHelper('merge-list', function(context, options) {
    if (!context || context.length === 0) {
      return '';
    }

    const list = context.filter(merge => {
      if (options.hash.message) {
        const pattern = new RegExp(options.hash.message, 'm');
        if (!pattern.test(merge.message)) {
          return false;
        }
        merge.packages = `- ${merge.message.split(' ')[0]}`;
        merge.message = merge.message
          .split(' ')
          .slice(2)
          .join(' ');
        merge.id = `\t - [#${merge.id}]`;
        merge.href = `(${merge.href})`;
        return true;
      }
      return false;
    });

    if (!list || list.length === 0) {
      return '';
    }

    const merges = list.reduce((acc, item) => {
      acc.push([item.packages, item.id + item.href + ' ' + item.message]);
      return acc;
    }, []);

    const groupByPackages = groupBy(merges, item => {
      return item[0];
    });

    const result = Object.keys(groupByPackages)
      .reduce((acc, key) => {
        acc.push(key);
        Object.values(groupByPackages[key]).map(value => {
          return acc.push(value[1]);
        });
        return acc;
      }, [])
      .join('\n');

    return `${options.hash.heading}\n\n${result}`;
  });
};
