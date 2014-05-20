


var mindCrypt = (function($) {

	var $numberDiv, $symbolDiv, symbol, $symbolSpots,$numberSpots, i, 
		initApp, thinkDing, chartGoalStart, chartGoalEnd, 
		randomSymbol, secretSymbol, magicNumbers, getRandomInt, 
		changeRandomSymbol, firstRunEnd, secondRunEnd, runEnding, 
		startInterval, buildCharts, runStart, chartMiddle, runMiddle,
		middleEnd;

	//symbols used in the switching chart
	thinkDing = '❂☭☮♕♞☸♗♠☹✪❉✂☾☂♆✸★✈♙☏♬☢☠☯♖✿';
	
	//the actual DOM chart locations that the secret symbol 
	//will be placed in 
	magicNumbers = [18, 27, 36, 45, 54, 63, 72, 81, 90];
	
	i =0;
	
	//set up the DOM and the all jQuery objects, bind the click event
	//for starting the app	
	initApp = function() {
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
		
		runStart();

	};

			
	
	// Returns a random integer between min and max
	// Using Math.round() will give you a non-uniform distribution!
	getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	
	//Switches symbols randoley in the symbol chart until the symbols begin
	//and eventually match the chartGoal 
	changeRandomSymbol = function(chartGoal, callback) {
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

	};

	//the callback used when startInterval finishes it's first run 
	firstRunEnd = function() {
		$numberSpots.fadeIn('slow');
		$('.message p').hide();	
		$('.message p').html(message2);
		$('.message p').fadeIn('slow', function() {
			$('.begin-btn').on('click', runEnding); 
		});
		$('.message-area').animate({'padding-top':'0'}); 		
	};

	//the callback used when startInterval finsishes it second run
	secondRunEnd = function() {
		$('.message p').hide();	
		$('.message p').html(message5);
		$('.message-area').css('padding-top', '3em'); 
		$('.mind-connection-status').remove();
		$('.message p').fadeIn();
		$('.message-area').animate({'padding-top':'0'});
	};


	//starts the first part of mindCrypt, is bound to a click 
	//event after initDOM is run
	runStart = function() {
		$('.message p').hide();	
		$('.message p').html(message1);
		$('.message p').fadeIn();		
		startInterval(chartGoalStart, firstRunEnd);
	};


	//this function is bound to a click event after the first part of 
	//mindCrytp has run 
	runEnding = function() {
		$('.begin-btn').unbind('click'); 
		$numberSpots.fadeOut('slow');
		$('.message p').hide();	
		$('.message p').html(message3);
		
		$('.message-area').css('padding-top', '3em'); 
		$('.begin-btn').remove();
		
		$('.message p').fadeIn();
		$('.message-area').animate({'padding-top':'0'});


		//rebuild symbol spots
		$symbolSpots = $('tr.symbols').find('td').find('div.symbol');
		//make symbol spots switchable again
		$symbolSpots.each(function() {
			$(this).addClass('isSwitchable'); 
		});

		startInterval(chartGoalEnd, secondRunEnd, 10000);

		//after 10 seconds establish psycic connection
		setTimeout(function(){
			$('.message p').hide();	
			$('.message p').html(message4);
			$('.message p').fadeIn();
			$('.glyphicon-exclamation-sign').addClass('glyphicon-eye-open');
			$('.glyphicon-exclamation-sign')
				.toggleClass('glyphicon-exclamation-sign');
						
		}, 10000);
	};


 	//starts the symbol switchng takes a callback  to tell it what to do
 	//when symbol switching is complete
 	startInterval = function(chartEnd, callback, delay) {
		var changesAtOnce, switchInterval, chartGoal;

		if(!delay) {
			chartGoal = chartEnd; 
		} else {
			chartGoal = chartMiddle; 
			setTimeout(function(){
				console.log('Switching Chart');
				chartGoal = chartEnd; 
			}, delay);
		}

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

	};

	//builds the charts that tell the symbol switching what it's goal is
	buildCharts = function() {
		//fill chartGoalEnd with one random secret charachter
		chartGoalEnd = [];
		secretSymbol = thinkDing[getRandomInt(0, (thinkDing.length - 1))];  
		for(i=0; i < 100; i++){
			chartGoalEnd.push(secretSymbol);
		}
		
		//this chart is filled with a symbol that will never be reached, 
		//it can be used to do continous switching
		chartMiddle = []; 
		for(i=0; i < 100; i++){
			chartGoalEnd.push('X');
		}


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
	};


	buildCharts(); 

	return {
		initApp: initApp,
	};

}(jQuery));


var message1, message2, message3, message4, message5;

message1 = "Please stand by while I generate the symbol chart. Don't forget " +
		   "your calculated number.";

message2 = "Find the symbol in the chart below that matches your caculated " +
		   "number. When you're ready start <br> concentraing intently on this " +
		   "symbol in your mind and click the button to begin the " +
		   "experiment.";

message3 = "Establishing Psycic Connection. Please concentrate on your " + 
		   "secret symbol!";

message4 = "Psycic Connection Establishded.";

message5 = "Is this the symbol you chose?"; 


$(document).ready(function() {
	//mindCrypt.initApp();
}); 





/*
	$('.begin-btn').remove(); 
	$('.mind-connection-status').remove(); 
	$('.message p').html(message5); 

	setTimeout(function() {
		$('.message-area').animate({'padding-top':'3em'}); 
		setTimeout(function(){
			$('.message-area').animate({'padding-top':'0'}); 
		}, 3000);
	}, 3000);
*/
	


