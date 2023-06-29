/*---------------------------- TOGGLE -----------------------------------------------*/
// DOM elements
const configToggleBtn = document.getElementById("config-toggle");
const configSection = document.getElementById("config-section");
const configCloseBtn = document.getElementById("config-close");
const dateToggle = document.getElementById("date-toggle");
const minTempToggle = document.getElementById("min-temp-toggle");
const maxTempToggle = document.getElementById("max-temp-toggle");
const precipitationToggle = document.getElementById("precipitation-toggle");

// Configuration toggling function
function toggleConfig() {
  configSection.classList.toggle("open"); // Toggle the "open" class on the configuration section
}

// initial state
let configVisible = false;
configSection.style.transform = "translateX(-100%)";

// Toggle
function toggleConfigSection() {
  if (configVisible) {
    // Hide configurations
    configSection.style.transform = "translateX(-100%)";
    configToggleBtn.textContent = "⚙️";
    configVisible = false;
  } else {
    // Show configurations
    configSection.style.transform = "translateX(0)";
    configToggleBtn.textContent = "⚙️";
    configVisible = true;
  }
}

// Close
function closeConfig() {
  configSection.style.transform = "translateX(-100%)";
  configToggleBtn.textContent = "⚙️";
  configVisible = false;
}

// Event listeners
configToggleBtn.addEventListener("click", toggleConfigSection);
configCloseBtn.addEventListener("click", closeConfig);

// Toggle On/ Off info API
function toggleWeatherInfo() {
  const dateToggle = document.getElementById("date-toggle");
  const precipitationToggle = document.getElementById("precipitation-toggle");
  const minTempToggle = document.getElementById("min-temp-toggle");
  const maxTempToggle = document.getElementById("max-temp-toggle");
  const weatherDate = document.getElementById("weather-date");
  const weatherPrecipitation = document.getElementById("weather-precipitation");
  const weatherMinTemp = document.getElementById("weather-min-temp");
  const weatherMaxTemp = document.getElementById("weather-max-temp");

  weatherDate.style.display = dateToggle.checked ? "block" : "none";
  weatherPrecipitation.style.display = precipitationToggle.checked
    ? "block"
    : "none";
  weatherMinTemp.style.display = minTempToggle.checked ? "block" : "none";
  weatherMaxTemp.style.display = maxTempToggle.checked ? "block" : "none";
}
/*-----------------------------------------------------------------------------------*/

/*---------------------Cookies--------------------------------------------------------*/
dateToggle.addEventListener("change", function () {
  Cookies.set("showDate", this.checked, { expires: 365 });
  toggleWeatherInfo();
});

minTempToggle.addEventListener("change", function () {
  Cookies.set("showMinTemp", this.checked, { expires: 365 });
  toggleWeatherInfo();
});

maxTempToggle.addEventListener("change", function () {
  Cookies.set("showMaxTemp", this.checked, { expires: 365 });
  toggleWeatherInfo();
});

precipitationToggle.addEventListener("change", function () {
  Cookies.set("showPrecipitation", this.checked, { expires: 365 });
  toggleWeatherInfo();
});

// check for cookie values on page load and update checkboxes and weather info display
dateToggle.checked = Cookies.get("showDate") === "true";
minTempToggle.checked = Cookies.get("showMinTemp") === "true";
maxTempToggle.checked = Cookies.get("showMaxTemp") === "true";
precipitationToggle.checked = Cookies.get("showPrecipitation") === "true";

toggleWeatherInfo();
/*-----------------------------------------------------------------------------*/
