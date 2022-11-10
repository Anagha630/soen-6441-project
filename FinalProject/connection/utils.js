export function displayCollection(data){
    var itemNumber=0
    var trackGridItem = data.map((ele)=>{
        return `
            <div id="grid-item">
                <img class="grid-image" src="${ele.image}" href="#"></img>
                <h4 class="grid-text">${ele.name}</h4>
                <a href="/orders.html" class="first-link">Order</a>
                <a href="/tracks.html" class="second-ink" href='/tracks?collection_id=${ele.collection_id}'}>View</a>
            </div>
        `
    })
    var track_grid = trackGridItem.reduce((acc, eachtrackGridItem)=>{
        if(itemNumber<4){
            itemNumber+=1
            return acc+eachtrackGridItem
        }
        else{
            itemNumber=0
            return acc+"</div> \n <div class='grid-row'>"+eachtrackGridItem
        }
    },"<div class='grid-row'>")
    return `
    <script>
        document.getElementById("track_grid").innerHTML=\`${track_grid}\`
    </script>
    `
}

export function tracksOfCollection(collection_id){
    console.log(collection_id)
    return collection_id
}