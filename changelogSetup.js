// const { groupBy } = require('lodash');
module.exports = function(Handlebars) {
  Handlebars.registerHelper('merge-list', function(context, options) {
    if (!context || context.length === 0) {
      return '';
    }

    const list = context
      .filter(merge => {
        if (options.hash.message) {
          const pattern = new RegExp(options.hash.message, 'm');
          if (!pattern.test(merge.message)) {
            return false;
          }
          merge.packages = merge.message.split(' ')[0];
          merge.message = merge.message
            .split(' ')
            .slice(2)
            .join(' ');
          merge.id = `\t -[#${merge.id}]`;
          return true;
        }
        return false;
      })
      .map(item => options.fn(item))
      .join('');

    if (!list) {
      return '';
    }

    // if (!filtered_merges || filtered_merges.length === 0) {
    //   return '';
    // }
    // if (filtered_merges[0]) filtered_merges.push(filtered_merges[0]); //for example

    // const res = groupBy(filtered_merges, item => {
    //   return item.packages;
    // });

    return `${options.hash.heading}\n\n${list}`;
  });
};
