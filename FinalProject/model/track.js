export default class Track{
    constructor(track_id, name, url, price, release_date, fk_artist_id, fk_collection_id) {
        this.track_id = track_id;
        this.name = name;
        this.url = url;
        this.price = price;
        this.release_date = release_date;
        this.fk_artist_id = fk_artist_id;
        this.fk_collection_id = fk_collection_id;
    }
}