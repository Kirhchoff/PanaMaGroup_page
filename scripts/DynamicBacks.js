function createDynamicBack() {
  var _backs = [];
  var _targetSel = "";
  var _dynamicBackBaseTmpl="._dynamic_back:before,._dynamic_back:after{content:\"\";position:fixed;top:0px;right:0px;bottom:0px;left:0px;opacity:1;background-color:{0}}";
  var _dynamicBackTmpl="._dynamic_back{0}:before{background-image:url({1});background-repeat: no-repeat;background-attachment: fixed;background-position: center;background-size: cover;z-index:-1;}\
  ._dynamic_back{0}:after{background-image:url({2});background-repeat: no-repeat;background-attachment: fixed;background-position: center;background-size: cover;z-index:-2;{3}}";
  var _faderTmpl="._dynamic_back_fader:before{opacity:0;transition:opacity {0}s;}";
  var _current_back = 0;
  var _inProgress = false;

  function _setTransitionEndHandler() {    
    $(_targetSel).on("transitionend webkitTransitionEnd", function(e){
      var numOfBacks = _backs.length;
      currentIndex = (_current_back-1) % numOfBacks;
      nextIndex = _current_back % numOfBacks;
      $(this).addClass("_dynamic_back"+nextIndex);
      $(this).removeClass("_dynamic_back_fader");
      $(this).removeClass("_dynamic_back"+currentIndex);
      _inProgress = false;
    });    
  };
  
  var _formatString = function() {
    var args = arguments;
    return arguments[0].replace(/{(\d+)}/g, function(match, number) {
      var idx = parseInt(number) + 1;
      return typeof args[idx] != 'undefined'
        ? args[idx]
      : match;
    });
  }

  function _createDynamicBackCSS(duration, color, additionalStyle){
    var numOfBacks = _backs.length;
    $("<style type='text/css'>"+_formatString(_dynamicBackBaseTmpl, color)+"</style>").appendTo("head");
    for(var i = 0; i<numOfBacks; i++){
      $("<style type='text/css'>"+_formatString(_dynamicBackTmpl,i,_backs[i], _backs[(i+1)%numOfBacks],additionalStyle)+"</style>").appendTo("head");
    }
    $("<style type='text/css'>"+_formatString(_faderTmpl, duration)+"</style>").appendTo("head");
  };

  function _setInitialBack(){
    $(_targetSel).addClass("_dynamic_back");
    $(_targetSel).addClass("_dynamic_back0");
  };
  
  function _validateInput(backs, targetSel){
    if(backs.length < 1){
      console.log("DynamicBack: Empty backgrounds array - bailing out!");
      return false;
    }
    if($(targetSel).length == 0){
      console.log("DynamicBack: Invalid target object selector \"" + targetSel + "\" - bailing out!");
      return false;      
    }
    return true;
  }

  function initialize(backs, targetSel, duration=0.6, color="white", additionalStyle=""){
    if(_validateInput(backs, targetSel)){
      _backs = backs;
      _targetSel = targetSel;
      _createDynamicBackCSS(duration, color, additionalStyle);
      _setInitialBack();
      _setTransitionEndHandler();
    }
  };
  
  function nextBack(){
    if (!_inProgress){
      _current_back++;
      _inProgress = true;
      $(_targetSel).addClass("_dynamic_back_fader");
    }
  };
  
  return {
    initialize: initialize,
    nextBack: nextBack
  };
};
