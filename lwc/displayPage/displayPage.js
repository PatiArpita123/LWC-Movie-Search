import { LightningElement, api } from 'lwc';
export default class DisplayPage extends LightningElement {

   @api movie;
    @api selectedMovieId;

    clickHandler(event) {
        console.log(this.movie.imdbID);

        // 1. create the event
        const evt = new CustomEvent("selectedmovie", {
            detail: this.movie.imdbID
        });

        // 2. dispatch event
        this.dispatchEvent(evt);
    }

    get displaySelected() {
        return this.selectedMovieId === this.movie.imdbID
            ? "selected"
            : "display";
    }
}