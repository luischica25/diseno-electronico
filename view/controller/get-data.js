
var coordenadas = new Array()
async function getData(){
    var data = await fetch('/data')
    if(!data.ok) throw data.status
    data = data.json()
    return data
}
var latitud = 0 ,longitud = 0
let markerArray = new Array()
setInterval(async ()=>{
    data = await getData();
    response = setDataIntDoc(data.response)
    coordenadas.push(response)
    
    if(L.marker!==undefined){
        map.removeLayer(L.marker)
    }
    const actualMarket = L.marker([response[0],response[1]]).addTo(map)
    markerArray.push(actualMarket)
    deleteMarkers(markerArray)
    var actualpolyline = L.polyline(coordenadas).addTo(map);

},4000)
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
