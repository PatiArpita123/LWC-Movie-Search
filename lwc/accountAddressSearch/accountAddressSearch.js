import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import updateAccountAddress from '@salesforce/apex/AccountAddressController.updateAccountAddress';

export default class AccountAddressSearch extends LightningElement {

@api recordId;
map;
marker;
apiLoaded = false;

renderedCallback(){

if(this.apiLoaded){
return;
}

this.apiLoaded = true;

loadScript(
    this,
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyA6F9h2v1s23ZpRI75cpV7ZQYnF9yLszB0&libraries=places'
).then(()=>{

this.initMap();

});

}

initMap(){

const mapDiv = this.template.querySelector('.map');

this.map = new google.maps.Map(mapDiv,{
center:{lat:20.2961,lng:85.8245},
zoom:12
});

this.map.addListener("click",(event)=>{

const lat = event.latLng.lat();
const lng = event.latLng.lng();

this.getAddress(lat,lng);

});

}

handlePinChange(event){

const pin = event.target.value;

const geocoder = new google.maps.Geocoder();

geocoder.geocode({address:pin},(results,status)=>{

if(status === "OK"){

this.map.setCenter(results[0].geometry.location);

}

});

}

getAddress(lat,lng){

const geocoder = new google.maps.Geocoder();

const latlng = {lat:lat,lng:lng};

geocoder.geocode({location:latlng},(results,status)=>{

if(status === "OK"){

let place = results[0];

let street='';
let city='';
let state='';
let postal='';
let country='';

place.address_components.forEach(c=>{

if(c.types.includes("route")){
street=c.long_name;
}

if(c.types.includes("locality")){
city=c.long_name;
}

if(c.types.includes("administrative_area_level_1")){
state=c.long_name;
}

if(c.types.includes("postal_code")){
postal=c.long_name;
}

if(c.types.includes("country")){
country=c.long_name;
}

});

this.saveAddress(street,city,state,postal,country);

}

});

}

saveAddress(street,city,state,postal,country){

updateAccountAddress({

recordId:this.recordId,
street:street,
city:city,
state:state,
postalCode:postal,
country:country

});

}

}