
let coordenadas = new Array()
let coordenadas2 = new Array()
var actualPolyline2 
var actualPolyline
async function getData(){
    let data = await fetch('/data')
    if(!data.ok) throw data.status
    data = data.json()
    return data
}
let latitud = 0 ,longitud = 0
let markerArray = new Array()
let markerArray2 = new Array()
setInterval(async ()=>{
    let data = await getData();
    let taxi1Position = data.response[0]
    let taxi2Position = data.response[1]
    let response = setDataIntDoc(taxi1Position)
    coordenadas.push(response)
    if(L.marker!==undefined){
        map.removeLayer(L.marker)
    }
    const actualMarket = new L.marker([response[0],response[1]]).addTo(map)
    response = setDataIntDoc(taxi2Position)
    coordenadas2.push(response)
    const actualMarket2 = new L.marker([response[0],response[1]]).addTo(map)
    markerArray.push(actualMarket)
    markerArray2.push(actualMarket2)
    deleteMarkers(markerArray)
    deleteMarkers(markerArray2)
     map.deletelayer(actualPolyline)
     map.deletelayer(actualPolyline2)
     actualpolyline = new L.polyline(coordenadas).addTo(map);
     actualPolyline2 = new L.polyline(coordenadas2).addTo(map)
    


},4000)
const taxi1 = document.querySelector('#tax1')
taxi1.addEventListener('clic',function(e) {
    e.preventDefault()
    deleteMarkers(actualMarket2)
    deleteMarkers(markerArray2)
    map.deletelayer(actualPolyline2)
})
const taxi2 = document.querySelector('#tax2')
taxi2.addEventListener('clic',function(e) {
    e.preventDefault()
    deleteMarkers(actualMarket)
    deleteMarkers(markerArray)
    map.deletelayer(actualPolyline)
})




function deleteMarkers (markers){
    for (let index = 0; index < markers.length-1; index++) {
        map.removeLayer(markers[index])
    }
    return markers = []
}
function setDataIntDoc(data){
    let timestamp = moment(data.timestamp).utcOffset('+00:00').format('YYYY:MM:DD hh:mm:ss')
    document.getElementById('lat').innerHTML = data.latitud
    document.getElementById('long').innerHTML = data.longitud
    document.getElementById('fecha').innerHTML = timestamp

    return [data.latitud,data.longitud]
}
