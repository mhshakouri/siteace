Router.configure({
  layoutTemplate: 'ApplicationLayout',
  template: 'website_list'
});
Router.route('/',function(){
	this.render('mynavbar', {to:'navigation'});
	this.render('website_list', {to:'main'});
	document.title = "Home | SiteRate";
	$('.siteratenav li.active').removeClass('active');
	$('.siteratenav li#home').addClass('active');
});
Router.route('/addsite',function(){
	this.render('mynavbar', {to:'navigation'});
	this.render('website_form', {to:'main'});
	document.title = "Add a site | SiteRate";
	$('.siteratenav li.active').removeClass('active');
	$('.siteratenav li#addsite').addClass('active');
});
Router.route('/about',function(){
	this.render('mynavbar', {to:'navigation'});
	this.render('about', {to:'main'});
	document.title = "About | SiteRate";
	$('.siteratenav li.active').removeClass('active');
	$('.siteratenav li#about').addClass('active');
});

Router.route('/websites/:_id', function () {
	this.render('mynavbar', {to:'navigation'});
	this.render('websiteDetails', {to:'main', data:function(){
		return Websites.findOne({_id:this.params._id});
	}});
	var tobesite = Websites.findOne({_id:this.params._id});
	document.title = tobesite.title+" | SiteRate";
	$('.siteratenav li.active').removeClass('active');
});