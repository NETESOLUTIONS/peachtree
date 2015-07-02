(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('choroMap', choroMap);

    /* @ngInject */
    function choroMap() {
        //Usage:
        //<choroMap id="map" dataSource="dataFromController"></choroMap>
        // Creates:
        var directive = {
            restrict: 'E',
            replace: true,
            template: '<div></div>',
            link: link
        };
        return directive;
        
        function link(scope, element, attrs) {
            //Default settings for the map
            var map = L.map(attrs.id, {
                center: [40, -86],
                zoom: 10
            });
            //create Map Tile layer and add to the map
            L.tileLayer('http://{s}.tile.cloudmade.com/57cbb6ca8cac418dbb1a402586df4528/997/256/{z}/{x}/{y}.png', {
                maxZoom: 18
            }).addTo(map);
            
            //add markers dynamically
            var points = [{lat: 40, lng: -86},{lat: 40.1, lng: -86.2}];
            updatePoints(points);
            
            function updatePoints(pts) {
               for (var p in pts) {
                  L.marker([pts[p].lat, pts[p].lng]).addTo(map);
               }
            }//End of points functioni
            
            //add a watch on the scope to update your points.
            // whatever scope property that is passed into
            // the poinsource="" attribute will now update the points
            scope.$watch(attr.pointsource, function(value) {
               updatePoints(value);
            });
          }//End Link Function
    }
})();
