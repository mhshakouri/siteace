  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
          console.log("No websites yet. Creating starter data.");
            Websites.insert({
              title:"Goldsmiths Computing Department", 
              url:"http://www.gold.ac.uk/computing/", 
              description:"This is where this course was developed.",
              createdOn:new Date(),
              downvotes:0,
              downvoters:[],
              upvotes:0,
              upvoters:[],
              createdBy:'admin'
              //,
              //thumb: myAwesomeFunction("http://www.gold.ac.uk/computing/") 
            });
            Websites.insert({
              title:"University of London", 
              url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
              description:"University of London International Programme.", 
              createdOn:new Date(),
              downvotes:0,
              downvoters:[],
              upvotes:0,
              upvoters:[],
              createdBy:'admin'
              //,
              //thumb: myAwesomeFunction("http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route") 
            });
            Websites.insert({
              title:"Coursera", 
              url:"http://www.coursera.org", 
              description:"Universal access to the world’s best education.", 
              createdOn:new Date(),
              downvotes:0,
              downvoters:[],
              upvotes:0,
              upvoters:[],
              createdBy:'admin'
              //,
              //thumb: myAwesomeFunction("http://www.coursera.org") 
            });
            Websites.insert({
              title:"Google", 
              url:"http://www.google.com", 
              description:"Popular search engine.", 
              createdOn:new Date(),
              downvotes:0,
              downvoters:[],
              upvotes:0,
              upvoters:[],
              createdBy:'admin'
              //,
              //thumb: myAwesomeFunction("http://www.google.com") 
            });
            Websites.insert({
              title:"Yahoo", 
              url:"http://www.yahoo.com", 
              description:"Popular search engine.", 
              createdOn:new Date(),
              downvotes:0,
              downvoters:[],
              upvotes:0,
              upvoters:[],
              createdBy:'admin'
              //,
              //thumb: myAwesomeFunction("http://www.yahoo.com") 
            });
    }
  });