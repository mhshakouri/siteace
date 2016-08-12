// On Client
Tracker.autorun(function () {
  let cursor = WebsitesIndex.search('search'); // search all docs that contain "Marie" in the name or score field

  console.log(cursor.fetch()); // log found documents with default search limit
  console.log(cursor.count()); // log count of all found documents
});