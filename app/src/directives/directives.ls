  
const productDirective = ($timeout)->
  {
  retrict: \A
  # templateUrl: "/views/layout/project/item/comment.html"
  link: (scope, elem, attr) !->  
    # container = document.getElementById \product
    # tmpHeight = scope.tmpHeight
    # hammertime = new Hammer(container, {drag_max_touches: 0});
    # hammertime.on "touch drag", (ev,scope) !->
    #   # console.log(ev)
    #   ev.gesture.preventDefault!
    #   touches = ev.gesture.touches
    #   console.log ev.gesture
    #   if ev.gesture.direction == \down
    #     ev.gesture.distance = - ev.gesture.distance
    #   tmpHeight := tmpHeight - ev.gesture.distance
    #   container.style['-webkit-transform'] = "translate3d(0px,#{tmpHeight}px,0px)"
    #   callback(tmpHeight)
    #   # for t from 0 to touches.length by 1 
    #   #   target = touches[t].target
    #   #   if target.className.indexOf("drag") < 0 
    #   #     return
    #   #   target.style.left = "#{(touches[t].pageX - 50)}+#{px}"
    #   #   target.style.top = "#{(touches[t].pageY - 50)}+#{px}"
    #   #   console.log target
    # callback = (tmpHeight)->
    #   scope.tmpHeight = tmpHeight
  }

const detectWindowDirective = ->
  {
    retrict : \A
    link: (scope, elem, attr) !->
      container = document.getElementById \innersub
      hammertime = new Hammer(container, {drag_max_touches: 0});
      hammertime.on "touch drag", (ev,_scope) !->
        ev.gesture.preventDefault!
      
  }

const bottom-chooseDirective = ->
  {
    retrict : \A
    link: (scope, elem, attr) !->
      container = document.getElementById \bottomChoose__frame
      hammertime = new Hammer(container, {drag_max_touches: 0});
      hammertime.on "swipe drag", (ev,_scope) !->
        ev.gesture.preventDefault!
      
  }

angular.module \socialfight 
  .directive \product productDirective
  .directive \detectwindow  detectWindowDirective
  .directive \bottomChoose bottomChooseDirective 
