

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

	function changeRandomSymbol(chartGoal, callback) {
		var secretSymbol, randomSpot, currentSymbol; 
		
		//find a random symbol and a random location to place it
		secretSymbol = thinkDing[getRandomInt(0, (thinkDing.length - 1) )];
		randomSpot = getRandomInt(0, ($symbolSpots.length - 1)); 		
		
		//get the symbol currently at that random location
		currentSymbol = $symbolSpots.eq(randomSpot).html();

	
		//place the random symbol in the random spot on the chart
		$symbolSpots.eq(randomSpot).html(secretSymbol);

		
		//if the symbol spot contains it's correct charachter
		if(secretSymbol === chartGoal[randomSpot]) {
			//remove this spot from the switchable class
			$symbolSpots.eq(randomSpot).removeClass('isSwitchable');
			//remove the above object from the jQuery object 
			$symbolSpots = $symbolSpots.filter('.isSwitchable');
			//remove this spot from the chart
			chartGoal.splice(randomSpot,1); 
		}

	}

	function firstRunEnd() {
		$numberSpots.fadeIn('slow');
		$('html').on('click', runEnding); 
	}

	function secondRunEnd() {

	}


	function runEnding() {
		$('html').unbind('click'); 
		$numberSpots.fadeOut('slow');

		//rebuild symbol sposts
		$symbolSpots = $('tr.symbols').find('td').find('div.symbol');
		//make symbol spots switchable again
		$symbolSpots.each(function() {
			$(this).addClass('isSwitchable'); 
		});

		startInterval(chartGoalEnd, secondRunEnd);
	
	}

	function startInterval(chartGoal, callback) {

		var changesAtOnce;

		switchInterval = setInterval(function() { 
			changesAtOnce = 10; 

			for(i = 0; i<changesAtOnce; i++){
				changeRandomSymbol(chartGoal, callback); 
				
				//if all the symbols have been switched
				if($symbolSpots.length <= 0) {
					//turn off the interval 
					clearInterval(switchInterval);
					//break an go to callback
					return callback(); 
				}
			}
			
		}, 50);

	}


	//fill chartGoalEnd with one random secret charachter
	chartGoalEnd = [];
	secretSymbol = thinkDing[getRandomInt(0, (thinkDing.length - 1))];  
	for(i=0; i < 100; i++){
		chartGoalEnd.push(secretSymbol);
	}
	

	magicNumbers = [18, 27, 36, 45, 54, 63, 72, 81, 90];

	//fill chartGoalStart with 100 random thinkDing chars
	chartGoalStart = [];
	for(i=0; i< 100; i++){
		randomSymbol = thinkDing[getRandomInt(0, (thinkDing.length - 1))];  
		//randomSymbol = '☏'; 
		
		//check if this is one of the magic spots if so clear that spot
		//on the list of magic spots and change the 'random symbol' to
		//the secret symbol
		if(i === magicNumbers[0]) {
			magicNumbers.shift(); 
			randomSymbol = secretSymbol; 
		}


		chartGoalStart.push(randomSymbol);
	}


	startInterval(chartGoalStart, firstRunEnd); 



});

