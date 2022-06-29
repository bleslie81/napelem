const menuItem = document.getElementById('menu')
const nav = document.getElementById('sidenav')
const close = document.getElementById('exit')
const home = document.getElementById('home')
const services = document.getElementById('services')
const contacts = document.getElementById('contact')

menuItem.addEventListener('click',function(e) {
    nav.classList.toggle('menu-active')
})

close.addEventListener('click',function(e) {
    nav.classList.toggle('menu-active')
})

home.addEventListener('click',function(e) {
    e.preventDefault();
    home.classList.add('active')
    services.classList.remove('active')
    contacts.classList.remove('active')
})

services.addEventListener('click',function(e) {
    e.preventDefault();
    home.classList.remove('active')
    services.classList.add('active')
    contacts.classList.remove('active')
})

contacts.addEventListener('click',function(e) {
    e.preventDefault();
    home.classList.remove('active')
    services.classList.remove('active')
    contacts.classList.add('active')
})

//menü kezelése
let products=[]
const productSection = document.getElementById('products')
fetch('https://hur.webmania.cc/products.json')
.then(response => response.json())
.then(data=>{
    products = data.products
    products.forEach(product=>{
        productSection.innerHTML += 
            `<div>
            <h2>${product.name}</h2>
            <img src="${product.picture}">
            <p>${product.description}</p>
            <h3>${product.price.toLocaleString()} Ft</h3>`
        if(product.stock){
                productSection.innerHTML += `<a id="${product.id}" class="addToCart">Kosárba</a>`
        }else{
            productSection.innerHTML += `<span>Nincs raktáron</span></div>`
        }
        productSection.innerHTML += `</div>`

        const addToCartButton = document.getElementsByClassName('addToCart')
        const buttonCount = addToCartButton.length
        for(i=0; i<buttonCount; i++){
            addToCartButton[i].addEventListener('click',addToCart)
        }
    })
})
.catch(error => console.log(error))
/*
hagyományos tömb, objektumokkal
const products = [
    {
        id:1,
        name: 'Málna',
        picture:'https://picsum.photos/200/300',
        description: 'Egészésges, tele vitaminnal',
        price: 200,
        inStock: true
    },
    {
        id:2,
        name: 'Áfonya',
        picture:'https://picsum.photos/200/300',
        description: 'Kézzel termelt egészség',
        price: 300,
        inStock: true
    },
    {
        id:3,
        name: 'Szeder',
        picture:'https://picsum.photos/200/300',
        description: 'Egészésges, tele vitaminnal',
        price: 1200,
        inStock: true,
        variations:['fehér','fekete']
    },
    {
        id:4,
        name: 'Eper',
        picture:'https://picsum.photos/200/300',
        description: 'Egészésges, tele vitaminnal',
        price: 1000,
        inStock: true,
        variations:['fehér','fekete']
    }
]
*/



// TODO: variation



//kosárba rakás elem

const cart={}

const addToCart = (event) =>{

    let target = event.target.id ? event.target.id : event.target.dataset.id
    
    if(cart[target]==undefined){
        cart[target] = 1
    }else{
        cart[target]++
    }
}



const refreshCart = ()=>{
    total = 0
    cartList.innerHTML='';
    for(const id in cart){
        const currentProduct = products.find(product => product.id==id)
        cartList.innerHTML+=`<li>
        <button data-id="${currentProduct.id}">+</button>
        ${currentProduct.name} 
        ${currentProduct.price} Ft</li>
        <li>${cart[id]} db
        </li>`;
        total+=currentProduct.price*cart[id]
    }
    cartList.innerHTML +=`<li>Összesen: ${total.toLocaleString()} Ft</li>`
}

//kosár tartalma

const cartIcon= document.getElementById('cart-icon')
const cartContent = document.getElementById('cart')
const closeCart = document.getElementById('close')
const cartItems = document.querySelectorAll('ul#cartItems')
const cartList= document.getElementById('cartItems')
let total = 0

cartIcon.addEventListener('click',function(event){
    event.preventDefault()
    cartContent.classList.toggle('cart-active');
    refreshCart()
})

const plusButton= document.querySelectorAll('#cartItems button')

cartList.addEventListener('click',(event)=>{
    addToCart(event)
    refreshCart()
})