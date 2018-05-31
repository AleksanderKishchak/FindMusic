window.onload = function() {
	var searchBtn 	= document.getElementById('search-button');
	var btn = document.getElementsByClassName('panel__button')[0];
			
	searchBtn.onclick = function() {
		var inputValue 	= document.getElementById('search-input').value;

		inputValue = inputValue.trim().replace(' ', '+');

		getListSongs(inputValue, showElements);
	}
}



//callback для AJAX запроса
function showElements(result) {
	result.forEach(function(item) {
		var trackList = document.getElementsByClassName('track-list')[0],
				panel = document.createElement('div');
				panel.classList.add('panel');

		panel.innerHTML = `<div class="panel__header">
					<img src="${item.artworkUrl100}" alt="Coolection image" class="panel__thumb">
					<div class="panel-info">
						<div class="panel-artist">${item.artistName}</div>
						<!-- /.panel-artist -->
						<div class="panel-track">${item.trackName}</div>
						<!-- /.panel-track -->
						<div class="panel-collection">${item.collectionName}</div>
						<!-- /.panel-collection -->
						<div class="panel-genre">${item.primaryGenreName}</div>
						<!-- /.panel-genre -->
					</div>
					<!-- /.panel-info -->
					<button class="panel__button" type="button">
						<!-- <img src="img/add.svg" alt="more info"> -->
					</button>
				</div>
				<!-- /.panel__header -->
				<div class="panel__more-info">
					<div class="full-track-name">${item.artistName} - ${item.trackName}</div>

					<ul class="left-info">
						<li class="left-info__item collection"><span>Collection: </span> <output class="collection-output">${item.collectionName}</output></li>
						<li class="left-info__item track-count"><span>Track Count: </span> <output class="collection-output">${item.trackCount}</output></li>
						<li class="left-info__item price"><span>Price: </span> <output class="collection-output">${item.collectionPrice} ${item.currency}</output></li>
					</ul>

					<ul class="right-info">
						<li class="right-info__item track-duration"><span>Track duration: </span><output class="duration-output">${item.trackTimeMillis} min</output></li>
						<li class="right-info__item track-price"><span>Track Price:</span> <output class="track-price-output">${item.trackPrice} ${item.currency}</output></li>
					</ul>
				</div>`;
		setEvents(panel);
		trackList.appendChild(panel);
	});
}

function setEvents(elem) {
	elem.getElementsByClassName('panel__button')[0].onclick = showMoreInfo;
}

function showMoreInfo() {
	var panels = document.querySelectorAll('.panel');
	for (let i = 0; i < panels.length; i++) {
		panels.indexOf(this.parentNode.parentNode);
		panels[i].lastElementChild.classList.remove('visible');
		panels[i].firstElementChild.lastElementChild.classList.remove('panel__button_active');
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
			console.log(songsArr);
			callback(songsArr);
		}
	}

	request.open('GET', 'https://itunes.apple.com/search?term=' + value);
	request.send();
}