/**
 * This is a jQuery Plugin to allow commenting on pages just via Twitter.
 * (C) 2009 Pascal Hertleif, FLabs.org
 */


;(function($) {

  /*function bitly(url, login, apikey) {
  	return $.getJSON(
  		"http://api.bit.ly/shorten?"
	  		+"version=2.0.1"
		    +"&longUrl="+encodeURIComponent(url)
		    +"&login="+login
		    +"&apiKey="+apikey
		    +"&format=json&callback=?",
  		function(data) {
  			return data.results.url.shortUrl;
  		});
  };*/

  $.fn.tweetComments = function(shorturl, twittername) {
  	var thediv = $(this);
  	
  	// append link to tweet a comment yourself
  	$("<div/>").addClass("tweet-a-comment").html('<a href="http://twitter.com/?status='+encodeURIComponent("@"+twittername+" "+shorturl+" ")+'">Tweet a Comment!</a>').appendTo(thediv);	
  	
  	// display tweets.
  	$.getJSON("http://search.twitter.com/search.json?q="+encodeURIComponent(shorturl)+"&callback=?",
  		function(data) {
  			$.each(data.results, function(i, item) {
  				$("<div/>").addClass("comment").html('<cite><a href="http://twitter.com/'+item.from_user+'">'+item.from_user+'</a>:</cite> <p>'+item.text+'</p>').appendTo(thediv);
  			});
  			if (data.results.length == 0) {
  				$("<div/>").addClass("no-comments").html('<p>There are no comments.</p>').appendTo(thediv);
  			}
  		});
  	
   };

})(jQuery);
//bitly("http://flabs.org", "killercup", "R_e4afa7689ea94c99ce8bdd0b9871be21")