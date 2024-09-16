function weatherURL(location) {
    return `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=b5a271706ec8db82de8706fecff903fe`;
}

fetch(weatherURL('denpasar'))
    .then((response) => response.json())
    .then((responeJSON) => {
        weatherData(responeJSON); 
        hourForecast(responeJSON);
    });

function weatherData(responeJSON) {
    document.getElementById('city').innerHTML = responeJSON.city.name + ', ' + responeJSON.city.country;
    document.getElementById('temperature').innerHTML = Math.floor(responeJSON.list[0].main.temp - 273.15) + '°C';
    document.getElementById('description').innerHTML = responeJSON.list[0].weather[0].description;

    let icon = responeJSON.list[0].weather[0].icon;
    let iconurl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    document.getElementById('icon').src = iconurl;
}

function search() {
    let searchCity = document.getElementById('search');
    fetch(weatherURL(searchCity.value))
        .then((response) => response.json())
        .then((responeJSON) => {
            weatherData(responeJSON);
            hourForecast(responeJSON);
        })
    searchCity.value = '';
}

function hourForecast(responseJSON) {
    const templist = document.querySelector('.templist');
    templist.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        var date = new Date(responseJSON.list[i].dt * 1000);
        let hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');

        let div = document.createElement('div');
        let time = document.createElement('p');
        time.setAttribute('class', 'time');
        time.innerText = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' });

        let temp = document.createElement('p');
        temp.innerText = Math.floor(responseJSON.list[i].main.temp_max - 273.15) + '°C' + ' / ' + Math.floor(responseJSON.list[i].main.temp_min - 273.15) + '°C';

        div.appendChild(time);
        div.appendChild(temp);

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc');
        desc.innerText = responseJSON.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc);
        templist.appendChild(hourR);

        
        if (i < 4) {
            let hr = document.createElement('hr');
            templist.appendChild(hr);
        }
    }
}



