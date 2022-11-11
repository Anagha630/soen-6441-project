export default class Track{
    constructor(track_id, name, price, release_date, image, fk_artist_id, fk_collection_id) {
        this.track_id = track_id;
        this.name = name;
        this.price = price;
        this.release_date = release_date;
        this.image = image;
        this.fk_artist_id = fk_artist_id;
        this.fk_collection_id = fk_collection_id;
    }
}