Template.websiteDetails.helpers({
	upvotescount:function(){
		return this.upvotes;
	},
	downvotescount:function(){
		return this.downvotes;
	},
	createdDate:function(){
		var dateobj = new Date(Websites.findOne({_id:this._id}).createdOn);
		var options = {
			weekday: "long", year: "numeric", month: "short",
			day: "numeric", hour: "2-digit", minute: "2-digit"
		};
		dateobj = dateobj.toLocaleTimeString("en-us", options);
		return dateobj;
	},
	rembut:function(){
		if (Meteor.user()){
			var curuserIds = Meteor.user()._id;
			var website = Websites.findOne(this._id);
			var creator = website.createdBy;
			if (curuserIds == creator){
				return true;
			}
		}
	},
	commentsCount:function(){
		return Comments.find({siteId:this._id}).count();
	},
	havcomments:function(){
		Session.set(this._id, 4);
		if (Comments.find({siteId:this._id}).count() > 0){
			return true;
		} else {
			return false;
		}
	}
	/*,
	creatorname:function(){
		var usernameobj = Meteor.users.findOne({_id:this._createdBy}).username;
		return usernameobj[0];
	}*/
	/*,
	thumbfile:function(){
		thumbObj = Websites.findOne({_id:this._id}).thumb;
		return new FS.File(thumbObj).url({store:"images"});
	}
	
	
	<a href="{{url}}" class="sitethumb">
		<!--<img src="{{thumbfile}}" class="img-responsive" alt="{{title}} thumbnail"/>-->
	</a>
	*/
});
	Template.websiteDetails.events({
		"click .js-upvote":function(event){
			console.log(Websites.findOne(this._id).createdBy);
			console.log(Meteor.user()._id);
			if (Meteor.user()){
				var curuserId = Meteor.user()._id;
				var website = Websites.findOne(this._id);
				var indownvoters = website.downvoters.indexOf(curuserId);
				var inupvoters = website.upvoters.indexOf(curuserId);
				if (indownvoters > -1) {
					Websites.update({_id:this._id},{$pull:{downvoters:curuserId},$inc:{downvotes:-1}});
				}
				if (inupvoters > -1) {
					Websites.update({_id:this._id},{$pull:{upvoters:curuserId},$inc:{upvotes:-1}});
				}
				if (inupvoters < 0) {
					Websites.update({_id:this._id},{$addToSet:{upvoters:curuserId},$inc:{upvotes:1}});
				}
			} else {
				alert("You must login to upvote this item!");
			}
		}, 
		"click .js-downvote":function(event){
				// this._id "This is the website id" -- this works
				// this.userId "This is the this.userId id" -- seems it doesn't work
				// Meteor.userId() "This is the Meteor.userId() id" -- this works
				// Meteor.user()._id "This is the Meteor.user()._id id" -- this works		
			if (Meteor.user()){
				var curuserId = Meteor.user()._id;
				var website = Websites.findOne(this._id);
				var indownvoters = website.downvoters.indexOf(curuserId);
				var inupvoters = website.upvoters.indexOf(curuserId);
				if (inupvoters > -1) {
					Websites.update({_id:this._id},{$pull:{upvoters:curuserId},$inc:{upvotes:-1}});
				}
				if (indownvoters > -1) {
					Websites.update({_id:this._id},{$pull:{downvoters:curuserId},$inc:{downvotes:-1}});
				}
				if (indownvoters < 0) {
					Websites.update({_id:this._id},{$addToSet:{downvoters:curuserId},$inc:{downvotes:1}});
				}
			} else {
				alert("You must login to downvote this item!");
			}
		}, 
		"click .js-remove":function(event){
			if (Meteor.user()){
				var curuserId = Meteor.user()._id;
				var website = Websites.findOne(this._id);
				var creator = website.createdBy;
				if (curuserId == creator){
					var remmodal = '<div class="modal fade js-confirmremmodal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="alert alert-warning" role="alert"><p>Are you sure you want to remove this site from database?</p></div></div><div class="modal-footer"><button type="button" class="btn btn-danger js-remconfirm" data-dismiss="modal">Yes, remove it.</button><button type="button" class="btn btn-default js-remconfmodalhide">No, let it be on the list.</button></div></div><!-- /.modal-content--></div><!-- /.modal-dialog --></div><!-- /.modal -->';
					$('body').append(remmodal);
					$('.js-confirmremmodal').modal('show');
					$('.js-remconfirm').click(function(){
						Websites.remove(website._id);
						$('.js-confirmremmodal').modal('hide');
					});
					$('.js-remconfmodalhide').click(function(){
						$('.js-confirmremmodal').modal('hide');
					});
				}
				else {
					alert('You cannot delete a site you did not submit.');
				}
			return false;
			}
		},
		'click .js-show-more-comments':function(event){
			Session.set(this._id, Session.get(this._id) + 4)
			if (Session.get(this._id) >= Comments.find({siteId:this._id}).count()) {
				$('.commentsbuttons').children().each(function(){
					$(this).hide('fast');
				});
				$('.commentsbuttons').append("<small> Showing all comments</small>");
			}
		},
		'click .js-show-all-comments':function(event){
			Session.set(this._id, Comments.find({siteId:this._id}).count());
				$('.commentsbuttons').children().each(function(){
					$(this).hide('fast');
				});
				$('.commentsbuttons').append("<small> Showing all comments</small>",{animae:'slow'});				
		},
		'submit .js-post-comment':function(event){
			event.preventDefault();
			var commentBody = event.target.commentBody.value;
			if (commentBody && commentBody != '' && commentBody != null) {
				
				if (Meteor.user()){
					Comments.insert({
						siteId: this._id, 
						commentBody: commentBody, 
						createdBy: Meteor.user()._id, 
						createdOn: new Date(),
						downvotes:0,
						downvoters:[],
						upvotes:0,
						upvoters:[],
						});
				}
			}
		}
	});