
$(document).on('click', function() {
	var i, thinkDing, symbolInterval;
	
	i =0;
	thinkDing = '❂☭☮♕♞☸♗♠☹✪❉✂☾☂♆✸★✈♙☏♬☢☠☯♖✿';
	

	
	/*$('tr.symbols').find('td').each(function() {
	
		$(this).html(thinkDing[i]);
		i++; 

		if(i >= thinkDing.length) {
			i = 0; 
		}
	});
	*/
	
	// Returns a random integer between min and max
	// Using Math.round() will give you a non-uniform distribution!
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function changeRandomSymbol() {
		var randomSymbol, randomSpot; 
		randomSymbol = getRandomInt(0, 25);
		randomSpot = getRandomInt(0, 99); 		

		$('tr.symbols').find('td').eq(randomSpot).html(thinkDing[randomSymbol]);

	}

	symbolInterval = setInterval(function() { 
		var i, changesAtOnce;
		changesAtOnce = 10; 

		for(i = 0; i<changesAtOnce; i++){
			changeRandomSymbol(); 
		}

	}, 50);

});
	