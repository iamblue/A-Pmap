
# socket = io.connect('http://localhost:8880');
# socket.on 'news', (data) ->
#   console.log(data);
#   socket.emit('my other event', { my: 'data' });
yt = 0



  # yt = 1

angular.module \socialfight 
  # .factory 'clickyutube', ($timeout)->
  #   $timeout ->
  #     yt := yt
  #     console.log yt
  #   ,100
  #   yt  
  .run <[]> ++  ->
    clickyt = (obj) ->
      console.log yt
      yt := 1 
  .factory 'mySocket', ->
    io.connect('http://localhost:8880')  
  # .run 
    # if(window.navigator.geolocation)   
    #   geolocation=window.navigator.geolocation;   
    #   geolocation.getCurrentPosition(getPositionSuccess);   
    # else   
    #   alert("你的瀏覽器不支援地理定位");   
         
  .controller \mainCtrl, <[mySocket $timeout $window $http $scope $rootScope $location $localStorage]> ++ (mySocket, $timeout, $window, $http, $scope, $rootScope, $location, $localStorage) ->
    # http://jsfiddle.net/svigna/pc7Uu/
    # $http.get 'http://localhost:3000/irc/news'
    # .success (d) ->
    #   console.log d
    #   $scope.frommsg = 0
    #   $scope.msg = d.data[0].content[0]
    # $scope.$watch \clickyutube , ->
    #   console.log clickyutube
    #   if clickyutube != 0
    #     alert 4444
    $scope.$on \onmsg , ->
      $scope.inputmsg = !$scope.inputmsg
    $scope.leavemsg = ->
      $scope.$emit \onmsg

    $scope.selectmsgtag = [
      {id:0, name:'求救'},
      {id:1, name:'警方情報'}
    ]
    $scope.selValue = 0

    $timeout ->
      console.log yt
    ,100
    $scope.msg = '讀取消息中...'  
    mySocket.on 'news', (data)->
      console.log(data.g0v);
      if data.g0v
        $scope.msg = data.g0v
        $scope.frommsg = 1
      if data.main
        $scope.msg = data.main
        $scope.frommsg = 0
      $scope.$apply!
      mySocket.emit('my other event', { my: 'data' });
    
    mySocket.on 'sos', (data)->
      # $timeout ->
      #   angular.foreach cities, (v,i,o)->
      #     v.

      ,3000
    styles = [
      {
        featureType:"water",
        stylers:
          [
            {color:\#021019}
          ]
      },
      {
        featureType:'landscape',
        stylers:
          [
            {color:\#08304b}
          ]
      },
      {
        featureType:"poi",
        elementType:"geometry",
        stylers:
          [{color:\#0c4152},{lightness:5}]
      },
      {
        featureType:"road.highway",
        elementType:"geometry.fill",
        stylers:[{color:\#000000}]
      },
      { 
        featureType:"road.highway",
        elementType:"geometry.stroke",
        stylers:
          [
            {color:\#0b434f},
            {lightness:25}
          ]
      },
      
      {
        featureType:"road",
        elementType:"labels.icon",
        stylers:[visibility:'off']
      },
      {
        featureType:"road",
        elementType:"labels.icon",
        stylers:[visibility:'off']
      },
      {
        featureType: "poi",
        elementType:"labels.icon",
        stylers:[visibility:'off']
      },
      {
        featureType:"road.arterial",
        elementType:"geometry.fill",
        stylers:[{color:\#000000}]
      },
      {
        featureType:"road.arterial",
        elementType:"geometry.stroke",
        stylers:
          [{color:\#0b3d51},{lightness:16}]
      },
      {
        featureType:"road.local",
        elementType:"geometry",
        stylers:[{color:\#000000},visibility: "off"]
      },
      { 
        featureType:"road.arterial",
        elementType:"labels.text.fill",
        stylers:[{color:\#999999},{lightness:13}]
      },
      {
        elementType:"labels.text.stroke",
        stylers:[{color:'#eeeeee'},{lightness:13},visibility: "off"]
      },
      {
        featureType:"transit",
        stylers:[{color:\#146474}]
      },
      {
        featureType:"administrative",
        elementType:"geometry.fill",
        stylers:[{color:\#000000}]
      },
      {
        featureType:"administrative",
        elementType:"geometry.stroke",
        stylers:[{color:\#144b53},{lightness:14},{weight:1.4}]
      }
    ]
    styledMap = new google.maps.StyledMapType styles,{name: 'Styled Map'}
    iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
    icons = 
      parking: 
        icon: iconBase + 'parking_lot_maps.png'
      library: 
        icon: iconBase + 'library_maps.png'
      info: 
        icon: iconBase + 'info-i_maps.png'
    
    cities = [
      # {
      #     city : 'Toronto',
      #     desc : 'This is the best city in the world!',
      #     lat : 43.7000,
      #     long : -79.4000
      # },
      {
          city : '青島轉播'
          desc : 'This city is aiiiiite!'
          lat : 25.0441
          long : 121.5210
          icon: icons.parking.icon
          # editable: true
      },
      {
          city : '濟南轉播'
          desc : 'This is the second best city in the world!<a href="" onclick="clickyt(2)">123</a>',
          lat : 25.0430
          long : 121.5203
          icon: icons.parking.icon
      },
      {
          city : '議場轉播'
          desc : 'This city is live!'
          lat : 25.04360
          long : 121.5210
          icon: icons.parking.icon
          editable: true
      },
      # {
      #     city : 'Las Vegas',
      #     desc : 'Sin City...nuff said!',
      #     lat : 25.0435,
      #     long : 121.5210
      #     icon: icons.parking.icon
      # }
    ]

    mapOptions = 
      zoom: 18
      zoomControl: false,
      scaleControl: false,
      center: new google.maps.LatLng(25.0435, 121.5210)
      mapTypeId: google.maps.MapTypeId.TERRAIN
      mapTypeControlOptions: 
        mapTypeIds: [google.maps.MapTypeId.HYBRID, \map_style]
    

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.map.mapTypes.set 'map_style', styledMap
    $scope.map.setMapTypeId 'map_style'
    $scope.markers = []
    
    infoWindow = new google.maps.InfoWindow!
    
    createMarker = (info) !->
      console.log info.lat
      # circleOptions = 
      #   center: new google.maps.LatLng(25.0435, 121.5210)
      #   radius: 250
      #   map: $scope.map
      #   # fillColor: '#dedede'
      #   # fillOpacity: 0
      #   # editable: true
      #   # strokeColor: "#FF0000"
      #   # strokeOpacity: 0.8
      #   # strokeWeight: 2
      #   # fillColor: "#dedede"
      #   # fillOpacity: 0.8
      # circle = new google.maps.Circle(circleOptions);
      
      marker = new google.maps.Marker(
        {
          map: $scope.map
          position: new google.maps.LatLng info.lat, info.long
          title: info.city
          icon:info.icon
        }
      )
      # console.log icons.parking
      marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
      $scope.aaa= 0
      
      google.maps.event.addListener marker, 'click', (e,b)->
        console.log e
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        infoWindow.open $scope.map, marker
      
      google.maps.event.addDomListener $scope.map, 'click', (e,r,y)-> 
        $scope.tagposition = e.latLng
        console.log $scope.tagposition
        $scope.$emit \onmsg
        $scope.$apply!

      # google.maps.event.addListener marker, 'load', !->
      #   # alert('123')
      #   infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      #   infoWindow.open $scope.map, marker
      
      # google.maps.event.addListener window, 'load', !->
      #   # alert('123')
      #   infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      #   infoWindow.open $scope.map, marker

      $scope.markers.push marker
    init = ->
      for i from 0 to cities.length - 1 by 1
        createMarker cities[i]
    init!


    $scope.sendmsg = ->
      # if ($scope.)
      _tmp = {
        lat : $scope.tagposition.k
        long : $scope.tagposition.A
        icon: icons.parking.icon
      }
      cities.push(_tmp)
      init!
      mySocket.emit('sos', { p: $scope.tagposition , icon:1 })
      $scope.$emit \onmsg
      

  