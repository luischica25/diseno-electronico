
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
    data = await getHistorics()
    data = data.response
    coords = new Array()
     
    for(coord of data){
        L.marker([coord.latitud, coord.longitud]).addTo(map)
        coords.push([coord.latitud,coord.longitud])
        
    }
    var polyline = L.polyline(coords).addTo(map);
}
