import {executeQuery} from './dbconnection.js';
import Collection from '../model/collection.js';
import Track from '../model/track.js';

export default class Controllers {
    constructor(){
        this.collectionList = [];
        this.trackList = [];
        //this.trackOfCollectionList = [];
    }
    async getCollection() {
        const collectionResults = await executeQuery("SELECT * FROM collection;");
        collectionResults.forEach((collection)=> this.collectionList.push(new Collection(collection.collection_id,collection.name,collection.view_url,collection.price,collection.image)))
        return new Promise((resolve, reject) => resolve(this.collectionList));
    }

    async getAllTracks() {
        const trackResults = await executeQuery("SELECT * FROM track;");
        trackResults.forEach((track)=> this.trackList.push(new Track(track.track_id,track.name,track.view_url,track.price,track.release_date,track.image,track.artist_id,track.collection_id)))
        return new Promise((resolve, reject) => resolve(this.trackList));
    }

    async getArtist() {
        const artistResults = await executeQuery("SELECT * FROM artist;");
        artistResults.forEach((artist)=> this.artistList.push(new Artist(artist.artist_id,artist.name,artist.view_url,artist.image)))
        return new Promise((resolve, reject) => resolve(this.artistList));
    }
    async getTracksByParams(queryString) {
        const trackResults = await executeQuery(queryString);
        trackResults.forEach((track)=> this.trackList.push(new Track(track.track_id,track.name,track.url,track.price,track.release_date,track.image,track.artist_id,track.collection_id)));
        return new Promise((resolve,reject) => resolve(this.trackList));
    }
    
}