// DEPENDENCIES
const cityInputEl = $("#cityInput")
const submitBtn = $("#submitButton")

// DATA


// FUNCTIONS
const submitBtnHandler = event => {
    event.preventDefault();

    const city = cityInputEl.val().trim();

    if (city) {
        getLatAndLong(city);
    
        // repoContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a city name');
    }
};

const getLatAndLong = city => {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=1&appid=ee7c96e3014aea6e9033db179b95b0cc`;
    
    fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            getWeatherData(data[0].lat, data[0].lon);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
        })
        .catch(function (error) {
            alert('Unable to connect to weather data');
        });
    };

const getWeatherData = (lat, lon) => {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ee7c96e3014aea6e9033db179b95b0cc`;
    
    fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            // displayRepos(data, user);
            console.log(data);
            });
        } else {
            alert(`Error:${response.statusText}`);
        }
        })
        .catch(function (error) {
        alert('Unable to connect to weather data');
        });
    };


// USER INTERACTIONS
submitBtn.on("click", submitBtnHandler);