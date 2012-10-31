/* (c) 2011, Valeriy Chevtaev, http://chupakabr.ru */

if (!ru) { var ru = {}; }
if (!ru.chupakabr) { ru.chupakabr = {}; }
if (!ru.chupakabr.kontaktMusic) { ru.chupakabr.kontaktMusic = {}; }

ru.chupakabr.kontaktMusic.run = function() {
	//alert('<0>');
	
	var audios = document.getElementById('audios');
	var audiosList = document.getElementById('audios_list');
	var profileAudios = document.getElementById('profile_audios');
	var bigResult = document.getElementById('bigResult');
	var results = document.getElementById('results');
	
	//alert('<1>');
	
	if (audios || audiosList || profileAudios || bigResult || results) {
		var root = null;
		
		//alert('<2>');
		
		if (audios) { root = audios; /*alert('<2 - audios>');*/ }
		else if (audiosList) { root = audiosList; /*alert('<2 - audiosList>');*/ }
		else if (profileAudios) { root = profileAudios; /*alert('<2 - profileAudios>');*/ }
		else if (bigResult) { root = bigResult; /*alert('<2 - bigResults>');*/}
		else if (results) { root = results; /*alert('<2 - results>');*/}
		
		if (root) {
			//alert('<3>');
			//alert('<length = ' + root.childNodes.length);
			for (var i = 0; i < root.childNodes.length; i++) {
				e = root.childNodes[i];
				ru.chupakabr.kontaktMusic.findAudio(e);
			}
		} else {
			alert('<2> На данной странице музыка не найдена');
		}
	} else {
		alert('<1> На данной странице музыка не найдена');
	}
	//alert('<99>');
};

ru.chupakabr.kontaktMusic.findAudio = function(node) {
	if (node.id && ru.chupakabr.kontaktMusic.startsWith(node.id, 'audio')) {
		// Audio element
		// Parse node.innerHTML == onclick="return operate(50905199,1666,8824882,'4948fda18a16',190);"
		var dwnlLink = '';
		var matches = node.innerHTML.match(/operate\((\d+),(\d+),(\d+),'([\d\w]+)',(\d+)\);/);
		if (matches && matches.length > 0) {
			//alert('matched');
			dwnlLink = 'http://cs'+matches[2]+'.vkontakte.'+'ru/u'+matches[3]+'/audio/'+matches[4]+'.mp3';
			//alert('link ' + dwnLink);
		} else {
			// Try another version of match
			// Parse node.innerHTML == onclick="return operate[Wall](50905199,'http://someurl.to.mp3',190);"
			matches = node.innerHTML.match(/operate\w*\((\d+),'([^\']+)',(\d+)\);/);
			if (matches && matches.length > 0) {
				//alert('link=' + matches[1] + ":" + matches[2] + ":" + matches[3]);
				dwnlLink = matches[2];
			} else {
				// Try 3 version of match
				// <div id="audio8824882_50905199" class="audio">
				// <input type="hidden" id="audio_info8824882_50905199" value="http://cs1666.vkontakte.ru/u8824882/audio/571ff3bf41d0.mp3,190" />
				var nodeId = node.getAttribute('id');
				matches = nodeId.match(/audio(.*)/);
				if (matches && matches.length > 0) {
					var audioId = matches[1];
					var audioHiddenInput = document.getElementById('audio_info' + audioId);
					if (audioHiddenInput) {
						var hiddenValue = audioHiddenInput.getAttribute('value');
						matches = hiddenValue.match(/([^\,]+)/);
						if (matches && matches.length > 0) {
							dwnlLink = matches[1];
						}
					}
				}
				//alert('not matched ' + node.innerHTML);
			}
		}
		
		// Insert download link
		node.innerHTML = '<a href="' + dwnlLink + '">Скачать</a>' + node.innerHTML;
	} else if (node.childNodes.length > 0) {
		for (var j = 0; j < node.childNodes.length; j++) {
			e = node.childNodes[j];
			ru.chupakabr.kontaktMusic.findAudio(e);
		}
	}
};

ru.chupakabr.kontaktMusic.startsWith = function(s1,s2) {
	return (s1.match("^"+s2)==s2);
};

ru.chupakabr.kontaktMusic.run();
