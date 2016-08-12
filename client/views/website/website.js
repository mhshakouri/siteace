Template.website_item.helpers({
	upvotescount:function(){
		return Websites.findOne({_id:this._id}).upvotes;
	},
	downvotescount:function(){
		return Websites.findOne({_id:this._id}).downvotes;
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
		if (Comments.find({siteId:this._id}).count()<1){
			return 'No comments';
		} else if (Comments.find({siteId:this._id}).count()==1) {
			return '1 comment';
		} else {
			return Comments.find({siteId:this._id}).count()+' comments';
		}
	},
	creatorName:function(){
		if (this.createdBy == 'admin'){
			return this.createdBy;
		} else {
			return Meteor.users.findOne({_id: this.createdBy}).username;
		}
	}
});
	Template.website_item.events({
		"click .js-upvote":function(event){
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
					var nouserupvote = '<div class="modal fade js-nouserupvote'+this._id+'" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="alert alert-warning" role="alert"><p>You must login to upvote a web site!</p></div></div></div><!-- /.modal-content--></div><!-- /.modal-dialog --></div><!-- /.modal -->';
					$('body').append(nouserupvote);
					$('.js-nouserupvote'+this._id).modal('show');
			}
		}, 
		"click .js-downvote":function(event){		
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
					var nouserdownvote = '<div class="modal fade js-nouserdownvote'+this._id+'" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="alert alert-warning" role="alert"><p>You must login to downvote a web site!</p></div></div></div><!-- /.modal-content--></div><!-- /.modal-dialog --></div><!-- /.modal -->';
					$('body').append(nouserdownvote);
					$('.js-nouserdownvote'+this._id).modal('show');
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
		}
	});