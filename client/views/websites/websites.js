Template.website_list.helpers({
	websites:function(){
		return Websites.find({}, {sort: {upvotes: -1,createdOn: -1}});
	} 
});
/*
Template.website_list.events({
		'click .js-reset-search-filter':function(event){
			Session.set("searchValue", false);
			$("#js-search").val(null);
			return false;
		},
		"keypress #js-search":function(event){
			if (event.which === 13) {
				searchQuerytoput = event.currentTarget.value;
				Session.set("searchValue", searchQuerytoput);
				return false;
			}
		}
	})
	
	
	<nav class="navbar navbar-default">
		<div class="container">
			<ul class="nav navbar-nav navbar-right">
				<form class="navbar-form navbar-right " role="search">
					<div class="form-group">
						{{#if resetbutton}}
							Results are being sorted by keyword: <strong>{{searchedtext}}</strong> - 
							<button class='js-reset-search-filter btn btn-warning' >Remove search filter</button>
						{{/if}}
					   	<input id="js-search" type="text" class="form-control js-search" placeholder="Search">
	             	</div>
    		    </form>
    		</ul>
		</div>
	</nav>
	*/