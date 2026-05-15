let bg=document.getElementById('bg')
let search=document.getElementById('search')
let cartLength=document.getElementById('cartLength')
let logoutBtn=document.getElementById('logoutBtn')
let currentuser=localStorage.getItem('login_user')

//navigate to login page if there is no user logged in
if(currentuser==null){
            location.replace('login.html')
}

//toggle
function toggleMenu(){
    document.getElementById("nav-links").classList.toggle("active");
}


//getting user cart items
let data=localStorage.getItem('cart')
function getCartDetails(){
    if(data==null){
        return []
    }
    else{
        let cartData=JSON.parse(data)
        let filteredData=cartData.filter(i=>i.userId==currentuser)
        return filteredData       
    }
}

//cart is empty message
function cartisempty(){
        let h1=document.createElement('h1')
        h1.textContent='Your Cart is Empty.'
        bg.appendChild(h1)
        bg.append(cartfunctionality)    
        bg.style.display='flex'
        bg.style.justifyContent='center'
        bg.style.alignItems='center'
    }


//cart functionalities,backToShop,clearCart,buyNow
let cartfunctionality=document.createElement('div')
cartfunctionality.setAttribute('id','cartfunctionality')

let backtoshop=document.createElement('btn')
//Back to Shop
backtoshop.setAttribute('class','btn btn-primary')
backtoshop.textContent='Back to Shop'
backtoshop.onclick=()=>{
    location.replace('index.html')
}
//Clear Cart
let clearcart=document.createElement('btn')
clearcart.setAttribute('class','btn btn-danger')
clearcart.textContent='Clear Cart'
clearcart.onclick=()=>{    

    let data = JSON.parse(localStorage.getItem("cart"))
    
    let is_cart_found = false
    for(let i of data){
        if(i.userId==currentuser){
            is_cart_found=true
        }
    }
    if(is_cart_found==false){
        alert("Your cart is empty")
    }

    let newlocalcart=data.filter((item)=>{
                if(!(item.userId==currentuser)){
                    return item
                }
            })
    localStorage.setItem('cart',JSON.stringify(newlocalcart))
    location.reload()   
}

//Buy now
let buynow=document.createElement('btn')
buynow.setAttribute('class','btn btn-success')
buynow.textContent='Buy Now'
buynow.onclick=()=>{
    if(cart.length==0){
        alert('Cart is empty,Add products to Buy')
    }
    else{
    location.replace('buynow.html')
    }
}

let total=document.createElement('p')
cartfunctionality.append(backtoshop,clearcart,buynow)

//creating product cards
function createProductCard(product){
    let div=document.createElement('div')
    div.setAttribute('id','card')
    bg.append(div)

    let img=document.createElement('img')
    img.src=product.thumbnail

    let h2=document.createElement('h2')
    h2.textContent=product.title
   
    let h3=document.createElement('h3')
    h3.textContent=`Price : ${product.price} x ${product.frequency}=${(product.frequency*product.price).toFixed(2)}`

    let quantity=document.createElement('div')
    quantity.setAttribute('id','quantity')
    let inc=document.createElement('button')
    inc.textContent='+'
    inc.style.fontSize='20px'
    inc.style.backgroundColor='rgb(12, 126, 126,0.8)'
    inc.style.margin='10px'
    inc.onclick=()=>{

        let cart=JSON.parse(localStorage.getItem('cart'))
        let newcartdata=cart.map(item=>{
            if(item.id==product.id && item.userId==currentuser){
                item.frequency+=1

            }
            return item
        })
        localStorage.setItem('cart',JSON.stringify(newcartdata))
        location.reload()

    }

    let dec=document.createElement('button')
    dec.textContent='-'
    dec.style.fontSize='20px'
    dec.style.backgroundColor='rgb(144, 19, 81,0.8)'
    dec.onclick=()=>{
        let cart=JSON.parse(localStorage.getItem('cart'))
        if(product.frequency==1){
            let newcartdata=cart.filter(item=>{
                return !(item.id==product.id&&item.userId==currentuser)
            })
        localStorage.setItem('cart',JSON.stringify(newcartdata))
        location.reload()
        }
        else{

        let newcartdata=cart.map(item=>{
            if(item.id==product.id && item.userId==currentuser){
                if(item.frequency>1){
                item.frequency-=1

                }               

            }
            return item
        })

        localStorage.setItem('cart',JSON.stringify(newcartdata))
        location.reload()

    }
    }
    quantity.append(inc,dec)
    let button=document.createElement('button')
    button.setAttribute('class','btn btn-danger m-2 p-2')
    button.textContent='Remove from cart'
    button.onclick=function (){

            let cart=JSON.parse(localStorage.getItem('cart'))
            let newlocalcart=cart.filter((item)=>{
                if(!(item.id==product.id && item.userId==currentuser)){
                   return item        
                }
            })
            localStorage.setItem('cart',JSON.stringify(newlocalcart))

            let newusercart=newlocalcart.filter(item=>{
                return item.userId==currentuser
            })
            cartLength.textContent = newusercart.length;

            cart=newusercart

        bg.textContent=''
        for (let product of cart){
            createProductCard(product)   
        }

// sum of the cart
        let summ=0;
        for (let i of newusercart){
            summ+=i.price*i.frequency
        }
    total.textContent='Total Price ='+summ.toFixed(2)

//////////
        if (cart.length==0){
        cartisempty()
        }          
    }

    div.append(img,h2,h3,quantity,button)
    bg.append(total)
    bg.append(cartfunctionality)    
}

//finding cart length and printing cards
let cart=getCartDetails()
cartLength.textContent=cart.length

if(cart.length==0){
    cartisempty()
}

else{  
    for(let product of cart){
        createProductCard(product)
    }
}

//appending total and cartfunctionalities
bg.append(total)
bg.append(cartfunctionality)


// total price
let summ=0;
for (let i of cart){
    summ+=i.price*i.frequency
}
total.textContent='Total Price ='+summ.toFixed(2)


//logout 
logoutBtn.onclick=function(){
    localStorage.removeItem('login_user')
    location.replace('login.html')
}
