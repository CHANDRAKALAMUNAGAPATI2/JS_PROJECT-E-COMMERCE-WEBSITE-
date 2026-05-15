let bg = document.getElementById('product-bg')
let cartLength = document.getElementById('cartLength')
let logoutBtn = document.getElementById('logoutBtn')
let currentuser = localStorage.getItem('login_user')

function list() {
    let data = JSON.parse(localStorage.getItem("favlist"))
    if (data == null) {
        return []
    } else {
        return data
    }
}

let favlist = list()
// let favlist=[]
let filteredData = []


//for find the cart length
function getCartDetails() {
    let data = localStorage.getItem('cart')
    if (data == null) {
        return []
    }
    else {
        let cartData = JSON.parse(data)
        filteredData = cartData.filter(i => i.userId == currentuser)
        return cartData
    }
}
let cart = getCartDetails()
count = filteredData.length
cartLength.textContent = count


//for create product interface
function singleProductInterface(product) {
    let img = document.createElement('img')
    img.src = product.thumbnail

    let singleinfo = document.createElement('div')
    singleinfo.setAttribute('id', 'singleinfo')

    let h2 = document.createElement('h2')
    h2.textContent = product.title

    let p = document.createElement('p')
    p.textContent = product.description

    let h3 = document.createElement('h3')
    h3.textContent = 'Price :$' + product.price

    let h4 = document.createElement('h4')
    h4.textContent = 'Rating :'
    for (let i = 1; i <= product.rating; i++) {
        h4.innerText += '★'
    }
    if (product.rating % 1 != 0) {
        h4.innerText += '⯨'
    }


    let button = document.createElement('button')
    button.setAttribute('class', 'btn btn-success m-2 p-2')
    button.textContent = 'Add to cart'

    button.onclick = function () {
        product.userId = currentuser

        let cart = JSON.parse(localStorage.getItem('cart'))
        let isExist = false
        let newcart = cart.map(item => {
            if (item.id == product.id && item.userId == currentuser) {
                item.frequency += 1
                isExist = true
            }
            return item
        })

        if (isExist) {
            localStorage.setItem('cart', JSON.stringify(newcart))
            location.replace('index.html')



        }
        else {
            product.frequency = 1
            let cart = JSON.parse(localStorage.getItem('cart'))
            cart.push(product)
            localStorage.setItem('cart', JSON.stringify(cart))
            count++
            cartLength.textContent = count
            location.replace('index.html')

        }

    }


    //fav list 

    let fav = document.createElement('p');
    fav.textContent = '🤍'
    fav.style.fontSize = '40px'

//for getting users fav list

let localfavlist = JSON.parse(localStorage.getItem("favlist"))
function getfavItems(){
    if (localfavlist==null){
        return []
    }
    else{
        let userfavlist = favlist.filter((item) => {
    if (item.liked == localStorage.getItem('login_user')) {
        return item
        }
    })
    return userfavlist

    }
}

let newfavlist=getfavItems()


    fav.onclick = () => {
        let a = newfavlist.find((item) => {
            return item.id == product.id
        })
        if (a == undefined) {
            product['liked'] = currentuser
            favlist.push(product)
            localStorage.setItem('favlist', JSON.stringify(favlist))
            location.replace('index.html')

        }
        else {
            alert('Item already in wishlist')
            location.replace('index.html')
        }
    }

    singleinfo.append(h2, p, h3, h4, button, fav)
    bg.append(img, singleinfo)
}


//getting single product from api
async function getSingleProduct() {
    try {
        if (currentuser == null) {
            location.replace('login.html')
        }
        let id = localStorage.getItem('productId')
        let res = await fetch(`https://dummyjson.com/products/${id}`)
        let product = await res.json()
        singleProductInterface(product)
    }
    catch (error) {
        console.log(error);
    }
}
getSingleProduct()



//logout button
logoutBtn.onclick = function () {
    localStorage.removeItem('login_user')
    location.replace('login.html')
}
