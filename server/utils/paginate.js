const paginate = (query, collection, PAGE_SIZE = 12) => {
  let newCollection = collection;

  if (!!query.page) {
    let page = parseInt(query.page);
    const pagesize = parseInt(query.pagesize) || PAGE_SIZE;

    if (page < 1) page = 1;

    newCollection = newCollection.slice(page * pagesize - pagesize, page * pagesize);
  }

  return newCollection;
};

module.exports = paginate;