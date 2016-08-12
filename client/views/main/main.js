
  Session.set("commentLimit", 4);
// Session.set("imageLimit", Session.get("imageLimit") + 4);

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

Template.body.helpers({isLoggedin:function(){
  if (Meteor.user()){
    return true;
    //return Meteor.user().emails[0].address;
  }
  else {
    return false;
  }
 }
});