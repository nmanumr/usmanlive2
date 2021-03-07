const cheerio = require('cheerio');

const options = {
  tags: ['h1', 'h2', 'h3', 'h4'],
  ignoreAttribute: 'data-toc-exclude'
};

function toToc(el) {
  return {
    id: el.attr('id'),
    url: `#${el.attr('id')}`,
    name: el.text(),
    level: +el.get(0).tagName.slice(1),
    children: []
  }
}

function getHeadings(content) {
  const selectorExtra = `[id]:not([${options.ignoreAttribute}])`
  const selector = options.tags.join(selectorExtra + ',') + selectorExtra;
  this.toc = [];

  const $ = cheerio.load(content);
  return $(selector).toArray().map(i => toToc($(i)));
}

function nestToc(toc_list) {
  const ordered_list = []
  if (toc_list.length) {
    let last = toc_list.shift();
    let levels = [last['level']];
    let parents = [];
    ordered_list.push(last)

    while (toc_list.length) {
      const t = toc_list.shift();
      const current_level = t['level'];

      if (current_level < levels[levels.length - 1]) {
        levels.pop();
        let to_pop = 0;

        for (let p of parents.slice().reverse()) {
          if (current_level <= p['level']) {
            to_pop += 1
          } else {
            break;
          }
        }

        if (to_pop) {
          levels = levels.slice(0, -1 * to_pop);
          parents = parents.slice(0, -1 * to_pop);
        }

        levels.push(current_level);
      }

      if (current_level === levels[levels.length - 1]) {
        if (parents.length) {
          parents[parents.length - 1]['children'].push(t);
        } else {
          ordered_list.push(t);
        }
      } else {
        last['children'].push(t);
        parents.push(last);
        levels.push(current_level);
      }

      last = t;
    }
  }

  return ordered_list;
}

module.exports = (content) => {
  const headings = getHeadings(content);
  return nestToc(headings);
}
