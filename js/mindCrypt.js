

$(document).ready(function() {
	
	var $numberDiv, $symbolDiv, symbol, $symbolSpots,
		$numberSpots, i;

	//create the number Div object to be cloned
	$numberDiv =  $('<div></div>');
	$numberDiv.addClass('number');
	$numberDiv.hide();  
	//clone it across all the table data elements
	$('tr.symbols').find('td').each(function() {
		$numberDiv.clone().appendTo(this);
	});

	//creat the sybol div to be cloned
	$symbolDiv = $('<div></div>');
	$symbolDiv.addClass('symbol'); 
	$symbolDiv.addClass('isSwitchable'); 
	//clone it across all the table data elements
	$('tr.symbols').find('td').each(function() {
		$symbolDiv.clone().appendTo(this);
	});

	//creat a jQuery object that contains all the numberSpot and symbolspots
	$numberSpots = $('tr.symbols').find('td').find('div.number');
	$symbolSpots = $('tr.symbols').find('td').find('div.symbol');


	//number each square of the chart
	i = 99; 
	$numberSpots.each(function() {
		$(this).html(i); 
		--i; 
	}); 
	
});




$('html').on('click', function() {
	
	//remove the click event so it only happens once
	$('html').unbind('click'); 

	var i, thinkDing, symbolInterval, chartGoalStart, chartGoalEnd, 
		randomSymbol, $numberSpots, $symbolSpots, secretSymbol, magicNumbers;

	$numberSpots = $('tr.symbols').find('td').find('div.number');
	$symbolSpots = $('tr.symbols').find('td').find('div.symbol');
	thinkDing = '❂☭☮♕♞☸♗♠☹✪❉✂☾☂♆✸★✈♙☏♬☢☠☯♖✿';
	i =0;
	
		
	
	// Returns a random integer between min and max
	// Using Math.round() will give you a non-uniform distribution!
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function changeRandomSymbol() {
		var secretSymbol, randomSpot, currentSymbol; 
		
		//find a random symbol and a random location to place it
		secretSymbol = thinkDing[getRandomInt(0, (thinkDing.length - 1) )];
		randomSpot = getRandomInt(0, ($symbolSpots.length - 1)); 		
		currentSymbol = $symbolSpots.eq(randomSpot).html();

	
		//place the random symbol in the random spot on the chart
		$symbolSpots.eq(randomSpot).html(secretSymbol);

		
		//if the symbol spot contains it's correct charachter
		if(secretSymbol === chartGoalStart[randomSpot]) {
			//remove this spot from the switchable class
			$symbolSpots.eq(randomSpot).removeClass('isSwitchable');
			//remove the above object from the jQuery object 
			$symbolSpots = $symbolSpots.filter('.isSwitchable');
		}

		if($symbolSpots.length <= 0) {
			clearInterval(switchInterval);
			$numberSpots.fadeIn('slow');
			
		}

	}

	//fill chartGoalEnd with one random secret charachter
	chartGoalEnd = '';
	secretSymbol = thinkDing[getRandomInt(0, (thinkDing.length - 1))];  
	for(i=0; i < 100; i++){
		chartGoalEnd = chartGoalEnd + secretSymbol;
	}

	magicNumbers = [8, 17, 26, 35, 44, 53, 62, 71, 80];

	//fill chartGoalStart with 100 random thinkDing chars
	// chartGoalStart = '';
	// for(i=0; i< 100; i++){
	// 	//randomSymbol = thinkDing[getRandomInt(0, (thinkDing.length - 1))];  
	// 	randomSymbol = '☏'; 
		
	// 	//chedk if this is one of the magic spots if so clear that spot
	// 	//on the list of magic spots and change the 'random symbol' to
	// 	//the secret symbol
	// 	if(i === magicNumbers[0]) {
	// 		console.log(magicNumbers.shift()); 
	// 		randomSymbol = secretSymbol; 
	// 	}


	// 	chartGoalStart = chartGoalStart + randomSymbol;
	// }

	chartGoalStart = '♠♠♠♠♠♠♠♠♠♠' +
					 '★★★★★★★★★★' +
					 '★★★★★★★★★★' +
					 '★★★★★★★★★★' +
					 '★★★★★★★★★★' +
					 '★★★★★★★★★★' +
					 '★★★★★★★★★★' +
					 '★★★★★★★★★★' +
					 '★★★★★★★★★★' +
					 '★★★★★★★★★★' ;

	console.log(chartGoalEnd, chartGoalEnd.length); 
	console.log(chartGoalStart, chartGoalStart.length); 


	var changesAtOnce, intervalTimes;
	
	intervalTimes = 0; 

	switchInterval = setInterval(function() { 
		changesAtOnce = 1; 

		for(i = 0; i<changesAtOnce; i++){
			changeRandomSymbol(); 
		}
		
	}, 50);

});
	