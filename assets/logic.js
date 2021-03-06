//when the submit button gets clicked
var dataResponse = []
$(document).ready(() => {
  favorites = () => {

    var currentFavs = localStorage.favorites
    $('#favbox').empty()
    var theInfo = ''

    if (currentFavs && currentFavs !== "[]") {
      currentFavs = JSON.parse(currentFavs)
      console.log(currentFavs)

      for (let i = 0; i < currentFavs.length; i++) {
        theInfo += '<div class="col-sm-3"><img src=' + currentFavs[i].image + ' style="width:100px" alt=""><br><a href=' + currentFavs[i].url + '>' + currentFavs[i].name + '</a> <button type="button" class="btn space btn-danger" data-arrayLocation=' + i + '>X</button></div>'
      }
      $('#favbox').append('<div class="container"><div class="row">' + theInfo)
    } else { $('#favbox').append('<small>You currently have no favorites.</small>') }

  }
  favorites()
})
$("#submitButton").on("click", function (event) {
  event.preventDefault();
  //gather what was put in the textbox and save into the ingredients variable
  var ingredient = $("#ingredientsInput").val();

  var diet = $("#dietInput").val();
  // dropdown menu with 4 diet options or none 


  var health = $("#healthInput").val();
  // dropdown menu with 6 health options or none 
  var filter1 = "&diet=";
  // convenience variable to save queryUrl parameter
  var filter2 = "&health=";
  // convenience variable to save queryUrl parameter

  //api info
  var appKey = "eb86cdb3f13f6d7cd006d3e874c6754c";
  var appId = "faf106fd";
  // put the ingredients into the queryUrl 
  // q or ingredient is required but diet and health filters are optional
  var queryUrl = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appId + "&app_key=" + appKey + "&from=0&to=6";
  if (diet !== "none") {
    queryUrl += filter1 + diet
  }
  if (health !== "none") {
    queryUrl += filter2 + health
  }

  //ajax call
  console.log(queryUrl);

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function (response) {
    //empty whatever was in the results box from before 
    $("#box").empty();
    dataResponse = []
    //for each item in the response
    for (var i = 0; i < response.hits.length; i++) {
      //grab the name of the recipe and save it into the "label" variable
      var label = response.hits[i].recipe.label;
      // grab the url to the recipe and save it as a variable with the text of "click here to view". opens in new tab
      var url = $("<a target='_blank' href=" + response.hits[i].recipe.url + "></a>");
      url.text("Click Here to View")
      //grab the image and save it into a variable named "image"
      var image = $("<img style='width:100%' src=" + response.hits[i].recipe.image + ">");

      //create a new div for each response with an id of recipe. each recipe with its info will be in its own div
      var newDiv = $("<div class=col-md-4 style=margin:auto;max-width:380px;padding:0px,15px;overflow:auto id=recipe></div>");

      //   API #2 / List button
      var newButton = $('<button type="button" class="btn btn-primary" data-toggle="modal" onClick="showModal(' + i + ')" id="listButton" style="padding:2px"><h5 style="margin:0">📊</h5></button>')
      var holder = '<button type="button" class="btn btn-primary"  data-url=' + response.hits[i].recipe.url + ' data-title=' + response.hits[i].recipe.label + ' id="likebutton" style="padding:2px"><h5 style="margin:0">👍</h5></button>'
      var saveButton = $('<button type="button" class="btn btn-primary"  data-url=' + response.hits[i].recipe.url + ' data-title="' + response.hits[i].recipe.label + '" data-image =' + response.hits[i].recipe.image + ' id="likebutton"style="padding:2px"><h5 style="margin:0">👍</h5></button>')
      console.log(holder)

      // creates the info for each field in the pie chart for each result
      var recipe = {
        Fat: response.hits[i].recipe.digest[0].total,
        Carbs: response.hits[i].recipe.digest[1].total,
        Protein: response.hits[i].recipe.digest[2].total
      }

      dataResponse.push(recipe)

      // the label, image, url, and new button put in this new div
      newDiv.text(label)
      newDiv.append(image, url, newButton, saveButton)
      newDiv.css({
        "padding": "10px",
        // "max-width": "300px",
        "border": "solid black 1px",
        "background": "#f7f7f7",
        "text-align": "center",
      })
      newButton.css({
        "position": "absolute",
        "bottom": "0px",
        "right": "0px"
      })
      saveButton.css({
        "position": "absolute",
        "bottom": "0px",
        "left": "0px"
      })
      //but the new div into the results box on the page
      $("#box").append(newDiv)
    }
    console.log(dataResponse)
  });
});

//the function to create the piechart on the fly when the button is clicked. creates the piechart with the correct data 
//from an array created when the submit button is clicked
function showModal(position) {
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);
  var currentData = dataResponse[position]
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Macronutrient', 'Amount in grams'],
      // pulls the corresponding data from the array to put in the piechart for whatever recipe was clicked
      ['Fat', currentData.Fat],
      ['Carbs', currentData.Carbs],
      ['protein', currentData.Protein],
    ]);
    console.log(data)
    var options = {
      title: 'Macronutrient Breakdown'
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
  $('#nutritionModal').modal('show')
}

$(document).on('click', '#likebutton', function () {
  var favoritez = localStorage.favorites;
  if (favoritez) {
    favoritez = JSON.parse(favoritez)
  } else {
    favoritez = []
  }
  // var fav = $("#favorite").val().trim()
  var recipe1 = {
    image: $(this).attr('data-image'),
    url: $(this).attr('data-url'),
    name: $(this).attr('data-title')
  }
  console.log(recipe1)
  favoritez.push(recipe1)

  localStorage.setItem("favorites", JSON.stringify(favoritez));

  favorites()
  // console.log(urlText)
  console.log(favoritez)
})
$(document).on('click', '.space', function () {
  var favoritez = JSON.parse(localStorage.favorites)
  var place = $(this).attr('data-arrayLocation')
  favoritez.splice(place, 1)
  localStorage.setItem("favorites", JSON.stringify(favoritez));
  favorites()
})
