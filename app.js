$(document).ready(function() {

	// Time to get the weather!
	function success(position) {
		// Get user's coordinates
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;


		// Feed user's geolocation into API and retrieve weather information
		$.ajax({
			url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=694129fefbf3866ba3f560638d263eb5`,
			// dataType for this API is json by default
			success: function(response) {

				console.log('Weather found');

				var info = response.sys.country;
				console.log(info);

				//Hide loading text and load weather information
				$('#loading-text').fadeOut("slow", function() {
					//Location
					$('#location').text(`${response.name}, ${response.sys.country}`);

					// Temperature
					var tempC = Math.floor(response.main.temp);
					var tempF = Math.floor((tempC * 1.8) + 32);
					// Add temperature to div
					$('#temperature').text(`${tempC}°`);
					// Add C and F buttons to div
					$('#cel-btn').html(`<button id="btn-c" class="col- btn active">C</button>`);
					$('#fah-btn').html(`<button id="btn-f" class="col- btn">F</button>`);


					// Toggle between celcius and fahrenheit
					$('#btn-f').click(function() {
						$('#temperature').text(`${tempF}°`);
						$('#btn-c').removeClass("active");
						$('#btn-f').addClass("active");
					});

					$('#btn-c').click(function() {
						$('#temperature').text(`${tempC}°`);
						$('#btn-c').addClass("active");
						$('#btn-f').removeClass("active");
					});

					// Weather desciption
					var weatherInfo = response.weather[0].main;
					$('#weather-desc').text(`${weatherInfo}`);


					// Get time
					setTime();

					// Apply the right weather icon
					var weatherID = response.weather[0].id;
					$('#icon').html(`<i class="wi wi-owm-${weatherID}"></i>`);

					// Change background image according to weather
					var coverImg = $("body");

					// thunderstorm
					if (weatherID <= 232) {
						coverImg.css({
							"background": "url(https://images.pexels.com/photos/99577/barn-lightning-bolt-storm-99577.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb)no-repeat center center fixed"
						});
					}

					// drizzle
					if (weatherID >= 300 && weatherID <= 321) {
						coverImg.css({
							"background": "url(https://images.pexels.com/photos/339119/pexels-photo-339119.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb)no-repeat center center fixed"
						});
					}

					// rain
					if (weatherID >= 500 && weatherID <= 531) {
						coverImg.css({
							"background": "url(https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb)no-repeat center center fixed"
						});
					}

					// snow
					if (weatherID >= 600 && weatherID <= 622) {
						coverImg.css({
							"background": "url(https://images.pexels.com/photos/351448/pexels-photo-351448.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)no-repeat center center fixed"
						});
					}

					// fog, mist, haze
					if (weatherID >= 701 && weatherID <= 781) {
						coverImg.css({
							"background": "url(https://images.pexels.com/photos/5230/road-fog-foggy-mist.jpg?w=1260&h=750&auto=compress&cs=tinysrgb)no-repeat center center fixed"
						});
					}

					// clear sky
					if (weatherID === 800) {
						coverImg.css({
							"background": "url(https://images.pexels.com/photos/518415/pexels-photo-518415.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)no-repeat center center fixed"
						});
					}

					// clouds
					if (weatherID >= 801 && weatherID <= 804) {
						coverImg.css({
							"background": "url(https://images.pexels.com/photos/314726/pexels-photo-314726.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)no-repeat center center fixed"
						});
					}

					// storm, windy
					if (weatherID >= 900 && weatherID <= 906) {
						coverImg.css({
							"background": "url(https://images.pexels.com/photos/1551/field-thunderstorm-rainy-meadow.jpg?w=940&h=650&auto=compress&cs=tinysrgb)no-repeat center center fixed"
						});
					}

					// others

					if (weatherID >= 951 && weatherID <= 962) {
						coverImg.css({
							"background": "url(https://images.pexels.com/photos/239520/pexels-photo-239520.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)no-repeat center center fixed"
						});
					}

				// Load footer
				$('#footer').html(`<p>Made by <a href="https://pamela.io" target="blank">Pam De Silva</a> for <a href="https://www.freecodecamp.com" target="blank">Free Code Camp.</p>`);
				});


			},

			// Error message if API doesn't work
			error: function() {
				$('#location').text(`Looks like the weatherman is off duty. Please try again later.`);
			}
		});
	}

	// Error message if geolocation can't be accessed
	function error() {
		alert(`Whoops, looks like something went wrong. Try again by refreshing your browser and clicking 'Allow'`);
	}

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	navigator.geolocation.getCurrentPosition(success, error, options);


	// Detect user's local time
	function setTime() {
		var now = new Date();
		var hour = now.getHours();
		var mins = now.getMinutes();

		// Add a zero in front if minutes are less than 10
		if (mins < 10) {
			mins = `0${mins}`;
		}

		if (hour > 12) {
			$('#local-time').text(`${hour - 12}:${mins} PM`);
		} else if (hour === 12) {
			$('#local-time').text(`${hour}:${mins} PM`);
		} else {
			$('#local-time').text(`${hour}:${mins} AM`);
		}
	}

});
