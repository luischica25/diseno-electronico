var vetcircle
var markers = new Array() 
var points = new Array()
//Eso está malo
//Not responding
map.on('click',
async function (e) {
    points=[]
    if(vetcircle){
    map.removeLayer(vetcircle)
    }
    if(markers.length > 0){
        for(var marker of markers){
            map.removeLayer(marker)
        }
    }

    
    var circle = L.circle(e.latlng, {radius:95})
    if(circondicional){
    circle.addTo(map)}
    
    
    vetcircle = circle

    var circleCenterPoint = circle.getLatLng(); //gets the circle's center latlng
    for(var coord of coords){
    var isInCircleRadius = Math.abs(circleCenterPoint.distanceTo(coord)) <= 95
        if  (isInCircleRadius){ 
            points.push(coord)
        }      
    }
    slider.max = points.length - 1
})

async function vectormarket(){
    if(markers.length > 0){
        for(var marker of markers){
            map.removeLayer(marker)
        }
    }
    console.log(points)
    const value = points[slider.value]
    const marker2 =L.marker([value[0],value[1]]).addTo(map)
    fechapoint = moment(value[2]).format('YYYY:MM:DD HH:mm:ss')
    marker2.bindPopup("fecha: "+fechapoint).openPopup();
    markers.push(marker2)


}
