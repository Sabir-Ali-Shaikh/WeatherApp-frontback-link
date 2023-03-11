let locName = document.querySelector(".city");
let currentTemp = document.querySelector(".temp");
let tempF=document.querySelector(".tempF")
let country = document.querySelector(".country");
let text = document.querySelector(".text");
let longitude = document.querySelector(".longitude");
let feel = document.querySelector(".feel-like");
let latitude = document.querySelector(".latitude");
let icon = document.querySelector(".icon img");
let suggest = document.querySelector(".suggestion-city");
let iconPath;
let response;

const suggestionCity = [
  "kolkata",
  "bihar",
  "barrackpore",
  "hisar",
  "pathankot",
  "Delhi",
  "Amritsar",
  "kanpur",
  "Surat",
];

async function getWeather(query) { 
  // for server API change query to LocationInput
  // response = await fetch(
  //   `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${locationInput}&aqi=no`
  // )
  response = await fetch(`http://localhost:5000/?city=${query}`)
    .then((data) => {
      return data.json();
    })

    .then((d) => weatherInfo(d))

    .catch((e) => {
      console.error(e);
      alert(e);
    });
}

function weatherInfo(res) {
  console.log(res);
  locName.value = ` ${res.location.city}`;
  // country.innerHTML = `Country:  ${res.location.country}`;
  longitude.innerHTML = `Longitude: ${res.location.long}`;
  latitude.innerHTML = `Latitude: ${res.location.lat}`;
  text.innerHTML = `Uv: ${res.condition.uv}`;
  feel.innerHTML = `Feels  ${res.condition.humidity}<sup>°</sup>`;
  currentTemp.innerHTML = `${res.condition.tempC} <sup>°</sup>`;
  tempF.innerHTML = `TempF: ${res.condition.tempF}`;
  // iconPath = res.current.condition.icon.replace(
  //   "//cdn.weatherapi.com",
  //   "../assets"
  // );
  // iconPath = iconPath.replace(".png", ".svg");
  // // icon.src = response.current.condition.icon;
  // icon.src = iconPath;

  // console.log(iconPath);
}




// function weatherInfo(res) {
  // console.log(res);
  // locName.value = ` ${res.location.city}`;
  // country.innerHTML = `Country:  ${res.location.country}`;
  // longitude.innerHTML = `Longitude: ${res.location.lon}`;
  // latitude.innerHTML = `Latitude: ${res.location.lat}`;
  // text.innerHTML = `Type: ${res.current.condition.text}`;
  // feel.innerHTML = `Feels  ${res.current.feelslikeC}<sup>°</sup>`;
  // currentTemp.innerHTML = `${res.current.tempC} <sup>°</sup>`;
  // iconPath = res.current.condition.icon.replace(
  //   "//cdn.weatherapi.com",
  //   "../assets"
  // );
  // iconPath = iconPath.replace(".png", ".svg");
  // // icon.src = response.current.condition.icon;
  // icon.src = iconPath;

  // console.log(iconPath);
// }


(function addSuggestion() {
  suggestionCity.forEach((city) => {
    let li = document.createElement("li");
    li.textContent = city;
    suggest.firstElementChild.appendChild(li);
    // console.log(suggest.firstElementChild.appendChild(li));
  });
})();

suggest.firstElementChild.addEventListener("click", (e) => {
  locName.value = e.target.textContent;
  getWeather(locName.value);
});

window.addEventListener("click", (e) => {
  if (e.target == locName) {
    suggest.classList.remove("hide");
  } else {
    suggest.classList.add("hide");
  }
});

locName.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    getWeather(e.target.value);
  }
});

(() => {
  getWeather("patna");
})();
