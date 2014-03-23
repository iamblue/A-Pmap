
# socket = io.connect('http://localhost:8880');
# socket.on 'news', (data) ->
#   console.log(data);
#   socket.emit('my other event', { my: 'data' });

angular.module \socialfight 
  # .config(function (socketProvider) {
  #   socketProvider.prefix('foo~');
  #   socketProvider.ioSocket(io.connect('/some/path'))
  .factory 'mySocket', ->
    io.connect('http://localhost:8880')
    
  .controller \mainCtrl, <[mySocket $timeout $window $http $scope $rootScope $location $localStorage]> ++ (mySocket, $timeout, $window, $http, $scope, $rootScope, $location, $localStorage) ->
    # http://jsfiddle.net/svigna/pc7Uu/
    mySocket.on 'news', (data)->
      # $scope.bar = true;
      console.log(data);
      mySocket.emit('my other event', { my: 'data' });
    $scope.kerker = ->
      alert \12333
    
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
          desc : 'This is the second best city in the world!<a ng-click="kerker(123)">123</a>',
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
      center: new google.maps.LatLng(25.0435, 121.5210)
      mapTypeId: google.maps.MapTypeId.TERRAIN
      mapTypeControlOptions: 
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, \map_style]
    

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
        # console.log(e)
        # console.log b
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        infoWindow.open $scope.map, marker
        # $scope.kerker()
        


      # google.maps.event.addListener marker, 'load', !->
      #   # alert('123')
      #   infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      #   infoWindow.open $scope.map, marker
      
      # google.maps.event.addListener window, 'load', !->
      #   # alert('123')
      #   infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      #   infoWindow.open $scope.map, marker

      $scope.markers.push marker
  
    for i from 0 to cities.length - 1 by 1
      createMarker cities[i]
    
    # $scope.openInfoWindow = (e, selectedMarker)!->
    #   console.log 8888
    #   e.preventDefault();
    #   google.maps.event.trigger(selectedMarker, 'click');
    
    