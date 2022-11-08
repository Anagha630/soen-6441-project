var searchBar = `
    <div class="row">
        <form class="searchbar-form">
            <input class="searchbar" type="text" placeholder="Search Artist.." name="artistSearched">
            <input class="searchbar" type="text" placeholder="Search Track.." name="trackSearched">
            <input class="searchbar" type="text" placeholder="Search Collection.." name="collectionSearched">
            <input class="searchbar" type="text" placeholder="Search Year.." name="yearSearched"> </br></br>
            <button style="margin-left:40px;" type="submit">Search<i class="fa fa-search"></i></button>
        </form>
    </div>
`
document.getElementById("searchBar").innerHTML = searchBar;