Template.website_form.helpers({isLoggedin:function(){
  if (Meteor.user()){
    return true;
  }
  else {
    return false;
  }
 }
});
	Template.website_form.events({
		"submit #js-save-website-form":function(event){
			var url = event.target.url.value;
      url = url.toUpperCase();
      var prefix = 'HTTP://';
      if (url.substr(0, prefix.length) !== prefix)
      {
          url = prefix + url;
      }
      url = url.toLowerCase();
			var title = event.target.title.value;
			var description = event.target.description.value;
      var curuserId = Meteor.user()._id;
        $(".js-siteurl").hide();
        $(".js-sitetitle").hide();
        $(".js-description").hide();
      if(!event.target.url.value){
        $(".js-message").html("Oops! You forgot to mention a <strong>site URL</strong>! <br/> Type your desired <strong>site URL</strong> to submit.");
        $(".addsitemodal .alert").addClass('alert-warning');
        $(".addsitemodal").modal('show');
        return false;
      } else if(!title){
        $(".js-message").html("Oops! You forgot to mention a <strong>title</strong> for <strong>"+url+"</strong>! <br/> Type your desired <strong>site title</strong> to submit.");
        $(".addsitemodal .alert").addClass('alert-warning');
        $(".addsitemodal").modal('show');
        return false;
      } else if(!description){
        $(".js-message").html("Oops! You forgot to mention a <strong>description</strong> for <strong>"+title+" ("+url+")</strong>! <br/> Type your desired <strong>site description</strong> to submit.");
        $(".addsitemodal .alert").addClass('alert-warning');
        $(".addsitemodal").modal('show');
        return false;
      } else {
        Websites.insert({
          title: title, 
          url: url, 
          description: description, 
          createdOn: new Date(),
          downvotes:0,
          downvoters:[],
          upvotes:0,
          upvoters:[],
          createdBy:curuserId
        });
        document.getElementById("js-save-website-form").reset();
        $(".js-siteurl").show();
        $(".js-sitetitle").show();
        $(".js-description").show();
        $(".js-siteurl").html("<strong>"+url+"</strong><br/>");
        $(".js-sitetitle").html("<strong>"+title+"</strong><br/>");
        $(".js-description").html("<strong>"+description+"</strong><br/>");
        $(".js-message").html('Item successfully <strong>added</strong> to database');
        if ($(".addsitemodal .alert").hasClass('alert-warning')){
          $(".addsitemodal .alert").removeClass('alert-warning');
          $(".addsitemodal .alert").addClass('alert-success');
        }
        $(".addsitemodal").modal('show');
        return false;
      }
		}
	});