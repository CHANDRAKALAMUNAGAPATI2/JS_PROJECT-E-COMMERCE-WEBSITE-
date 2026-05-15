let bg = document.getElementById('bg')
let cartLength = document.getElementById('cartLength')
let logoutBtn = document.getElementById('logoutBtn')
let currentuser = localStorage.getItem('login_user')
let filteredData = []


//navigate to login page if there is no user logged in
if(currentuser==null){
            location.replace('login.html')
}

//for finding the cart length
let data = localStorage.getItem('cart')
function getCartDetails() {
    if (data == null) {
        return []
    }
    else {
        let cartData = JSON.parse(data)
        filteredData = cartData.filter(i => i.userId == currentuser)
        return filteredData
    }
}
let cart = getCartDetails()
let count = filteredData.length
cartLength.textContent = count


//for create product card
function createProductCard(products) {
    for (let product of products) {

        let div = document.createElement('div')
        div.setAttribute('id', 'card')
        div.style.backgroundColor = 'white'
        div.style.width = '250px';
        div.style.border = '2px solid';
        div.style.borderRadius = '10px';
        div.style.padding = '10px';
        div.style.marginBottom = '5px';
        div.style.textAlign = 'center'

        let img = document.createElement('img')
        img.src = product.thumbnail;
        img.height = '150'
        img.width = '200'

        let h2 = document.createElement('h2')
        h2.textContent = product.title
        h2.style.color = 'brown'
        h2.style.marginBottom = '5px';

        let h3 = document.createElement('h3')
        h3.textContent = 'Price :$' + product.price
        h3.style.color = 'chocolate';
        h3.style.marginBottom = '7px'


        let h4 = document.createElement('h4')
        h4.textContent = 'Rating :'
        for (let i = 1; i <= product.rating; i++) {
            h4.innerText += '★'
        }
        if (product.rating % 1 != 0) {
            h4.innerText += '⯨'
        }
        h4.style.color = 'rgb(112, 18, 62)'


        let button = document.createElement('button')
        button.setAttribute('id', 'cart')
        button.textContent = '🛒'

        
        button.onclick = function() {
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

            }
            else {
                product.frequency = 1
                let cart = JSON.parse(localStorage.getItem('cart'))
                cart.push(product)
                localStorage.setItem('cart', JSON.stringify(cart))
                count++
                cartLength.textContent = count
            }
        }

        let fav = document.createElement('button')
        fav.textContent = '🤍'
        fav.setAttribute('id', 'fav')
        fav.style.fontSize = '30px'
        fav.style.width = '100px'
        fav.style.padding='0px'

        fav.onclick = () => {
            let localfavlist = JSON.parse(localStorage.getItem("favlist"))
            function getfavItems(){
                if (localfavlist==null){
                    return []
                }
                else{
                    let userfavlist = localfavlist.filter((item) => {
                if (item.liked == localStorage.getItem('login_user')) {
                    return item
                    }
                })
                return userfavlist
            
                }
            }

            let favlist=getfavItems()


            let filteredData = favlist.filter((item) => {
                return !(item.id == product.id && item.liked == currentuser)


            })


            localStorage.setItem("favlist", JSON.stringify(filteredData))

            if (filteredData.length == 0) {
                bg.textContent = ''
                let h1 = document.createElement('h1')
                h1.textContent = 'Your Wishlist is Empty 💔'
                h1.setAttribute('id', 'empty-msg')
                bg.appendChild(h1)
            }
            else {

                location.reload()

            }

        }
        let features = document.createElement('div')
        features.append(button, fav)
        features.setAttribute('id', 'features')
        div.append(img, h2, h3, h4, features)
        bg.append(div)
    }

}


//toggle
function toggleMenu(){
    document.getElementById("nav-links").classList.toggle("active");
}


//for getting users fav items
let localfavlist = JSON.parse(localStorage.getItem("favlist"))
function getfavItems(){
    if (localfavlist==null){
        return []
    }
    else{
        let userfavlist = localfavlist.filter((item) => {
            if (item.liked == localStorage.getItem('login_user')) {
                return item
        }
    })
    return userfavlist

    }
}

let favlist=getfavItems()
if (favlist.length == 0) {
                bg.textContent = ''
                let h1 = document.createElement('h1')
                h1.textContent = 'Your Wishlist is Empty 💔'
                h1.setAttribute('id', 'empty-msg')
                bg.appendChild(h1)

            }
           else{

               createProductCard(favlist)
           }




//Logout functionality
logoutBtn.onclick = function () {
    localStorage.removeItem('login_user')
    location.replace('login.html')
}

