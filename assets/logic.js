$("#submitButton").on("click", function(event){
  event.preventDefault();
  var ingredient = $("#ingredientInput").val();




// function recipeSearch(){  
var appKey = "eb86cdb3f13f6d7cd006d3e874c6754c";
var appId = "faf106fd";
// var appKey = "96e1271b0342c1d83247134c2a36f068";
// var appId = "7351fa17";
//the API ID = 7351fa17. and the API key = 96e1271b0342c1d83247134c2a36f068
var queryUrl = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appId + "&app_key=" + appKey + "&from=0&to=4";
//"https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
//“cuisineType=chinese&cuisineType=indian”
console.log(queryUrl);
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response){
    // console.log(response);
    // console.log(response.hits);
    // console.log(response.hits[0]);
    // console.log(response.hits[0].recipe);
    // console.log(response.hits[0].recipe.label);
    // console.log(response.hits[0].recipe.url);
    // console.log(response.hits[0].recipe.image);

    // console.log(response.hits[1].recipe.label);
    // console.log(response.hits[1].recipe.url);
    // console.log(response.hits[1].recipe.image);

    // console.log(response.hits[2].recipe.label);
    // console.log(response.hits[2].recipe.url);
    // console.log(response.hits[2].recipe.image);
    
    for (var i = 0; i < response.hits.length; i++) {
      console.log(response.hits[i].recipe.label);
      var label = response.hits[i].recipe.label;
      console.log(response.hits[i].recipe.url);
      var url = $("<a href=" + response.hits[i].recipe.url + "> Click Here to View</a>");
      console.log(response.hits[i].recipe.image);
      var image = $("<img src=" + response.hits[i].recipe.image + ">");

      var newDiv = $("<div id=recipe></div>")
            
      newDiv.text(label)
      newDiv.append(url, image)
      newDiv.css({
          "padding": "20px",
          "border": "solid black 1px",
          "background": "#f7f7f7",
          "margin": "20px 425px",
          "text-align": "center", 
          "box-shadow": "10px 10px 5px grey"

      })
      $("#box").append(newDiv)








    }     
  });  

    
});