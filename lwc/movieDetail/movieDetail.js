import { LightningElement, wire } from "lwc";

// Import message service features required for subscribing and the message channel
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from "lightning/messageService";

import MOVIE_CHANNEL from "@salesforce/messageChannel/movieChannel__c";

export default class MovieDetail extends LightningElement {

    subscription = null;
    loadComponent = false;
    movieDetails = {};

    @wire(MessageContext)
    messageContext;

    // Standard lifecycle hooks used to subscribe and unsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

     disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                MOVIE_CHANNEL,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    handleMessage(message) {
        let movieId = message.movieId;
        console.log("movieId", movieId);
        this.fetchMovieDetail(movieId);
    }



    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

 async fetchMovieDetail(movieId) {

    // if movieId is empty → hide component
    if(!movieId){
        this.loadComponent = false;
        this.movieDetails = {};
        return;
    }

    this.loadComponent = true;

    let url = `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=9204ca24`;

    const res = await fetch(url);
    const data = await res.json();

    this.movieDetails = data;
}

openTrailer() {
    const title = this.movieDetails.Title;

    const url =
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(title + " trailer");

    window.open(url, "_blank");
}

}