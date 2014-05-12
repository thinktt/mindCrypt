

$(document).ready(function() {
	$('tr.numbers').hide('slow', function() {
		console.log('done'); 
	}); 
});


$(document).on('click', function() {
	var i, thinkDing, symbolInterval, chartGoal, randomSymbol;
	
	i =0;
	thinkDing = '❂☭☮♕♞☸♗♠☹✪❉✂☾☂♆✸★✈♙☏♬☢☠☯♖✿';
	
		
	
	// Returns a random integer between min and max
	// Using Math.round() will give you a non-uniform distribution!
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function changeRandomSymbol() {
		var randomSymbol, randomSpot, currentSymbol; 

		//find a random symbol and a random location to place it
		randomSymbol = thinkDing[getRandomInt(0, 25)];
		randomSpot = getRandomInt(0, 99); 		
		currentSymbol = $('tr.symbols').find('td').eq(randomSpot).html();

		//if the symbol in the random location is already
		//correct find a new spot and symbol
		while(chartGoal[randomSpot] === currentSymbol) {
			randomSymbol = thinkDing[getRandomInt(0, 25)];
			randomSpot = getRandomInt(0, 99);
			currentSymbol = $('tr.symbols').find('td').eq(randomSpot).html(); 		
		}

		//place the random symbol in the random spot on the chart
		randomSymbol = '<div>'+randomSymbol+'</div>';
		$('tr.symbols').find('td').eq(randomSpot).html(randomSymbol);

	}

	//fill chartGoal with 100 random thinkDing chars
	chartGoal = '';
	randomSymbol = thinkDing[getRandomInt(0, 25)];  
	for(i=0; i<=100; i++){
	 chartGoal = chartGoal + randomSymbol;
	}

	console.log(chartGoal); 

	symbolInterval = setInterval(function() { 
		var i, changesAtOnce;
		changesAtOnce = 10; 

		for(i = 0; i<changesAtOnce; i++){
			changeRandomSymbol(); 
		}

	}, 50);

});
	