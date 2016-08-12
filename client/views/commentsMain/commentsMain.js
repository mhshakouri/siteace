Template.commentsMain.helpers({
	sitecomments:function(){
		return Comments.find({siteId:this._id}, {sort: {createdOn: -1}, limit:Session.get(this._id)});
	}
});