
var screens = ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Panama_City_2016_Flut.jpg/1280px-Panama_City_2016_Flut.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Cuidaddepanama1.jpg/1024px-Cuidaddepanama1.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Panama_city_1.JPG/1024px-Panama_city_1.JPG"];

var currentPage = 0;
function controlBackground(dynamicBack) {
  var h = window.innerHeight;
  var o = window.pageYOffset;
  
  var current_screen = 0;
  $(".page").each(function(index){
    var page_off = $(this).offset().top;
    if( page_off < o + h / 2){
      current_screen = index % screens.length;
    }
  });
  if(current_screen != currentPage){
    currentPage = current_screen;
    dynamicBack.nextBack();
  }
}
$('document').ready(function(){
  var db = createDynamicBack();
  db.initialize(screens, ".content", 0.6, "blue", "background-repeat:no-repeat;background-attachment:fixed;background-position:center;background-size:cover;");
  
  $(window).scroll(controlBackground.bind(this,db));
  $(window).resize(controlBackground.bind(this,db));
}
);

