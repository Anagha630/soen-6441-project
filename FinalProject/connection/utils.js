var user_name="";

export function displayGrid(data,price){
    var itemNumber=0
    var trackGridItem = data.map((ele)=>{
        var query_param = Object.keys(ele)[0]=="collection_id" ? "collection_id="+ele.collection_id 
                            : Object.keys(ele)[0]=="track_id" ? "track_id="+ele.track_id 
                            : "artist_id="+ele.artist_id
        return `
            <div id="grid-item">
                <img class="grid-image" src="${ele.image}" href="#"></img>
                <h4 class="grid-text">${ele.name}</h4>
                <a class="first-link" href="/placeOrders?${query_param}">Order</a>
                <a class="second-link" href="/tracks?${query_param}">View</a>
                <a class="third-link" href="/deleteOrder?${query_param}">Delete</a>
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
        document.getElementById("total").innerHTML=${price}
    </script>
    `
}

export function displayList(data){
    var wishList = data.map((ele)=>{
        return `
        <div id="list-row">
            <div class="list-item">
                <img class="list-image" src="${ele.image}"></img>
                <h3>${ele.name}</h3>
            </div>
            <div class="list-item">
                <h1 class="price">$${ele.price}</h1>
                <a class="add" href="/addOrder?track_id=${ele.track_id}">Add</a>
            </div>
        </div>
        `
    })
    return `
    <a href="/orders" id="first-link">View Orders</a>
    <a href="/" id="second-link">Cancel</a>
    <script>
        var username = prompt("Enter your name:")
        document.getElementById("wishList").innerHTML=\`${wishList}\`
        Array.from(document.getElementsByClassName("add")).map((link)=>{
            return link.href+="&username="+username
        })
        document.getElementById("first-link").href+="?username="+username
    </script>
    `
}
