
/*Meteor.subscribe("Websites");
Meteor.subscribe("Upvotes");
Meteor.subscribe("Downvotes");
Session.set("sitestLimit", 8);
lastScrollTop = 0;
$(window).scroll(function(event){
// test if we are near the bottom of the window
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  // where are we in the page? 
    var scrollTop = $(this).scrollTop();
    // test if we are going down
    if (scrollTop > lastScrollTop){
    // yes we are heading down...
      Session.set("sitestLimit", Session.get("sitestLimit") + 4);
    }
    lastScrollTop = scrollTop;
  }  
})
Template.website_list.helpers({
  websites: function() {
    Meteor.subscribe("search", Session.get("searchValue"));
    if (Session.get("searchValue")) {
        return Websites.find({}, { sort: [["score", "desc"]]});
    } else {
      return Websites.find({},{sort:{upvotes:-1,createdOn: -1}, limit:Session.get("sitestLimit")});
    }
  },
    resetbutton:function(){
      if (Session.get("searchValue")) {
        if (Session.get('searchValue') != false) {
          return true;
        } else {
          return false;
        }
      }
      else {
        return false;
      }
    },
    searchedtext:function(){
      if (Session.get("searchValue")){
        if (Session.get('searchValue') != false) {
          return Session.get("searchValue");
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    }
});
*/