


let currentuser=localStorage.getItem('login_user')
let totalprice=document.getElementById('totalprice')
let cartLength=document.getElementById('cartLength')
let logoutBtn=document.getElementById('logoutBtn')
let orderForm=document.getElementById('orderForm')

//navigate the page to login page if there is no user logeged in
if(currentuser==null){
        location.replace('login.html')
}


//toggle
function toggleMenu(){
    document.getElementById("nav-links").classList.toggle("active");
}


//finding user cart length and total price
let cart=JSON.parse(localStorage.getItem('cart'))
let summ=0
let usercart=cart.filter((item)=>{
    if(item.userId==currentuser){
        summ+=item.price
        return item
    }
})
cartLength.textContent=usercart.length

//navigate  the page to main page if cart is empty
if(usercart.length==0){
    location.replace('index.html')
}

//printing total price
totalprice.innerHTML='Total Amount :'+summ.toFixed(2)
totalprice.style.textAlign='center'
totalprice.style.fontWeight='600'

//validating the form 
let erroru=document.getElementById('erroru')
let errormobile=document.getElementById('errormobile')

let userPattern=/^[A-Z]{1}[a-z]{5,}$/
let mobilePattern=/^[6-9][0-9]{9}$/

function validation(){
    let isvalid=true

    let username=document.getElementById('username').value
    let mobile=document.getElementById('mobile').value
   
    if(!userPattern.test(username)){
        erroru.innerHTML='invalid Username'
        erroru.style.color='red'
        isvalid=false
    }
    else{
        erroru.innerHTML=''
    }
    
    if(!mobilePattern.test(mobile)){
        errormobile.innerHTML='invalid Mobile number'
        errormobile.style.color='red'
        isvalid=false
    }
    else{
        errormobile.innerHTML=''
    }


    if(isvalid){

        let newcart=cart.filter(item=>{
            return item.userId!=currentuser
        })
        localStorage.setItem('cart',JSON.stringify(newcart))
        alert('payment successful')
        location.replace('index.html')
        
    }
        return isvalid       
}

orderForm.onsubmit=(e)=>{
    e.preventDefault()
    validation()
}


//logout functionality
logoutBtn.onclick=function(){
    localStorage.removeItem('login_user')
    location.replace('login.html')
}
