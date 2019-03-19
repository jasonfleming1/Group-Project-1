// START CODING BELOW!!
var event1 = "Luge Mixed (Men)'s Doubles";  // var for child pull 
var sport1 = "";     //var for  child pull
var games1 = "1988 Winter";     //var for child pull
var gold = "Gold";
var silver = "Silver";
var bronze = "Bronze";
var city;
var geo = {};
var lat;
var lon;
var map;
var results = []



var queryURL = "https://en.wikipedia.org/api/rest_v1/page/summary/" + games1 + "_Olympics";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response)
  t = response.extract
  $("#Wiki").text(t)


});



Papa.parse("https://raw.githubusercontent.com/Psychlosuo/Group-Project-1/master/data/athlete_events_mydata.csv", {
  download: true,
  header: true,
  complete: function (results) {

    for (var i = 0; i < results.data.length; ++i) {


      if ((results.data[i].Event == events1) && (results.data[i].Games == games1) && (results.data[i].Medal == gold)) {

        console.log(results.data[i]);

        Gtotal = results.data[i].Name + " " + results.data[i].Team + " " + results.data[i].Event + " " + results.data[i].Medal

           $(".humidity").text(JSON.stringify(results.data[i]))
        //   $(".gold").append(Gtotal)
        var add = $("<tr>")

        var name1 = $("<td>");
                  name1.text(results.data[i].Name + " Age " + results.data[i].Age);
                  add.append(name1)

        var name2 = $("<td>");
           name2.text(results.data[i].Team);
            add.append(name2)

        var name3 = $("<td>");
            name3.text(results.data[i].Event);
            add.append(name3)

        var name4 = $("<td>");
            name4.text(results.data[i].Medal);
            add.append(name4)




          $("#myTable").append(add);
      }

      if ((results.data[i].Event == events1) && (results.data[i].Games == games1) && (results.data[i].Medal == silver)) {


        Stotal = results.data[i].Name + " " + results.data[i].Team + " " + results.data[i].Event + " " + results.data[i].Medal

        var add = $("<tr>")

        var name1 = $("<td>");
                  name1.text(results.data[i].Name);
                  add.append(name1)

        var name2 = $("<td>");
           name2.text(results.data[i].Team);
            add.append(name2)

        var name3 = $("<td>");
            name3.text(results.data[i].Event);
            add.append(name3)

        var name4 = $("<td>");
            name4.text(results.data[i].Medal);
            add.append(name4)

          $("#myTable").append(add);

      }

      if ((results.data[i].Event == events1) && (results.data[i].Games == games1) && (results.data[i].Medal == bronze)) {


        Btotal = results.data[i].Name + " " + results.data[i].Team + " " + results.data[i].Event + " " + results.data[i].Medal

        

        var add = $("<tr>")

        var name1 = $("<td>");
                  name1.text(results.data[i].Name);
                  add.append(name1)

        var name2 = $("<td>");
           name2.text(results.data[i].Team);
            add.append(name2)

        var name3 = $("<td>");
            name3.text(results.data[i].Event);
            add.append(name3)

        var name4 = $("<td>");
            name4.text(results.data[i].Medal);
            add.append(name4)

          $("#myTable").append(add);

        city = results.data[i].City

      }

    }

    weather(city)



  }
});




/*
function initMap(coordinates) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: coordinates,
    zoom: 8
  });
}//end initMap() fct
*/

function weather() {
  var APIKey = "d4107f4d2db5ca1068c8f65c19eeaccc";

  // Here we are building the URL we need to query the database
  // &units=imperial
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log("Weather Response: ", response)
    temp = response.main.temp
    lat = response.coord.lat
    lon = response.coord.lon

    geo.lat = lat
    console.log("Lat into Geopt Obj: ", geo.lat)
    geo.lng = lon
    console.log("Lon into Geopt Obj: ", geo.lng)


    console.log("type of lat", typeof lat)

//    geo1.push(lat)
//    geo1.push(lon)

 var weatherIcon = "http://openweathermap.org/img/w/" +  response.weather[0].icon + ".png";


    $("#weather").html("Current Weather in: " + response.name + "<img src='" + weatherIcon + "'>")

//    $(".latLon").text("lat " + response.coord.lat + "lon " + response.coord.lon)

    initMap(geo);
  });//end weather AJAX



}//end weather() fct


     var config = {
        apiKey: "AIzaSyBuzC2hZ2ASBJUuZJ-DAd1-l4wapO-r7-I",
        authDomain: "olympicgold-943ae.firebaseapp.com",
        databaseURL: "https://olympicgold-943ae.firebaseio.com",
        projectId: "olympicgold-943ae",
        storageBucket: "olympicgold-943ae.appspot.com",
        messagingSenderId: "985372088866"
    };
    firebase.initializeApp(config);




    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values
     var event = "";  //blank once dropdowns work
     var games = "";  //blank once dropdowns work
     var sport = "";  //blank once dropdowns work

    // Capture Button Click
   $("#add-data").on("click", function (event) {
        // Don't refresh the page!
        event.preventDefault();


        games = $("#games").val().trim();
        sport = $("#sport").val().trim();
        event = $("#event").val().trim();

          database.ref().push({
            event: event,
            games: games,
            sport: sport,

      });

    });



    database.ref().on("child_added", function (childsnapshot) {

        // Log everything that's coming out of snapshot

        console.log(childsnapshot.val().event);
        console.log(childsnapshot.val().game);
        console.log(childsnapshot.val().sport);


        event1 = (childsnapshot.val().event);
        games1 = (childsnapshot.val().game);









    });






