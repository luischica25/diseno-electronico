const range = document.querySelector('#range')
var forRange = new Array()
var markers = new Array()
var poliArray1 = new Array()
var poliArray2 = new Array()
var coords1 = new Array()
var coords2 = new Array()

var circondicional = false
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
    circondicional=true
    for(var marker of markers){
        map.removeLayer(marker)   
       }
    
    deletePrev()
    data = await getHistorics()

    data = data.response
    coords1 = []
    coords2 = []
    forRange = []
    poliArray1 = []
    poliArray2 = []
    console.log(data)
    
    for(var coord of data){
       if(coord.ntaxi==1){
        coords1.push([coord.latitud,coord.longitud,coord.timestamp])    
       }
       if(coord.ntaxi==2){
        coords2.push([coord.latitud,coord.longitud,coord.timestamp])
       }
    
    }
    var polyline1 = L.polyline(coords1).addTo(map);
    polyline1.options.color = red
    poliArray1.push(polyline1)

    var polyline2 = L.polyline(coords2).addTo(map);
    poliArray2.push(polyline2)

}

function deletePrev(){
    for(var poly of poliArray1){
        map.removeLayer(poly)
    }
    for(var pol of poliArray2){
        map.removeLayer(pol)
    }
}
