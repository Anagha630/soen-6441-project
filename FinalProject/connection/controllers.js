import {executeQuery} from './dbconnection.js';
import Collection from '../model/collection.js';

export default class Controllers {
    constructor(){
        this.collectionList = [];
        //this.trackOfCollectionList = [];
    }
    async getCollection() {
        const collectionResults = await executeQuery("SELECT * FROM collection;");
        collectionResults.forEach((collection)=> this.collectionList.push(new Collection(collection.collection_id,collection.name,collection.view_url,collection.price,collection.image)))
        return new Promise((resolve, reject) => resolve(this.collectionList));
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