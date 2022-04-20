const range = document.querySelector('#range')
var forRange = new Array()
var markers = new Array()
var poliArray = new Array()
var coords = new Array()
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
        
        coords.push([coord.latitud,coord.longitud])
        forRange.push(coord)
    }
    var polyline = L.polyline(coords).addTo(map);
    poliArray.push(polyline)
}

function deletePrev(){
    for(var poly of poliArray){
        map.removeLayer(poly)
    }
}