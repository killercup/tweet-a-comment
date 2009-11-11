/**
 * This is a jQuery Plugin to allow commenting on pages just via Twitter.
 * (C) 2009 Pascal Hertleif, FLabs.org
 */


;(function($) {

  // mark links as such (plain text -> html)
  String.prototype.linkify = function() {
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(m) {
    	return m.link(m);
	});
  };

  $.fn.tweetComments = function(shorturl, twittername) {
  	var thediv = $(this);
  	
  	// append link to tweet a comment yourself
  	$("<div/>").addClass("tweet-a-comment").html('<a href="http://twitter.com/?status='+encodeURIComponent("@"+twittername+" "+shorturl+" ")+'">Tweet a Comment!</a>').appendTo(thediv);	
  	
  	// display tweets.
  	$.getJSON("http://search.twitter.com/search.json?q="+encodeURIComponent(shorturl)+"&callback=?",
  		function(data) {
  			// append tweets.
  			$.each(data.results, function(i, item) {
  				$("<div/>").addClass("comment").html('<cite><a href="http://twitter.com/'+item.from_user+'">'+item.from_user+'</a>:</cite> <p>'+item.text.linkify()+'</p><p class="date">'+item.created_at+'</p>').appendTo(thediv);
  			});
  			
  			// relative dates. check relative_date.js!
  			$("#tweet-comments .date").relatizeDate();
  			
  			// if there are no tweets
  			if (data.results.length == 0) {
  				$("<div/>").addClass("no-comments").html('<p>There are no comments.</p>').appendTo(thediv);
  			}
  		});
  	
   };

})(jQuery);
// this is btw line forty-two. hope you all read hitchhiker's guide to the galaxy.
