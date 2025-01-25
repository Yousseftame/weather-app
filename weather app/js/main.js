let days =["Sunday","Monday","Tuesday","Wenesday","Thursday","Friday","Saturday"],
    month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
// ---------------------get month---------------------------
function getMonth(){
    let currMonth= new Date();
    return currentMonth =month[currMonth.getMonth()];
}
//----------------------get date----------------------------
function todayDate(){
    let todDate = new Date();
    return currDate =todDate.getDate();
}
//  -----------------------get day--------------------------
function getDay(){
    let date = new Date();
    return day=days[date.getDay()];
}
//  -------------------------display date-------------------------------
document.getElementById('day').innerHTML=getDay();
document.getElementById('date').innerHTML=`${todayDate()} ${getMonth()}`;
//----------------------------------------------------------------------
let response=''
let city="cairo"
async function getWether(city) {
    let data =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=19d50d0356d34e2bb9551335222410&q=${city}&days=3`);
    response =await data.json();
    // console.log(response);
    firstCard();
    nexCard();
    getCoordintes();
}
getWether(city)
//---------------------------
function firstCard() {
    document.getElementById("city").innerHTML=response.location.name;
    document.getElementById("todayIcon").setAttribute('src',`https:${response.current.condition.icon}`)
    document.getElementById("todayDegree").innerHTML=`${response.current.temp_c}<sup>o</sup>C`;
    document.getElementById("description").innerHTML=`${response.current.condition.text}`;
    document.getElementById("humidity").innerHTML=` ${response.current.humidity} % `;
    document.getElementById("wind_mph").innerHTML=` ${response.current.wind_mph}  km / h`;
    document.getElementById("wind_dir").innerHTML=`  ${response.current.wind_dir}`;

}
//---------------------------
let nexDay=Array.from(document.querySelectorAll("#nextDay"));
let nexDayIcon=Array.from(document.querySelectorAll("#nexDayIcon"));
let nexDegree=Array.from(document.querySelectorAll("#nexDegree"));
let minDegree=Array.from(document.querySelectorAll("#minDegree"));
let nexDescription=Array.from(document.querySelectorAll("#nexDescription"));

function nexCard() {
    for (let i = 0; i < nexDay.length; i++) {
        nexDay[i].innerHTML=days[new Date(response.forecast.forecastday[i+1].date).getDay()];
        nexDayIcon[i].setAttribute('src',`https:${response.forecast.forecastday[i+1].day.condition.icon}`);
        nexDegree[i].innerHTML=`${response.forecast.forecastday[i+1].day.maxtemp_c}<sup>o</sup>C`;
        minDegree[i].innerHTML=`${response.forecast.forecastday[i+1].day.mintemp_c}<sup>o</sup>C`;
        nexDescription[i].innerHTML=`${response.forecast.forecastday[i+1].day.condition.text}`;
    }
}
//-----------------------------------
let search =document.getElementById('search')
search.addEventListener('keyup',()=>{
    city=search.value;
    getWether(city);
})
//--------------------------
// Step 1: Get user coordinates
function getCoordintes() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;
		var lat = crd.latitude.toString();
		var lng = crd.longitude.toString();
		var coordinates = [lat, lng];
		// console.log(`Latitude: ${lat}, Longitude: ${lng}`);
		getCity(coordinates);
		return;

	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
}
// Step 2: Get city name
function getCity(coordinates) {
	var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng = coordinates[1];

	// Paste your LocationIQ token below.
	xhr.open('GET',`https://us1.locationiq.com/v1/reverse.php?key=pk.f54576c3e793cd7f56a9febae96e27ed&lat=` +lat + "&lon=" + lng + "&format=json", true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
			var city = response.address.city;
			// console.log(city);
			return;
		}
	}
}


