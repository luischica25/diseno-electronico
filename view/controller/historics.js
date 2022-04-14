const range = document.querySelector('#range')
var forRange = new Array()
var markers = new Array()
var poliArray = new Array()
range.value = 0
var coords = new Array()
var popup = L.popup()
    
const histLat = document.querySelector('.latitud')
const histLng = document.querySelector('.longitud')
const histTs = document.querySelector('.timestamp')




async function getHistorics(){
    let idate = document.getElementById('finicial').value
    let fdate = document.getElementById('ffinal').value
    
    
    var data = await fetch('/historicos',{
        headers:{
            "Content-Type": "application/json"
        },
        method:'POST',
        body: JSON.stringify({
            finicial: idate,
            ffinal: fdate
        })

    })
    return data = data.json()

        
}




navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { coords } = pos
      const { latitude, longitude } = coords
      L.marker([latitude, longitude], { icon: iconMarker }).addTo(myMap)

   
async function drawHistorics(){                                                                                                                                                                                                                      


    deletePrev()
    data = await getHistorics()
    console.log("data: ", data)
    console.log("data: ", data.response)
    data = data.response
    coords = []
    forRange = []
    poliArray = []
    markers = []

    for(var coord of data){
        var marker = L.marker([coord.latitud, coord.longitud]).addTo(map)
        coords.push([coord.latitud,coord.longitud])
        forRange.push(coord)
        markers.push(marker)
    }
    var polyline = L.polyline(coords).addTo(map);
    poliArray.push(polyline)
    polyline= L.polyline(poliArray,{color:'red'})
    map.addLayer(PolyLine);
    setRange()
}

function setRange(){
    range.max = forRange.length
    range.addEventListener('change', function(e){
        const index = this.value
        const data = forRange[index]

        histLat.innerHTML = data.latitud
        histLng.innerHTML = data.longitud
        histTs.innerHTML = data.timestamp
    })
}

function deletePrev(){
    for(var marker of markers){
        map.removeLayer(marker)
    }

    for(var poly of poliArray){
        map.removeLayer(poly)
    }
}

}