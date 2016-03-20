$(document).ready(function() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var appKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
      $.getJSON("http://api.openweathermap.org/data/2.5/weather", encodeURI("lat="+lat+"&lon="+long+"&APPID="+appKey), function(data) {
        var city = data.name + ", " + data.sys.country;
        var desc = data.weather[0].description;
        desc = desc[0].toUpperCase() + desc.slice(1);
        console.log(data);
        var temp = (data.main.temp - 273.15).toFixed(0);
        var weatherId = data.weather[0].id;

        $("#city").html(city);
        $("#weather-desc").html(desc);
        $("#temp").html(temp);

        if (weatherId < 300) {  // thunderstorm
          $("#weather-img").attr("src","https://pixabay.com/static/uploads/photo/2015/05/15/14/59/lightning-bolt-768801_960_720.jpg");
        } else if (weatherId < 400) {  // drizzle
          $("#weather-img").attr("src","https://pixabay.com/static/uploads/photo/2015/08/03/22/25/rain-874041_960_720.jpg");
        } else if (weatherId < 600) {  // rain
          $("#weather-img").attr("src","https://pixabay.com/static/uploads/photo/2013/06/07/15/34/rain-122691_960_720.jpg");
        } else if (weatherId < 700) {  // snow
          $("#weather-img").attr("src","https://pixabay.com/static/uploads/photo/2013/04/13/13/47/austria-103231_960_720.jpg");
        } else if (weatherId < 800) {  // atmosphere
          $("#weather-img").attr("src","https://pixabay.com/static/uploads/photo/2014/12/17/18/40/fog-571786_960_720.jpg");
        } else if (weatherId == 800) {  // clear
          $("#weather-img").attr("src","https://pixabay.com/static/uploads/photo/2016/01/02/00/42/cloud-1117279_960_720.jpg");
        } else if (weatherId < 900) {  // clouds
          $("#weather-img").attr("src","https://pixabay.com/static/uploads/photo/2013/10/16/10/17/blue-sky-196230_960_720.jpg");
        } else {  // something extreme
          $("#weather-img").attr("src","https://pixabay.com/static/uploads/photo/2013/02/25/16/00/key-west-86025_960_720.jpg");
        }
      });
    });
  } else {
    $("#temp-block").html("I'm sorry, geolocation services are not available");
  }
  
  $("#temp-button").click(function() {
    event.preventDefault();
    var temp = document.getElementById("temp").innerHTML;
    if (document.getElementById("temp-type").value == "F") {
      document.getElementById("temp-type").value = "C";
      $("#temp-button").html("C");
      temp = ((temp - 32)*5/9).toFixed(0);
      $("#temp").html(temp);
    } else {
      document.getElementById("temp-type").value = "F";
      $("#temp-button").html("F");
      temp = ((temp*9/5) + 32).toFixed(0);
      $("#temp").html(temp);
    }
  });
});
