//when the submit button gets clicked
var dataResponse = []
$("#submitButton").on("click", function(event){
  event.preventDefault();
  //gather what was put in the textbox and save into the ingredients variable
  var ingredient = $("#ingredientsInput").val();

  //api info
var appKey = "eb86cdb3f13f6d7cd006d3e874c6754c";
var appId = "faf106fd";
//put the ingredients into the url 
var queryUrl = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + appId + "&app_key=" + appKey + "&from=0&to=6";

//ajax call
console.log(queryUrl);
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response){
    //empty whatever was in the results box from before 
    $("#box").empty();
    dataResponse = []
    //for each item in the response
    for (var i = 0; i < response.hits.length; i++) {
      console.log(response.hits[i])
      //grab the name of the recipe and save it into the "label" variable
      var label = response.hits[i].recipe.label;
      // grab the url to the recipe and save it as a variable with the text of "click here to view". opens in new tab
      var url = $("<a target='_blank' href=" + response.hits[i].recipe.url + "></a>");
      url.text("Click Here to View")
      //grab the image and save it into a variable named "image"
      var image = $("<img style='width:100%' src=" + response.hits[i].recipe.image + ">");

      //create a new div for each response with an id of recipe. each recipe with its info will be in its own div
      var newDiv = $("<div class=col-lg-4 style=display:inline-block id=recipe></div>");

    //   API #2 / List button
<<<<<<< HEAD
      var newButton = $('<button type="button" class="btn btn-primary" data-toggle="modal" onClick="showModal('+i+')" id=listButton">+</button>')
      

        var recipe = {
          Fat: response.hits[i].recipe.digest[0].total,
          Carbs: response.hits[i].recipe.digest[1].total,
          Protein:  response.hits[i].recipe.digest[2].total
        }
        
        dataResponse.push(recipe)

=======
      var newButton = $("<button id=listButton>+</button>")
   
>>>>>>> various modifications / ignore most
      // the label, image, url, and new button put in this new div
      newDiv.text(label)
      newDiv.append(image, url, newButton)
      newDiv.css({
          "padding": "20px",
          "border": "solid black 1px",
          "background": "#f7f7f7",
          "text-align": "center", 
          "box-shadow": "10px 10px 5px grey",
        })  
        newButton.css({
          "position": "absolute",
          "bottom": "0px",
          "right": "0px"
      })

      //but the new div into the results box on the page
      $("#box").append(newDiv)
<<<<<<< HEAD
      
    }   
    console.log(dataResponse)  
  });  
});



      function showModal (position){

        

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        var currentData = dataResponse[position]
        function drawChart() {

          var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            // ['Work',     response.hit[i].whatever],
            ['Fat', currentData.Fat],
            ['Carbs',  currentData.Carbs],
            ['protein', currentData.Protein],
          ]);
          console.log(data)
          var options = {
            title: 'My Daily Activities'
          };

          var chart = new google.visualization.PieChart(document.getElementById('piechart'));

          chart.draw(data, options);
        }
        $('#nutritionModal').modal('show')


      }
=======
    }
    $("#listButton").on("click", function(event){
      $('#myModal').on('shown.bs.modal', function () {
        // $('#myInput').trigger('focus')
        console.log("button clicked")
      })
      
      
      
     
        
      }
    )     
  });  
});
>>>>>>> various modifications / ignore most
