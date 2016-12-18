function controlBackground() {
  screens = ["back1", "back2", "back3"];
  var h = window.innerHeight;
  var o = window.pageYOffset;
  
  var current_screen = 0;
  $(".page").each(function(index){
    var page_off = $(this).offset().top;
    if( page_off < o + h / 2)
      current_screen = index%screens.length;
  });
  $(".content").attr("class","content " + screens[current_screen]);
}

$('document').ready(function(){
  
  $(window).scroll(controlBackground);
  $(window).resize(controlBackground);
}
);

