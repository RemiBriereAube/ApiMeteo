import UrlBuilder from "./UrlBuilder.js";

class App {
  constructor() {
    this.citySelector = document.querySelector("#city-select");
    this.weatherCity = document.querySelector("#weather-city");
    this.weatherDate = document.querySelector("#weather-date");
    this.weatherIconImg = document.getElementById("weather-icon");
    this.weatherTemp = document.querySelector("#weather-temp");
    this.weatherMinTemp = document.querySelector("#weather-min-temp");
    this.weatherMaxTemp = document.querySelector("#weather-max-temp");
    this.weatherPrecipitation = document.querySelector(
      "#weather-precipitation"
    );

    this.date = new Date();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.currentDate = `${this.day}-${this.month}-${this.year}`;

    /*-----------city selection cookie------------*/
    const citySelect = document.querySelector("#city-select");

    citySelect.addEventListener("change", (e) => {
      Cookies.set("citySelection", e.target.value, { expires: 365 });
      this.fetchWeatherData();
    });

    citySelect.value = Cookies.get("citySelection");

    /*-----------------------------------*/

    this.fetchWeatherData();
  }

  fetchWeatherData() {
    const cityCoord = this.citySelector.value;
    const coordArray = cityCoord.split("/");
    const lati = coordArray[0];
    const longi = coordArray[1];

    if (this.citySelector.value == "46.81/-72.21") {
      this.weatherCity.textContent = "Québec";
    } else if (this.citySelector.value == "45.38/-73.48") {
      this.weatherCity.textContent = "Montréal";
    } else if (this.citySelector.value == "45.40/-71.90") {
      this.weatherCity.textContent = "Sherbrooke";
    } else if (this.citySelector.value == "45.47/-75.70") {
      this.weatherCity.textContent = "Gatineau";
    }

    const url = UrlBuilder.getUrl("https://api.open-meteo.com/v1/forecast", {
      latitude: lati,
      longitude: longi,
      daily:
        "weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_probability_mean",
      current_weather: "true",
      timezone: "America/New_York",
    });

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let temperature = data.current_weather.temperature;

        let code = data.current_weather.weathercode;
        if (code == 0) {
          this.weatherIconImg.src = "./assets/icons/soleil.png";
        } else if (code == 1 || code == 2 || code == 3) {
          this.weatherIconImg.src = "./assets/icons/ti-peu_nuageux.png";
        } else if (
          code == 51 ||
          code == 53 ||
          code == 55 ||
          code == 56 ||
          code == 57
        ) {
          this.weatherIconImg.src = "./assets/icons/pluiplui.png";
        }

        //date aujourd'hui ↓
        this.weatherDate.textContent = this.currentDate;
        //temp aujourd'hui ↓
        this.weatherTemp.textContent = temperature + "°C";
        //temps minimum ↓
        this.weatherMinTemp.textContent =
          "Min: " + Math.min(parseInt(data.daily.temperature_2m_min)) + "°C";
        //temps maximum ↓
        this.weatherMaxTemp.textContent =
          "Max: " + Math.min(parseInt(data.daily.temperature_2m_max)) + "°C";
        //précipitation ↓
        this.weatherPrecipitation.textContent =
          "Précipitation: " +
          Math.min(parseInt(data.daily.precipitation_probability_mean)) +
          "%";
      });
  }
}

new App();
