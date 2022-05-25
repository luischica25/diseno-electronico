let coordenadas = new Array()
let coordenadas2 = new Array()
var actualPolyline2 
var actualPolyline
var actualMarket
var actualMarket2

async function getData(){
    let data = await fetch('/data')
    if(!data.ok) {throw data.status}
    //data = await data.json()
    return await data.json()
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
    
    if (actualMarket) {actualMarket.setLatLng([taxi1Position.latitud,taxi1Position.longitud])
        actualMarket.bindPopup("date: "+ moment(taxi1Position.timestamp).format('YYYY:MM:DD HH:mm:ss')+ " RPM: "+taxi1Position.rpm)
    }
    else{
        actualMarket = L.marker([taxi1Position.latitud,taxi1Position.longitud])
        actualMarket.bindPopup("date: "+ moment(taxi1Position.timestamp).format('YYYY:MM:DD HH:mm:ss')+ " RPM: "+taxi1Position.rpm)
        actualMarket.addTo(map)
    }

    if (actualMarket2) {actualMarket2.setLatLng([taxi2Position.latitud,taxi2Position.longitud])
        actualMarket2.bindPopup("date: "+ moment(taxi2Position.timestamp).format('YYYY:MM:DD HH:mm:ss')+ " RPM: "+taxi2Position.rpm)
    }
    else{
        actualMarket2 = L.marker([taxi2Position.latitud,taxi2Position.longitud])
        actualMarket2.bindPopup("date: "+ moment(taxi2Position.timestamp).format('YYYY:MM:DD HH:mm:ss')+ " RPM: "+taxi2Position.rpm)
        actualMarket2.addTo(map)
    }

    response2 = setDataIntDoc(taxi2Position)
    coordenadas2.push(response2)
    if(actualPolyline) actualPolyline.setLatLngs(coordenadas)
    else {
        actualPolyline = L.polyline(coordenadas)
        actualPolyline.addTo(map)
    }
    if(actualPolyline2) actualPolyline2.setLatLngs(coordenadas2)
    else {
        actualPolyline2 = L.polyline(coordenadas2)
        actualPolyline2.setStyle({  
            color: 'red'
        });
        actualPolyline2.addTo(map)
    }
},4000)

const taxis = document.getElementById('taxis')
taxis.addEventListener('change', (e) =>{
    e.preventDefault()
    switch(e.target.value){
        case 'taxi1':
            actualMarket2.setOpacity(0)
            actualMarket.setOpacity(1)
            actualPolyline.setStyle({opacity: 1})
            actualPolyline2.setStyle({opacity: 0})

            
            break;
        case 'taxi2':
            actualMarket.setOpacity(0)
            actualMarket2.setOpacity(1)
            actualPolyline.setStyle({opacity: 0})
            actualPolyline2.setStyle({opacity: 1})
            break;
        case 'ambos':
            actualMarket.setOpacity(1)
            actualMarket2.setOpacity(1)  
            actualPolyline.setStyle({opacity: 1})
            actualPolyline2.setStyle({opacity: 1}) 
            break;  

        default :
            actualMarket.setOpacity(1)
            actualMarket2.setOpacity(1)  
            actualPolyline.setStyle({opacity: 1})
            actualPolyline2.setStyle({opacity: 1}) 
    }
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
