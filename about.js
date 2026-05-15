
let currentuser=localStorage.getItem('login_user')
let cartLength=document.getElementById('cartLength')
let brandsContainer = document.getElementById("brandsContainer");

let data=JSON.parse(localStorage.getItem('cart'))
let usercart=[]
function getCartDetails(){

if (data==null){
    return []
}
else{
    usercart=data.filter(item=>{
        if(item.userId==currentuser){
            return item
        }
    })
    return usercart
}
}

let cart=getCartDetails()
cartLength.textContent=cart.length



//toggle
function toggleMenu(){
    document.getElementById("nav-links").classList.toggle("active");
}


//navigate to login page if there is no user logged in
if(currentuser==null){
            location.replace('login.html')
}





        function scrollLeftBtn(){
            brandsContainer.scrollLeft -= 300;
        }

        function scrollRightBtn(){
            brandsContainer.scrollLeft += 300;
        }




//logout
logoutBtn.onclick=function(){
    localStorage.removeItem('login_user')
    location.replace('login.html')
}