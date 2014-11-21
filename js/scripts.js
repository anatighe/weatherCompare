$(function() {
  $("form#get-zip").submit(function() {
    var zipFirst = $("input#zip-first").val();
    var zipSecond = $("input#zip-second").val();
    var temps = [];
    $("ul.weather").empty();
    $("ul.temp-difference").empty();

    function getData(zip, temp) {
      $.ajax({
        url : "http://api.wunderground.com/api/625172310aff38a6/geolookup/conditions/q/" + zip + ".json",
        dataType : "jsonp",
        success : function(parsed_json) {
          console.log(parsed_json);
          if (parsed_json['response']['error']) { 
            alert(parsed_json['response']['error']['description']) 
          } else {
            var location = parsed_json['location']['city'];
            var temp = parsed_json['current_observation']['temp_f'];
            var weather = parsed_json['current_observation']['weather'];
            var icon = parsed_json['current_observation']['icon'];
            temps.push(temp);
            $("ul.weather").append("<li class='city'>" + "<img src='http://icons.wxug.com/i/c/i/" + icon + ".gif'>" +
              "The temperature in " + location + " is " + temp + " F. The weather is " + weather + ".</li>");
            if (temps.length == 2) {
              var tempDifference = +Math.abs(temps[0] - temps[1]).toFixed(2);
              console.log(tempDifference);
              $("ul.temp-difference").append("<li class='difference'>" + "The difference in temperatures is " + tempDifference + " F" + "</li>");
            }
          }
        },
      });
    }

    getData(zipFirst, "first");
    getData(zipSecond, "second");

    return false;
  });
});












