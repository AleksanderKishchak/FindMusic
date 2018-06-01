window.onload = function() {
	var searchBtn 	= document.getElementById('search-button');
	var btn = document.getElementsByClassName('panel__button')[0];
			
	searchBtn.onclick = toFind;
	window.onkeyup = function(e) {
		if (e.keyCode == 13) {
			toFind();
		}
	}
	function toFind() {
		var inputValue 	= document.getElementById('search-input').value;

		if(inputValue){
			document.getElementsByClassName('track-list')[0].innerHTML = '';
			inputValue = inputValue.trim().replace(/ /g, '+');
			getListSongs(inputValue, showElements);
		}
	}
}



//callback для AJAX запроса
function showElements(result) {
	result.forEach(function(item) {
		var trackList 		= document.getElementsByClassName('track-list')[0],
				panel 				= document.createElement('div'),
				trackDuration = new Date(item.trackTimeMillis);

				panel.classList.add('panel');
				

		panel.innerHTML = `<div class="panel__header">
					<img src="${item.artworkUrl100}" alt="Coolection image" class="panel__thumb">
					<div class="panel-info">
						<div class="panel-artist">${item.artistName}</div>
						<div class="panel-track">${item.trackName}</div>
						<div class="panel-collection">${item.collectionName}</div>
						<div class="panel-genre">${item.primaryGenreName}</div>
					</div>
					<button class="panel__button" type="button">
					</button>
				</div>
				<div class="panel__more-info">
					<div class="full-track-name">${item.artistName} - ${item.trackName}</div>

					<ul class="left-info">
						<li class="left-info__item collection"><span>Collection: </span> <output class="collection-output">${item.collectionName || 'not found'}</output></li>
						<li class="left-info__item track-count"><span>Track Count: </span> <output class="collection-output">${item.trackCount || 'not found'}</output></li>
						<li class="left-info__item price"><span>Price: </span> <output class="collection-output">${item.collectionPrice} ${item.currency}</output></li>
					</ul>

					<ul class="right-info">
						<li class="right-info__item track-duration"><span>Track duration: </span><output class="duration-output">${trackDuration.getMinutes()}:${(function(seconds){ if(seconds < 10) { return '0' + seconds } else {return seconds} })(trackDuration.getSeconds())} min</output></li>
						<li class="right-info__item track-price"><span>Track Price:</span> <output class="track-price-output">${item.trackPrice} ${item.currency}</output></li>
					</ul>
				</div>`;
		panel.querySelector('.panel__button').onclick = showMoreInfo;
		trackList.appendChild(panel);
	});
}

function showMoreInfo() {
	if(document.getElementsByClassName('visible')[0] && document.getElementsByClassName('visible')[0].parentNode != this.parentNode.parentNode) {
		document.getElementsByClassName('visible')[0].classList.remove('visible');
		document.getElementsByClassName('panel__button_active')[0].classList.remove('panel__button_active');
	}

	this.classList.toggle('panel__button_active');
	this.parentNode.parentNode.lastElementChild.classList.toggle('visible');
}


// AJAX request to itunes
function getListSongs(value, callback) {
	var request = new XMLHttpRequest();
	var answerRequest, songsArr;

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			answerRequest = request.responseText;
			songsArr = JSON.parse(answerRequest).results;
			callback(songsArr);
		}
	}

	request.open('GET', 'https://itunes.apple.com/search?term=' + value);
	request.send();
}