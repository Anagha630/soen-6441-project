export default class Track {
    constructor(track_id, name, view_url, price, release_date, image, artist_id, collection_id) {
        this.track_id = track_id;
        this.name = name;
        this.view_url = view_url;
        this.price = price;
        this.release_date = release_date;
        this.image = image;
        this.artist_id = artist_id;
        this.collection_id = collection_id;
    }
}