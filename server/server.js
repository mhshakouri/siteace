Websites.allow({
	insert:function(userId, doc){
		if (Meteor.user()){
			return true;
		}
		else {
			return false;
		}
	},
	remove:function(userId, doc){
		if (Meteor.user()){
			return true;
		}
		else {
			return false;
		}
	},
	update:function(userId, doc){
		if (Meteor.user()){
			return true;
		}
		else {
			return false;
		}
	}
});
Comments.allow({
	insert:function(userId, doc){
		if (Meteor.user()){
			return true;
		}
		else {
			return false;
		}
	},
	remove:function(userId, doc){
		if (Meteor.user()){
			return true;
		}
		else {
			return false;
		}
	}
});
/*
myAwesomeFunction = function (myArgument) {
	var thumburl =myArgument; 
	var encodedurl = escape(thumburl).replace("/", "%2F").replace("+", "%2B");
	var md5url = MD5(thumburl+"kimkim");
	var address = "http://api.screenshotlayer.com/api/capture?access_key=3a1ffce8903918846bd4add6dbff7488&url="+encodedurl+"&secret_key="+md5url+"&placeholder=1&fullpage=1&width=350&format=jpg";
	return Images.insert(address, function (err, fileObj) {
	});
}
*/
/*
Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  },
  'update':function(){
   return true;
  },
  'remove':function(){
    return true;
  },
  'download':function(){
    return true;
  }
});
*/