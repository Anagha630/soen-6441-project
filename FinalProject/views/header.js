var header = `
<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>

<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <img class="navbar-brand" src="https://media.istockphoto.com/photos/rendering-yellow-headphones-isolated-on-yellow-background-picture-id979017326?k=20&m=979017326&s=170667a&w=0&h=IAd_-4uxwT0CqHf9ibHBFuf27YQOcHqgHuehXGBEsLE=" href="#"></img>
        </div>
        <ul class="nav navbar-nav">
            <li><a href="#">Home</a></li>
            <li><a href="#">Explore</a></li>
            <li><a href="#">My Orders</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li><a href="#"><span class="glyphicon glyphicon-user"></span> Anagha</a></li>
            <li><a href="./login.html"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
    </ul>
    </div>
</nav>
 
</body>
</html>
`
document.getElementById("header").innerHTML = header;
