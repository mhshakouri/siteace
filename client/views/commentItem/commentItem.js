Template.commentItem.helpers({
	creatorName:function(){
		return Meteor.users.findOne({_id: this.createdBy}).username;
	}
})