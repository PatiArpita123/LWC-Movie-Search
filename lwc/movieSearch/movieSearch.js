import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from "lightning/messageService";
import MOVIE_CHANNEL from "@salesforce/messageChannel/movieChannel__c";

import background from '@salesforce/resourceUrl/movieBackground';
import logo from '@salesforce/resourceUrl/movieLogo';

const DELAY = 300;

export default class MovieSearch extends LightningElement {

    showIntro = true;   // animation screen

     bgImage = background;
    logoImage = logo;


    connectedCallback(){
        setTimeout(() => {
            this.showIntro = false;
        }, 2500);   // animation duration
    }

    selectedTypes="";
    selectedSearch="";
    loading=false;
    delayTimeout;
    selectedPageno="1";
    searchResult=[];
    selectedMovie="";

    @wire(MessageContext)
    messageContext;

   get options(){
    return[
        { label:"None", value:""},
        { label:"Movie", value:"movie"},
        { label:"Series", value:"series"}
    ];
   }

  handleChange(event){
    let {name,value}=event.target;
    this.loading=true;
    if(name==="type"){
        this.selectedTypes=value;
    }
    else if(name==="search"){
    this.selectedSearch = value;

    // when search is cleared (cross button clicked)
   if(!value){
    this.searchResult = [];
    this.selectedMovie = "";
    this.loading = false;

    // clear movie detail component
    const payload = { movieId: "" };
    publish(this.messageContext, MOVIE_CHANNEL, payload);

    return;
}
}
     else if(name==="pageno"){
        this.selectedPageno=value;
    }

    //debouncing
clearTimeout(this.delayTimeout);
this.delayTimeout = setTimeout(() => {
    this.searchMovie();
}, DELAY);
}

//this method will search for the entered movie
async searchMovie() {


    const url = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedTypes}&page=${this.selectedPageno}&apikey=9204ca24`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("Movie Search Output", data);
    console.log("Search =", this.selectedSearch);
console.log("Type =", this.selectedTypes);
console.log("Page =", this.selectedPageno);
    this.loading=false;

    if(data.Response==="True"){
        this.searchResult=data.Search;
    }
}

get displaySearchResult(){
return this.searchResult.length > 0 ? true: false;
}

movieSelectedHandler(event) {
    this.selectedMovie = event.detail;
    
     const payload = { movieId: this.selectedMovie };

    publish(this.messageContext, MOVIE_CHANNEL, payload);
}
    }