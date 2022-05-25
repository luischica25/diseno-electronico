var vetcircle
var markers = new Array() 
var points = new Array()
var points1 = new Array()
var taxiselector = 1
var actualrpm
//Eso está malo
//Not responding
map.on('click',
async function (e) {
    actualrpm =[]
    points=[]
    points1=[]
    if(vetcircle){
    map.removeLayer(vetcircle)
    }
    
    if(markers.length > 0){
        for(var marker of markers){
            map.removeLayer(marker)
        }
    }

    
    var circle = L.circle(e.latlng, {radius:200})
    if(circondicional){
    circle.addTo(map)}
    vetcircle = circle
   console.log(coords1a)    
   console.log(coords1)
    if(taxiselector==1){
        
        var circleCenterPoint = circle.getLatLng(); //gets the circle's center latlng
        var corar
        for(var coord of coords1a){
        corar=([coord[0],coord[1],coord[2]])
         var isInCircleRadius = Math.abs(circleCenterPoint.distanceTo(corar)) <= 200
            if  (isInCircleRadius){ 
            points.push(coord)
            }      
        }
       
        slider  .max = points.length - 1
   
    }
    if(taxiselector==2){
        
        
        var circleCenterPoint = circle.getLatLng(); //gets the circle's center latlng
        var corar
        for(var coord of coords2a){
            corar=([coord[0],coord[1],coord[2]])
           coordarreglo = coord.getLatLng();
         var isInCircleRadius = Math.abs(circleCenterPoint.distanceTo(corar)) <= 200
            if  (isInCircleRadius){ 
            points.push(coord)
            }      
        }
       
        slider  .max = points.length - 1
       
    }
    
})

const taxiH = document.getElementById('taxisH')
taxiH.addEventListener('change', (e) =>{
    e.preventDefault()

     switch (e.target.value) {
        case 'taxi1H':
            taxiselector = 1          
            break; 
        case 'taxi2H':
            taxiselector = 2

            break; 
        default:
            taxiselector = 2
    }

    
})

async function vectormarket(){
        console.log(coords1)
    if(markers.length > 0){
        for(var marker of markers){
            map.removeLayer(marker)
        }
    }
    
    const value = points[slider.value]
    const marker2 =L.marker([value[0],value[1]]).addTo(map)
    fechapoint = moment(value[2]).format('YYYY:MM:DD HH:mm:ss')
    marker2.bindPopup("fecha: "+fechapoint+ " RPM: "+(value[3])).openPopup();
    markers.push(marker2)


}
