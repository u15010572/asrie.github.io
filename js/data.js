window.addEventListener("load", function () {

//localStorage.clear();
var row = document.getElementById("row");
var modalheading = document.getElementById("exampleModalLabel");
var modalbody = document.getElementById("modal-body");
var Tbody = document.getElementById("tableBody");
var totalcost = document.getElementById("totalcost");
var deletebtns = document.getElementsByClassName("deletebtn");
var addbtns = document.getElementsByClassName("addbtn");
var subtractbtns = document.getElementsByClassName("subtractbtn");

//Onload from storage
var cartNumber = document.getElementById("cartNumber");
if(localStorage.getItem("numberInCart")){
cartNumber.innerHTML = localStorage.getItem("numberInCart");
}
let movies = [ 
    { 
        id: 0, 
        title: "Strangers on a Train", 
        director: "Alfred Hitchcock", 
        runtime: "1h41m", 
        release_year: "1951",
        description: "A psychopath forces a tennis star to comply with his theory that two strangers can get away with murder.", 
        poster_url: "assets/strangersonatrain.jpg", 
        cinema_number: 1, 
        ticket_price: 180, 
        tickets_in_cart: 0
    },
    { 
        id: 1, 
        title: "The Wrong Man", 
        director: "Alfred Hitchcock", 
        runtime: "1h45m", 
        release_year: 1956,
        description: "In 1953, an innocent man named Christopher Emanuel 'Manny' Balestrero is arrested after being mistaken for an armed robber.", 
        poster_url: "assets/thewrongman.jpg", 
        cinema_number: 2, 
        ticket_price: 180, 
        tickets_in_cart: 0
    },
    { 
        id: 2, 
        title: "Touch of Evil", 
        director: "Orson Welles", 
        runtime: "1h35m", 
        release_year: 1958,
        description: "A stark, perverse story of murder, kidnapping, and police corruption in a Mexican border town.", 
        poster_url: "assets/touchofevil.jpg", 
        cinema_number: 3, 
        ticket_price: 180, 
        tickets_in_cart: 0
    },
    { 
        id: 3, 
        title: "Witness for the Protection", 
        director: "Billy Wilder", 
        runtime: "1h56m", 
        release_year: 1957,
        description: "A veteran British barrister must defend his client in a murder trial that has surprise after surprise.", 
        poster_url: "assets/witness.jpg", 
        cinema_number: 4, 
        ticket_price: 180, 
        tickets_in_cart: 0
    }

];


for(i=0; i<movies.length; i++){
if(row != null){
row.innerHTML += '<div class="col-sm-3"><div class="card"><div class="card-header">Cinema '
                + movies[i].cinema_number
                +'</div><img src="'
                +movies[i].poster_url
                +'" class="card-img"><div class="card-body"><h4>'
                +movies[i].title
                +'</h4><p>'
                +movies[i].description
                +'</p><h6>R'
                +movies[i].ticket_price
                +'</h6></div><div class="card-footer"><button type="button" id="'
                +i
                +'" class="btn-block" data-toggle="modal" data-target="#details">Show Details</button><br/><button type="button" class="btn-primary" id="'
                +i
                +'">Book Ticket</button>';


               
}
}

var detailbtns = document.getElementsByClassName("btn-block");
for(i=0; i<detailbtns.length; i++){
    detailbtns[i].addEventListener("click", changeModal);
}

function changeModal(){

    var ID = this.getAttribute('id');
    modalheading.innerHTML = movies[ID].title ;
    modalbody.innerHTML = 'Title: '+ movies[ID].title 
                           + '<br/>Director: '+ movies[ID].director
                           +'<br/>Release Year: ' + movies[ID].release_year
                           + '<br/>Runtime: ' + movies[ID].runtime;      
}




//local storage



//add movies to cart
var bookbtns = document.getElementsByClassName("btn-primary");

for(i=0; i<bookbtns.length; i++){
    bookbtns[i].addEventListener("click", addToCart);
}

function addToCart(){
    var ID = this.getAttribute('id');
    if("numberInCart" in localStorage){
    var total = parseInt(localStorage.getItem("numberInCart"));
    total +=1;
    localStorage.setItem("numberInCart", total);
    cartNumber.innerHTML = total; 
    }
    else{
        localStorage.setItem("numberInCart", "1");
        cartNumber.innerHTML = 1;
    }
    
    if("moviesInCart" in localStorage){

    let moviesInCart = JSON.parse(localStorage.getItem("moviesInCart"));
    var result = moviesInCart.find(moviesInCart => moviesInCart.id == ID);
    
    if(result==null){
        movies[ID].tickets_in_cart +=1;
       moviesInCart.push(movies[ID]);
       localStorage.setItem("moviesInCart", JSON.stringify(moviesInCart));
       
    }
    else{
        moviesInCart.find(moviesInCart => moviesInCart.id == ID).tickets_in_cart +=1;
        localStorage.setItem("moviesInCart", JSON.stringify(moviesInCart));
    }
    
   }
   else{
        movies[ID].tickets_in_cart +=1;
       let moviesInCart = [];
       moviesInCart.push(movies[ID]);
       localStorage.setItem("moviesInCart", JSON.stringify(moviesInCart));
   }
   
   console.log(localStorage.getItem("moviesInCart"));

}

//cart table display
if(Tbody!=null){
displayTable();
function displayTable(){
    var cost =0;
    Tbody.innerHTML = "";
    if("moviesInCart" in localStorage){
        let moviesInCart = JSON.parse(localStorage.getItem("moviesInCart"));
        
        for(i=0; i<moviesInCart.length; i++){
        Tbody.innerHTML += '<tr><td class="deletebtn" id="'
                        +  i
                        + '"><i class="fa fa-trash" aria-hidden="true"></i></td><td>'
                        + moviesInCart[i].title
                        +'</td><td>R'
                        + moviesInCart[i].ticket_price
                        +'</td><td class="subtractbtn" id="'
                        + i
                        +'"><i class="fa fa-minus" aria-hidden="true"></i></td><td>'
                        +moviesInCart[i].tickets_in_cart
                        +'</td><td class="addbtn" id="'
                        + i
                        +'"><i class="fa fa-plus" aria-hidden="true"></i></td><td>R'
                        + (moviesInCart[i].ticket_price*moviesInCart[i].tickets_in_cart)
                        +'</td></tr>';
        
            cost += (moviesInCart[i].ticket_price*moviesInCart[i].tickets_in_cart);
            totalcost.innerHTML = 'R'+cost;
            
            
    
        }
        
    }
    else{
        Tbody.innerHTML = '<tr><td colspan="7"> There are no movies in your cart</td></tr>';
        totalcost.innerHTML = 'R0';
    }
    if(cost==0){
        Tbody.innerHTML = '<tr><td colspan="7"> There are no movies in your cart</td></tr>';
        totalcost.innerHTML = 'R0';
    }
    addAllEventListeners()
    

    
    
}

function addAllEventListeners(){
            deletebtns = document.getElementsByClassName("deletebtn");
            for(i=0; i<deletebtns.length; i++){
            deletebtns[i].addEventListener("click", deleteMovie);}

            addbtns = document.getElementsByClassName("addbtn");
            for(i=0; i<addbtns.length; i++){
                addbtns[i].addEventListener("click", incrMovie);}
            subtractbtns = document.getElementsByClassName("subtractbtn");
            for(i=0; i<subtractbtns.length; i++){
                subtractbtns[i].addEventListener("click", decrMovie);}
}


function deleteMovie(){
        var ID = this.getAttribute('id');
        

        let moviesInCart = JSON.parse(localStorage.getItem("moviesInCart"));
       
            
        var subtractNum = moviesInCart[ID].tickets_in_cart;
        var total = parseInt(localStorage.getItem("numberInCart"));
        total =total - subtractNum;
        localStorage.setItem("numberInCart", total);
        cartNumber.innerHTML = localStorage.getItem("numberInCart");
        
        
        moviesInCart.splice(ID, 1);
        localStorage.setItem("moviesInCart", JSON.stringify(moviesInCart));
        displayTable();

        
        
 }

function incrMovie(){
    var ID = this.getAttribute('id');
    let moviesInCart = JSON.parse(localStorage.getItem("moviesInCart"));
    var qty = moviesInCart[ID].tickets_in_cart;
    qty+=1;
    moviesInCart[ID].tickets_in_cart=qty;
    localStorage.setItem("moviesInCart", JSON.stringify(moviesInCart));
    
    var total = parseInt(localStorage.getItem("numberInCart"));
    total+=1;
    localStorage.setItem("numberInCart", total);
    cartNumber.innerHTML = localStorage.getItem("numberInCart");
    displayTable();
    
}
function decrMovie(){
    var total = parseInt(localStorage.getItem("numberInCart"));
    total-=1;
    localStorage.setItem("numberInCart", total);
    cartNumber.innerHTML = localStorage.getItem("numberInCart");
    
    var ID = this.getAttribute('id');
    let moviesInCart = JSON.parse(localStorage.getItem("moviesInCart"));
    var qty = moviesInCart[ID].tickets_in_cart;
    qty-=1;
    if(qty==0){
            
        
        moviesInCart.splice(ID, 1);
        localStorage.setItem("moviesInCart", JSON.stringify(moviesInCart));
        
        displayTable();
    }
    else{
    moviesInCart[ID].tickets_in_cart=qty;
    localStorage.setItem("moviesInCart", JSON.stringify(moviesInCart));
    }
    
    
    displayTable();
}

}

})

