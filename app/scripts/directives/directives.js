var productDirective, detectWindowDirective, bottomChooseDirective;
productDirective = function($timeout){
  return {
    retrict: 'A',
    link: function(scope, elem, attr){}
  };
};
detectWindowDirective = function(){
  return {
    retrict: 'A',
    link: function(scope, elem, attr){
      var container, hammertime;
      container = document.getElementById('innersub');
      hammertime = new Hammer(container, {
        drag_max_touches: 0
      });
      hammertime.on("touch drag", function(ev, _scope){
        ev.gesture.preventDefault();
      });
    }
  };
};
bottomChooseDirective = function(){
  return {
    retrict: 'A',
    link: function(scope, elem, attr){
      var container, hammertime;
      container = document.getElementById('bottomChoose__frame');
      hammertime = new Hammer(container, {
        drag_max_touches: 0
      });
      hammertime.on("swipe drag", function(ev, _scope){
        ev.gesture.preventDefault();
      });
    }
  };
};
angular.module('socialfight').directive('product', productDirective).directive('detectwindow', detectWindowDirective).directive('bottomChoose', bottomChooseDirective);