async function leer() {
    var cityName = document.getElementById("cityName").value;
    let key = '5b24986722ac9e8a3b7b15a427ffed7f';
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric&lang=sp`;
    let regex = /^[a-zA-Z][a-zA-Z ]*$/;
    console.log(URL);
    if (regex.test(cityName) == true) { //Valido que el nombre cumpla con la expresion regular para texto
        fetch(URL)
            .then(data => {
                return data.json();
            }).then(clima => {
                if (clima.message) { //MUESTRO ERROR
                    alert(clima.message);
                } else {
                    console.log(clima);
                    let temp = clima.main.temp;
                    let tempMax = clima.main.temp_max;
                    let tempMin = clima.main.temp_min;
                    let feelsLike = clima.main.feels_like;
                    let humidity = clima.main.humidity;
                    let city = clima.name;
                    setValues(temp, tempMax, tempMin, feelsLike, humidity, city);
                }
            });
    } else {
        alert('Por favor, ingrese un nombre de ciudad valido.')
    }
}


function clearLabels() {
    document.getElementById('labelCity').innerHTML = "Ciudad";
    document.getElementById('labelTemp').innerHTML = "";
    document.getElementById('labelTempMax').innerHTML = "";
    document.getElementById('labelTempMin').innerHTML = "";
    document.getElementById('labelFeelsLike').innerHTML = "";
    document.getElementById('labelHumidity').innerHTML = "";
}

function setValues(temp, tempMax, tempMin, feelsLike, humidity, city) {
    document.getElementById('labelCity').innerHTML = city;
    document.getElementById('labelTemp').innerHTML = temp + '°';
    document.getElementById('labelTempMax').innerHTML = tempMax + '°';
    document.getElementById('labelTempMin').innerHTML = tempMin + '°';
    document.getElementById('labelFeelsLike').innerHTML = feelsLike + '°';
    document.getElementById('labelHumidity').innerHTML = humidity + '%';
}