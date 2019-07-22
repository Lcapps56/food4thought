$("#submitButton").on("click", function(event){
  event.preventDefault();
  var ingredient = $("#ingredientsInput").val();
//  var diet = "none";
  var diet = $("#dietInput").val();
// dropdown menu or input with 6 options only
  diet ="balanced"
//  var health = "none";
  var health = $("#healthInput").val();
// dropdown menu or input field with 4 options only
 health ="alcohol-free"
  var filter1 = "&diet=";
  var filter2 = "&health=";



 
var appKey = "eb86cdb3f13f6d7cd006d3e874c6754c";
var appId = "faf106fd";
// var appKey = "96e1271b0342c1d83247134c2a36f068";
// var appId = "7351fa17";
//the API ID = 7351fa17. and the API key = 96e1271b0342c1d83247134c2a36f068
var queryUrl = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appId + "&app_key=" + appKey + "&from=0&to=4";
if(diet !== "none"){
  queryUrl += filter1 + diet
}
if(health !== "none"){
  queryUrl += filter2 + health
}
//var queryUrl2 = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appId + "&app_key=" + appKey + "&from=0&to=4" + filter1 + diet + filter2 + health;
//var queryUrl3 = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appId + "&app_key=" + appKey + "&from=0&to=4&diet=low-fat&health=alcohol-free"; 

console.log(queryUrl);

$.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response){
    
    
    for (var i = 0; i < response.hits.length; i++) {
      console.log(response);
      console.log(response.hits[i].recipe.label);
      var label = response.hits[i].recipe.label;
      console.log(response.hits[i].recipe.url);
      var url = $("<a href=" + response.hits[i].recipe.url + "></a>");
      url.text("Click Here to View")
      console.log(response.hits[i].recipe.image);
      var image = $("<img style='width:100%' src=" + response.hits[i].recipe.image + ">");
      var totalFat = " Total Fat" + ": "  + Math.round(response.hits[i].recipe.totalNutrients.FAT.quantity) + " grams ";
      var totalCarb = "Total Carb" + ": "  + Math.round(response.hits[i].recipe.totalNutrients.CHOCDF.quantity) + " grams ";
      var totalProtein = "Total Protein" + ": " + Math.round(response.hits[i].recipe.totalNutrients.PROCNT.quantity) + " grams";
      

      var newDiv = $("<div class=col-lg-4 style=display:inline-block id=recipe></div>");

    //   API #2 / List button
      var newButton = $("<button id=listButton>+</button>")


      
      newDiv.text(label,)
      newDiv.append(image, url, newButton, totalFat, totalCarb, totalProtein)
      newDiv.css({
          "padding": "20px",
          "border": "solid black 1px",
          "background": "#f7f7f7",
        //   "margin": "20px 20px",
          "text-align": "center", 
          "box-shadow": "10px 10px 5px grey",
    
        })  
        newButton.css({
          "position": "absolute",
          "bottom": "0px",
          "right": "0px"
      })
      $("#box").append(newDiv)








    }     
 });  

    
});