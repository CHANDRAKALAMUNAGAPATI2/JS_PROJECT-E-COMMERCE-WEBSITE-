

let bg=document.getElementById('bg')
let cartLength=document.getElementById('cartLength')
let search=document.getElementById('search')
let logoutBtn=document.getElementById('logoutBtn')

let allProducts = [];

//toggle
function toggleMenu(){
    document.getElementById("nav-links").classList.toggle("active");
}

//Rating filter
function applyFilters(){
    let selectedRating =
    document.querySelector('.rating-select').value;
    let filteredProducts;
    if(selectedRating === 'all'){
        filteredProducts = allProducts;
    }
    else{
        filteredProducts = allProducts.filter(product => {
            return product.rating >= Number(selectedRating) &&
                   product.rating < Number(selectedRating) + 1
        });
    }
    bg.textContent = '';
    if(filteredProducts.length === 0){
        let h1 = document.createElement('h1');
        h1.textContent = 'No Products Found';
        bg.appendChild(h1);

    }
    else{
        createProductCard(filteredProducts);
    }
}



//Sorted the products based on price
async function sorted(order){
    let a=await fetch(`https://dummyjson.com/products?limit=300&sortBy=price&order=${order}`)
    let {products}=await a.json();
    console.log(products);
bg.innerHTML = '';
    createProductCard(products)   
}

sorting.onchange = () => {
    sorted(sorting.value);
}

//sort the products based on category
let categoryContainer=document.getElementById('categories')
async function getCategories(){
    try{
        let res=await fetch('https://dummyjson.com/products/categories')
        let categories=await res.json()
        createCategories(categories)
    }
    catch(error){
        console.log(error)
    }
}

getCategories()

function createCategories(categories){
    let filteredCategories = categories.filter(category => {
        return category.slug !== 'skin-care' &&
               category.slug !== 'womens-shoes' && category.slug !== 'vehicle'
    })

    filteredCategories.forEach(category => {
        let button=document.createElement('button')
        button.textContent=category.name
        button.classList.add('category-btn')
        button.onclick=function(){
            getProductsByCategory(category.slug)
        }
        categoryContainer.appendChild(button)

    })

}

//getting products details
async function getProductsByCategory(category){
    try{
        let res=await fetch(`https://dummyjson.com/products/category/${category}`)
        let data=await res.json()
        bg.textContent=''
        createProductCard(data.products)
    }
    catch(error){
        console.log(error)
    }
}

//getting user cart data
let data=JSON.parse(localStorage.getItem('cart'))

    function getCartDetails(){
        if(data==null){
            return []       
        }
        else{
            let cartData=data
            let filteredCartData=cartData.filter(i=>i.userId==localStorage.getItem('login_user'))
            return filteredCartData       
        }
    }
let cart=getCartDetails()
cartLength.textContent=cart.length

//creating product card
function createProductCard(products){
    for (let product of products){

        let a=document.createElement('a');
        a.href='singleProduct.html';
        bg.appendChild(a)
        
        let div=document.createElement('div')
        div.setAttribute('id','card')
        div.style.backgroundColor='white'
        div.style.width='250px';
        div.style.border='2px solid';
        div.style.borderRadius='10px';
        div.style.padding='10px';
        div.style.marginBottom='5px';
        div.style.textAlign='center'
        
        div.onclick=function(){
            localStorage.setItem('productId',product.id)            
        }       
        a.appendChild(div)

        let img=document.createElement('img')
        img.src=product.thumbnail;
        img.height='150'
        img.width='200'

        let h2=document.createElement('h2')
        h2.textContent=product.title

        h2.style.color='brown'
        h2.style.marginBottom='5px';

        let p=document.createElement('p')
        p.textContent=product.description
        p.style.color=''
        p.style.lineHeight='23px'
        p.style.fontWeight='500'
        p.style.marginBottom='5px'

        let h3=document.createElement('h3')
        h3.textContent='Price :$'+product.price
        h3.style.color='chocolate';
        h3.style.marginBottom='7px'

        let h4=document.createElement('h4')
        h4.textContent='Rating :'
        for(let i=1;i<=product.rating;i++){
            h4.innerText+='★'
        }
        if(product.rating%1!=0){
            h4.innerText+='⯨'
        }

        h4.style.color='rgb(112, 18, 62)'
        div.append(img,h2,p,h3,h4)
    }
}

async function getData(){
    try{
        if(localStorage.getItem('login_user')==null){
            location.replace('login.html')
        }
        let res=await fetch('https://dummyjson.com/products?limit=300')
        let {products}=await res.json()
        createProductCard(products)
        allProducts=products
    }catch(error){
        console.log(error);
    }
}
getData()

search.oninput=(event)=>{
    let filteredData=allProducts.filter(product=>{
        return product.title.toLowerCase().includes(event.target.value.toLowerCase())})
bg.innerHTML='' 


if(filteredData.length==0){
    let h1=document.createElement('h1')
    h1.textContent='No Product Found'
    bg.appendChild(h1);
    bg.style.display='block';    
}
else{
createProductCard(filteredData)
bg.style.display='grid';

}

}

//logout
logoutBtn.onclick=function(){
    localStorage.removeItem('login_user')
    location.replace('login.html')
}

// export default createProductCard()


