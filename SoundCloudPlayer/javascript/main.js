/*1. create the search */

var UI = {};


UI.handleEnterPress = function() {
	document.querySelector(".js-search").addEventListener('keypress', function( e ) {
		if ( e.which === 13 ) {
			var inputValue = e.target.value;
			// onValueRead( inputValue );
			//console.log(inputValue);
			SoundClassAPI.getTracks(inputValue);
			
		}
	});
}

UI.handleSubmitClick = function() {
	document.querySelector(".js-submit").addEventListener('click', function( e ) {
		var inputValue = document.querySelector(".js-search").value;
		//onValueRead( inputValue );
		//console.log(inputValue);
		SoundClassAPI.getTracks(inputValue);
	});
} 

// // set up the search
UI.handleEnterPress();
UI.handleSubmitClick();

/*2. get the data from soundCLoud API */

var SoundClassAPI={};

SoundClassAPI.init = function(){

	SC.initialize({
  		client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});
}

SoundClassAPI.init();

SoundClassAPI.getTracks = function(inputValue){
	// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) {
	  console.log(tracks);
	  SoundClassAPI.renderTracks(tracks);
	});
}
// SoundClassAPI.getTracks("Rilo Kiley");

SoundClassAPI.renderTracks= function(tracks){


	tracks.forEach(function(track){


		//card
		var card = document.createElement('div');
		card.classList.add('card');

		//image
		var imageDiv = document.createElement('div');
		card.classList.add('image');

		var image_img = document.createElement('img');
		image_img.classList.add('image_img');
		image_img.src = track.artwork_url || 'http://lorempixel.com/100/100';

		imageDiv.appendChild(image_img);

		//content
		var content = document.createElement('div');
		content.classList.add('content');

		var header = document.createElement('div');
		header.classList.add('header');
		header.innerHTML = '<a href="'+ track.permalink_url +'" target="_blank">'+ track.title +'</a>';

		//button
		var button = document.createElement('div');
		button.classList.add('ui', 'button', 'attached', 'button', 'js-button');

		var icon = document.createElement('i');
		icon.classList.add('add', 'icon');

		var buttonText = document.createElement('span');
		button.classList.innerHTML = 'Add to playlist';

		//appendChild
		content.appendChild(header);

		button.appendChild(icon);
		button.appendChild(buttonText);
		button.addEventListener('click', function(){
			SoundClassAPI.getEmbed(track.permalink_url);
		});

		card.appendChild(imageDiv);
		card.appendChild(content);
		card.appendChild(button);



		var searchResults = document.querySelector(".js-search-results");
		searchResults.appendChild(card);


	});


}




/*3. Display the cards after search */
/*4. add it to the playlist and start playing. */

SoundClassAPI.getEmbed = function(trackURL){
	SC.oEmbed(trackURL, {
	auto_play: true
	}).then(function(embed){
	 console.log('oEmbed response: ', embed);

	  var sideBar = document.querySelector('.js-playlist');

	  var box = document.createElement('div');
	  box.innerHTML = embed.html;

	  sideBar.insertBefore(box, sideBar.firstChild);
	  localStorage.setItem("key", sideBar.innerHTML);

	});
}

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");
