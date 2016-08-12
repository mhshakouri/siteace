WebsitesIndex = new EasySearch.Index({
  collection: Websites,
  fields: ['url', 'title', 'description'],
  engine: new EasySearch.MongoDB()
});