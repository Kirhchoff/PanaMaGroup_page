function controlBackground() {
  screens = ["back1", "back2", "back3"];
  var h = window.innerHeight;
  var o = window.pageYOffset;
  $(".content").attr("class","content " + screens[(Math.floor(o/h))%screens.length]);
}

$('document').ready(function(){
  
  $(window).scroll(controlBackground);
  $(window).resize(controlBackground);
}
);

