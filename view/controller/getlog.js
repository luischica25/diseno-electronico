var vetcircle
var markers= new Array
map.on('click',
async function (e) {
if(markers.length>0){

    for(var marker of markers){
     map.removeLayer(marker)
        
    }
}
if(vetcircle){
    map.removeLayer(vetcircle)
}
var points = new Array()
var circle = L.circle(e.latlng, {radius:100})
circle.addTo(map)

vetcircle = circle

var circleCenterPoint = circle.getLatLng(); //gets the circle's center latlng
for(var coord of coords){
    var isInCircleRadius = Math.abs(circleCenterPoint.distanceTo(coord)) <= 100
    if  (isInCircleRadius){
        points.push(coord)
        var marker = L.marker([coord[0], coord[1]]).addTo(map)
        marker.bindPopup('lat: '+coord[0]+' long: '+coord[1]).openPopup();
        markers.push(marker)

    }
}

})
