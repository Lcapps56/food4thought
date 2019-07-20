var favorites = JSON.parse(localStorage.getItem("favorites"));
if(!Array.isArray(favorites)) {
    favorites = [];
}
$("#submit").click(function(){
    var fav = $("#favorite").val().trim()
    if( favorites.includes(fav)){
       favorites.splice(favorites.indexOf(fav),1)
    
    }
    else{
        favorites.push(fav)
    }
    localStorage.setItem("favorites",JSON.stringify(favorites));
})