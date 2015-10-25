var carouselArray =[];
var indexTracker = 0;
var intervalID;

$(document).ready(function(){
    $.ajax({
            type : "GET",
            url : "/data",
            success: function(data){
                intakeObject(data);
            }
    });
    //click event handlers
    $("#controls").on('click', "#next", nextSlide);
    $("#controls").on('click', "#prev", prevSlide);

});
//Take object, get Array
function intakeObject(object){
    carouselArray = object.zeta;
    createCarousel(carouselArray);
    appendPerson();
}
//Make Div for carousel and controls, Take array, make index points from length, nav
function createCarousel(array) {
    $("#controls").append("<div class='main'></div>");
    var $el = $('#controls').children().last();

    createIndexPoints(array, $el);
    createNavButtons($el);
}
//appending functions
function appendPerson() {
    updateIndexPoints();
        for(var j = 0; j < carouselArray.length; j++) {
            if (indexTracker == j){
                var el = "<div class='person'>" +
                        "<img class='well' src='" + carouselArray[j].imageURL + " alt='" + carouselArray[j].name + "'></img>" +
                    "<h1>" + carouselArray[j].name + "</h1>" +
                    "<a href='" + carouselArray[j].github +"'>Visit my Github!</a>" +
                    "<blockquote>" + carouselArray[j].shoutout +"</blockquote>" +
                 "</div>";
               $('#target').fadeOut(function(){
                    $('#target').html(el).fadeIn();
                })
            }
        }
    intervalID = setInterval(nextSlide, 10000);

}
//append to carousel div a div index-point for each object in array, with unique ids
function createIndexPoints(array, $el){
    for(var i = 0; i < array.length; i++){
        $el.append("<div class='index-point' id='index" + i + "'></div>")
    }
}
function createNavButtons($el) {
    $el.prepend("<div id='prev' class='nav-button btn btn-info'><</div>");
    $el.append("<div id='next' class='nav-button btn btn-info'>></div>");
}
//Carousel Functionality
function nextSlide(){
    clearInterval(intervalID);
    console.log('clicked');
    indexTracker++;
   if(indexTracker >= carouselArray.length){
        indexTracker = 0;
    }
   updateIndexPoints();
   appendPerson();
}
function prevSlide(){
    clearInterval(intervalID);
    indexTracker--;
    if(indexTracker < 0){
        indexTracker = carouselArray.length - 1;
    }

    updateIndexPoints();
    appendPerson();
}

function updateIndexPoints(){
    for(var i = 0; i < carouselArray.length; i++){
        $("#index" + i).removeClass("index-point-active");
       if(i == indexTracker){
            $("#index" + i).addClass("index-point-active");
        }
    }
}


