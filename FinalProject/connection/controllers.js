import {executeQuery} from './dbconnection.js';
import Collection from '../model/collection.js';
import Track from '../model/track.js';
import Artist from '../model/artist.js';

export default class Controllers {
    constructor(){
        this.collectionList = [];
        this.trackList = [];
        this.artistList = [];
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
    // async getTracksOfCollection(collection_id) {
    //     const tracksOfCollectionResults = await executeQuery("SELECT * FROM track WHERE ")
    // }

    // // getting a single todo
    // async getTodo(id) {
    //     return new Promise((resolve, reject) => {
    //         // get the todo
    //         let todo = data.find((todo) => todo.id === parseInt(id));
    //         if (todo) {
    //             // return the todo
    //             resolve(todo);
    //         } else {
    //             // return an error
    //             reject(`Todo with id ${id} not found `);
    //         }
    //     });
    // }

    // // creating a todo
    // async createTodo(todo) {
    //     return new Promise((resolve, _) => {
    //         // create a todo, with random id and data sent
    //         let newTodo = {
    //             id: Math.floor(4 + Math.random() * 10),
    //             ...todo,
    //         };

    //         // return the new created todo
    //         resolve(newTodo);
    //     });
    // }

    // // updating a todo
    // async updateTodo(id) {
    //     return new Promise((resolve, reject) => {
    //         // get the todo.
    //         let todo = data.find((todo) => todo.id === parseInt(id));
    //         // if no todo, return an error
    //         if (!todo) {
    //             reject(`No todo with id ${id} found`);
    //         }
    //         //else, update it by setting completed to true
    //         todo["completed"] = true;
    //         // return the updated todo
    //         resolve(todo);
    //     });
    // }

    // // deleting a todo
    // async deleteTodo(id) {
    //     return new Promise((resolve, reject) => {
    //         // get the todo
    //         let todo = data.find((todo) => todo.id === parseInt(id));
    //         // if no todo, return an error
    //         if (!todo) {
    //             reject(`No todo with id ${id} found`);
    //         }
    //         // else, return a success message
    //         resolve(`Todo deleted successfully`);
    //     });
    // }
}