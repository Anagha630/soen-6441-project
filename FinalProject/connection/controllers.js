import {executeQuery} from '../model/dbconnection.js';
import Collection from '../model/collection.js';
import Track from '../model/track.js';
import Artist from '../model/artist.js'

export default class Controllers {
    constructor(){
        this.singleTrack = {};
        this.collectionList = [];
        this.trackList = [];
        this.artistList = [];
    }
    async getUserId(username){
        const userid = await executeQuery(`SELECT user_id FROM user WHERE name="${username}";`);
        return new Promise((resolve, reject) => resolve(userid));
    }
    async getCollection() {
        const collectionResults = await executeQuery("SELECT * FROM collection;");
        collectionResults.forEach((collection)=> this.collectionList.push(new Collection(collection.collection_id,collection.name,collection.view_url,collection.price,collection.image)))
        return new Promise((resolve, reject) => resolve(this.collectionList));
    }

    async getArtist() {
        const artistResults = await executeQuery("SELECT * FROM artist;");
        artistResults.forEach((artist)=> this.artistList.push(new Artist(artist.artist_id,artist.name,artist.image)))
        return new Promise((resolve, reject) => resolve(this.artistList));
    }

    async getTracksByParams(queryString) {
        const trackResults = await executeQuery(queryString);
        trackResults.forEach((track)=> this.trackList.push(new Track(track.track_id,track.name,track.price,track.release_date,track.image,track.artist_id,track.collection_id)));
        return new Promise((resolve,reject) => resolve(this.trackList));
    }
    
    async addTrackToOrders(track_id, username) {
        const userid = await executeQuery(`SELECT user_id from user WHERE name="${username}";`)
        var message="fail"
        const userOrderResults = await executeQuery("SELECT * FROM orders WHERE fk_track_id="+track_id+" AND fk_user_id="+userid[0].user_id+";")
        if(userOrderResults.length==0){
            await executeQuery("INSERT into orders(fk_track_id,fk_user_id) VALUES ("+track_id+","+userid[0].user_id+");")
            message="success"
        } 
        return new Promise((resolve, reject) => resolve(message));
    }

    async getAllOrders(username){
        const userid = await executeQuery(`SELECT user_id from user WHERE name="${username}";`)
        const userOrderResults = await executeQuery("SELECT * FROM track INNER JOIN orders ON track.track_id=orders.fk_track_id WHERE orders.fk_user_id=" + userid[0].user_id + ";")
        userOrderResults.forEach((track)=> this.trackList.push(new Track(track.track_id,track.name,track.price,track.release_date,track.image,track.artist_id,track.collection_id)))
        var totalPrice = this.trackList.map((ele)=> parseFloat(ele.price)).reduce((acc,ele)=> acc+ele).toFixed(2)
        return new Promise((resolve, reject) => resolve([this.trackList,totalPrice]));
    }

    async deleteFromOrder(track_id){
        var message="fail"
        var results = await executeQuery("DELETE from orders WHERE fk_track_id=" + track_id + ";")
        if(results.affectedRows==1) message="success"
        return new Promise((resolve, reject) => resolve(message));
    }
}