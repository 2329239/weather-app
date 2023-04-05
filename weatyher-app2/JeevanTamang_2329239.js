let weather = {
  apiKey: "75891d61fb04ad3b28063a64fc2e56a5",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { rain } = data; //check if rain property exists
    const dateElement = document.querySelector(".date");
    const currentDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    dateElement.textContent = formattedDate;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".condition").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.querySelector(".max").innerHTML =
      "max: " + data.main.temp_max + "°C";
    document.querySelector(".min").innerHTML =
      "min: " + data.main.temp_min + "°C";
    if (rain) {
      const { "1h": rainfall } = rain;
      if (rainfall) {
        document.querySelector(".rainfall").innerText =
          "Rainfall: " + rainfall + "mm";
      } else {
        document.querySelector(".rainfall").innerText = "Rainfall:N/A";
      }
    } else {
      document.querySelector(".rainfall").innerText = "Rainfall: N/A";
    }
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("birmingham");
