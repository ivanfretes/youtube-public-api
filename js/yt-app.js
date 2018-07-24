

const API_KEY = 'API_KEY'; 
const PLAYLIST_ID = 'RDEMLUGe1lzhB7MnQLLEheFTww';
const PART = 'contentDetails,snippet';
const MAX_RESULTS = 10;


$(document).ready(function(){
	
	function getPlayListItem(){
		$.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=${PART}&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=${MAX_RESULTS}`, 
			  null, function(data, status){

			let items = data.items;
			items.forEach(function(element){
				//console.log(element);
				let snippet = element.snippet;
				let thumbnails = snippet.thumbnails;
				$('#yt-playlist-item').append(`<li class="yt-video-image" data-video="${element.contentDetails.videoId}">
					<img src="${thumbnails.medium.url}">
				</li>`);
				// <!--span>${snippet.title}</span!-->
			})
			//$('#playlist-yt ul').innerHTML
		});
	}
	
	
	// Select a video
	$('body').delegate('li.yt-video-image', 'click', function(){
		console.log($(this).attr('data-video'));
		let videoId = $(this).attr('data-video');
		
		$('#yt-video-selected').removeClass('yt-video-hidden');
		$('#yt-video-selected').html(`
			<iframe width="854" height="480" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
		`);
		
	});
	
	// Autoloading FNs
	(function(){
		getPlayListItem();
	})();

});