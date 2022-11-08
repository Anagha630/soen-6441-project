import collectionList from "../connection/app.js"

var gridList = `JSON ${collectionList}`
console.log(collectionList)
// var itemNumber = 0;
// var trackGridItem = json.results.map((ele)=>{
//     if(ele.wrapperType=="track"){
//         return `
//             <div id="grid-item">
//                 <img class="grid-image" src="${ele.artworkUrl100}" href="#"></img>
//                 <h3 class="grid-text">${ele.trackName}</h3>
//                 <a href="/orders.html">Order</a>
//                 <a href="/tracks.html" class="second-link">View</a>
//             </div>
//         `
//     }
// })
// var track_grid = trackGridItem.reduce((acc, eachtrackGridItem)=>{
//     if(itemNumber<4){
//         itemNumber+=1
//         return acc+eachtrackGridItem
//     }
//     else{
//         itemNumber=0
//         return acc+"</div> \n <div class='grid-row'>"
//     }
// },"<div class='grid-row'>")


document.getElementById("track_grid").innerHTML=gridList;