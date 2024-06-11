// DEPENDENCIES
const cityInputEl = $("#cityInput")
const submitBtn = $("#submitButton")
const mainWeatherCard = $("#mainWeather");
const forecastCards = $("#forecastCards");

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
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=ee7c96e3014aea6e9033db179b95b0cc`;
    
    fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            displayWeather(data);
            // console.log(data);
            });
        } else {
            alert(`Error:${response.statusText}`);
        }
        })
        .catch(function (error) {
        alert('Unable to connect to weather data');
        });
    };

const displayWeather = (data) => {
    console.log(data);
    const todaysDate = dayjs.unix(data.list[0].dt);
    let futureDate;
    mainWeatherCard.append(`
        <h2>${data.city.name} ${todaysDate}</h2>
        <p id="main-temp">Temp: ${data.list[0].main.temp} ºF</p>
        <p id="main-wind">Wind: ${data.list[0].wind.speed} MPH</p>
        <p id="main-humidity">Humidity: ${data.list[0].main.humidity}%</p>
    `);
    for (let i = 0; i < 40; i+=8){
        futureDate = dayjs.unix(data.list[i].dt)
        forecastCards.append(`
            <div class="forecast-card p-3">
                <h4>${futureDate}</h4>
                <p id="main-temp">Temp: ${data.list[i].main.temp} ºF</p>
                <p id="main-wind">Wind: ${data.list[i].wind.speed} MPH</p>
                <p id="main-humidity">Humidity: ${data.list[i].main.humidity}%</p>
            </div>
        `);
    };
}

// USER INTERACTIONS
submitBtn.on("click", submitBtnHandler);