const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Selectors
let NoProductCart = $('.empty-cart-img')
let SearchBtn = $('.header__searchbar-goto')

let CartList = $('.cart-list')
let CartRemoveItem = $('#cartitem3 > .cart-remove-item')
let BtnViewCart = $('.viewcart-btn')
let CartNotify = $('.cart-notify')
let btnLogIn = $('.login-btn')
let btnReg = $('.reg-btn')
let UserAccount = $('.user-account')
let LogOutBtn = $('.logout-btn')

let CategoryList = $('.category__list')

let CartRemoveIcon = $('.cart-remove-icon')

let BtnPrevPage = $('.page__btn-prev')
let BtnNextPage = $('.page__btn-next')


//main arrgument
let NumberProductCart = 7;
let isLoggedIn = false;
let pageQuantity = 4;
// Main Function

// Highlight Item-li On List-ul

// HighlightItem_li 

$('.page-list').onclick = function(e){
    console.log(e.target)
    if(e.target.closest('.item-li')){
        console.log(this.children)
        $$('.item-li').forEach(function(item){
            if(item.classList.contains('btn-primary'))
                item.classList.remove('btn-primary')
        })
        e.target.classList.add('btn-primary')
    }
}

$('.filter-btn-select-price').onclick = function (){
    console.log($('.select-filter-price-ul').classList)
    if($('.select-filter-price-ul').classList.contains('hidden')){
        $('.select-filter-price-ul').classList.remove('hidden')
        $('.select-filter-price-ul').classList.add('show')
    } else if($('.select-filter-price-ul').classList.contains('show')){
        $('.select-filter-price-ul').classList.remove('show')
        $('.select-filter-price-ul').classList.add('hidden')
    }
}

$('.select-filter-price-ul').onclick = function (e){
    if(e.target.closest('.item-li')){

        $('.sort-selected').style = "color: var(--primary-color); font-weight: 500;"
        $('.sort-selected').innerHTML = e.target.innerHTML
    }
}

function SortThis(arg){
    if(arg=='increase'){
        let t = {}
        for(i=0 ; i < product__list.length ; i++)
            for(j=i+1 ; j< product__list.length ; j++){
                if(product__list[j].price_real < product__list[i].price_real){
                    t = product__list[i] 
                    product__list[i] = product__list[j] 
                    product__list[j] = t
                }
            }
        $('.product__item-ul').innerHTML =""
        for(item of product__list)
            InnerHTML_Product(item)
    }
    if(arg=='decrease'){
        let t = {}
        for(i=0 ; i < product__list.length ; i++)
            for(j=i+1 ; j< product__list.length ; j++){
                if(product__list[j].price_real > product__list[i].price_real){
                    t = product__list[i] 
                    product__list[i] = product__list[j] 
                    product__list[j] = t
                }
            }
        $('.product__item-ul').innerHTML =""
        for(item of product__list)
            InnerHTML_Product(item)
    }
}

// SlideBarFuntion()
let translateX = 0;
function SlideNextFuntion(){ 
    let widthImg = $$('.slide-img')[0].width
    translateX -= widthImg
    if(translateX == -6*widthImg){
        translateX =0
    }
    $('.img-list-item').style = `transform: translateX(${translateX}px)`
    // console.log(translateX) 
}

function SlidePrevFuntion(){ 
    let widthImg = $$('.slide-img')[0].width
    translateX += widthImg
    if(translateX == widthImg){
        translateX = -5*widthImg
    }
    $('.img-list-item').style = `transform: translateX(${translateX}px)`
    // console.log(translateX)
}

// Seacrch Goto Function
$('.header__searchbar-goto').onclick = function(){
    let keyword = $('.header__searchbar-inp').value
    $('.search-result-inp').innerHTML = keyword

    $('.product__item-ul').innerHTML =""
    let process_keyword = keyword.toLocaleLowerCase().replace(/ /g, "")
    // Replace keyword
    let newkeyword=''
        // let replace_key = ['ip','ss']
        // if(process_keyword.includes('ip'))
        //     newkeyword = process_keyword.replace('ip', 'iphone')
        if(process_keyword.includes('ss'))
            newkeyword = process_keyword.replace('ss','samsung')
        else{
            newkeyword = process_keyword
        }
    // 
        console.log(newkeyword)
    product__list.forEach(function(item){
        let process_item = item.name.toLowerCase().replace(/\s/g, "")
        if(process_item.includes(newkeyword))
            InnerHTML_Product(item)
    })
}

// Filter_Category Funtion

function Filter_Category(category){
    // Mỗi lần Filter thì Reset lại Product list về 0
    $('.product__item-ul').innerHTML =""
    if(category === 'ALL'){
        product__list.forEach(function(item){
            InnerHTML_Product(item)
        })
    }
    product__list.forEach(function(item){
        if(item.cate === category){
            InnerHTML_Product(item)
        }
    })
}

// Fillter_F Function

function Filter_f(filter){
    $('.product__item-ul').innerHTML =""
    if(filter === 'sale-off'){       
        product__list.forEach(function(item){
            if(item.price_saleoff > 0 ){
                InnerHTML_Product(item)
            }
        })
    }
    if(filter === 'best-selling'){
        let t = {}
        for(i=0 ; i < product__list.length ; i++)
            for(j=i+1 ; j< product__list.length ; j++){
                if(product__list[j].quantity > product__list[i].quantity){
                    t = product__list[i] 
                    product__list[i] = product__list[j] 
                    product__list[j] = t
                }
            }
        for(item of product__list)
            InnerHTML_Product(item)
    }

    if(filter === 'lastest'){
        let t = {}
        for(i=0 ; i < product__list.length ; i++)
            for(j=i+1 ; j< product__list.length ; j++){
                if(product__list[j].id > product__list[i].id){
                    t = product__list[i] 
                    product__list[i] = product__list[j] 
                    product__list[j] = t
                }
            }
        for(item of product__list)
            InnerHTML_Product(item)
    }
}



// InnerHTML Product Funtion

function InnerHTML_Product(product){
        // Inner thêm vào element
        $('.product__item-ul').innerHTML += `<li class="product__item-li col l-2-4 m-3 c-6">
            <div class="product__item-li-auth">
                <a href="./cart.html" class="product__item-li-link">
                    <img src="${product.img}" alt="" class="product__item-img">
                    <div class="product__item-name title2">${product.name}</div>
                    <div class="product__item-price">
                        <span class="product__item-price--origin">${product.price_origin} đ</span>
                        <span class="product__item-price--saleoff">${product.price_real} đ</span>
                    </div>
                    <div class="product__item-addition" >
                        <i href="" class="far fa-heart"></i>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <span class="sold">Đã bán ${product.quantity}</span>
                    </div>
                    <div class="product__item-address">Ha Noi</div>
                </a>
                <div class="product__item-like">Yêu thích</div>
                <div class="product__item-sale-percent">${Math.round(product.price_saleoff/product.price_origin*100)}% GIẢM</div>
            </div>
        </li>`
}

function documentLoaded(){
    if(NumberProductCart>0){
        NoProductCart.style = "display: none"
        CartNotify.innerHTML = `${NumberProductCart}`
    }
    else{
        NoProductCart.style = "display: block"
        $('.cart-list-ul').style = "display: none"
        $('.header__cart.viewcart').style = "display: none"
        $(".cart-list-header").style= "display: none"
    }
    if(isLoggedIn){
        btnReg.style = "display:none"
        btnLogIn.style = "display: none"
        UserAccount.style ="display: block"
    }
    else{
        btnReg.style = "display: block"
        btnLogIn.style = "display: block"
        UserAccount.style ="display: none"
    }
    
    Filter_Category('ALL')

    for(i=0; i< NumberProductCart ; i++ ) {
        $('.cart-list-ul').innerHTML += `<li class="cart-list-li" id="cartitem-1">
        <img src="./img/cartlist-item-0.png" alt="" class="header__cart product-img">
        <div class="product-name title2">
            <span class="product-name title2">Product Name 1: không năm không bao gồm bất cứ thứ gì em cần</span>
        </div>
        <div class="product-price">
            <span class="price">1.990 $</span>
        </div>
         <i class="fas fa-times"></i>
        </li>`
    }
    setInterval(SlideNextFuntion,4000)
}

documentLoaded()

btnReg.onclick = function() {
    $('.modal').style="display: flex;"
    $('.reg-form').style= "display: block;"
}

btnLogIn.onclick = function() {
    $('.modal').style="display: flex;"
    $('.login-form').style= "display: block;"
}

let btn_SwitchForm_LogIn_Reg  = $('.auth-form__switch-btn')
btn_SwitchForm_LogIn_Reg.onclick = function() {
    if(this.classList.contains('switch-reg')){
        $('.login-form').style = "display: none;"
        $('.reg-form').style= "display: block;"
    }
    if(this.classList.contains('switch-log')){
        $('.reg-form').style = "display: none;"
        $('.login-form').style= "display: block;"
    }
    
}

let btn_SwitchForm_LogInnn  = $('.auth-form__switch-btn.switch-reg')
btn_SwitchForm_LogInnn.onclick = function() {
        console.log('fafa')
        $('.login-form').style = "display: none;"
        $('.reg-form').style= "display: block;"
    
}

let Modal = $('.modal')
let RegForm = $('.reg-form')
let LoginForm = $('.login-form')
let backLogBtn = $('.back-btn.log-form-child')
let backRegBtn = $('.back-btn.reg-form-child')
let Header_Select_Btn = $('.select-item')
let Header_Select_List = $('.select-ul')

backLogBtn.onclick = function() {
    LoginForm.style="display: none"
    Modal.style="display: none"
}

backRegBtn.onclick = function() {
    RegForm.style="display: none"
    Modal.style="display: none"
}

// Event Function

// Onclick Function
LogOutBtn.onclick = function(){
    console.log("ahsbdua")
    isLoggedIn = false;
    documentLoaded()
}

CartList.onclick = function(e) {
    if(e.target.closest('.fa-times')){
        console.log(e.target.parentNode)
        //e.target.parentNode.style= " animation: sileUpFaded linear 0.5s;"
        e.target.parentNode.remove()
        NumberProductCart--
        CartNotify.innerHTML = NumberProductCart
        
        if(NumberProductCart==0){
            CartNotify.style = "display: none"
            documentLoaded()
        }
        
    }
    
}


CategoryList.onclick = function(e) {
    if(e.target.closest('.category__item')){
        $$('.category__item').forEach(function(thisItem){
            thisItem.style = "color: black ; font-size: 100%;"
            if($('.fa-caret-right'))
                $('.fa-caret-right').remove()
        })
        e.target.children[0].innerHTML = `<i class="fas fa-caret-right"></i>`
        e.target.style = 'color: var(--primary-color); font-size: 105%;'
    }
}
let curentPage = 1;
BtnNextPage.onclick = function(){
    if(curentPage >= pageQuantity){
        curentPage = 1
    }
    else{
        curentPage++
    }
    $('.page__current').innerHTML =curentPage
}
BtnPrevPage.onclick = function(){
    if(curentPage <= 1){
        curentPage = pageQuantity
    }
    else{
        curentPage--
    }
    $('.page__current').innerHTML =curentPage
}
// $$ chọn các phần tử con (.btn) của phần tử cha (.product__filter-f)
let FilterZone =  $('.product__filter-f')
let ChainOf_FilterBtn = $$('.product__filter-f > .btn')

FilterZone.onclick = function(e){
    if(e.target.closest('.btn')){
        ChainOf_FilterBtn.forEach(function(item){
            if(item.classList.contains('btn-primary'))
                item.classList.remove('btn-primary')
        })
        e.target.classList.add('btn-primary')
    }
}

let HeartBtn  = $('.product__item-ul')
HeartBtn.onmousedown = (function(e){
    console.log(e.target)
    if(e.target.classList.contains('fa-heart')){
        console.log('DSFFSFSFS')
        e.target.onclick = function(e1){ 
            //e1.stopPropagation()
            e1.preventDefault()
        }
    }
    if(e.target.classList.contains('far','fa-heart')){
        e.target.classList.remove('fa-heart','far')
        console.log(e.target.classList)
        e.target.classList.add('fas','fa-heart')
        e.target.style = "color: #f53d2f;"
    }
    else if(e.target.classList.contains('fas','fa-heart')){
        e.target.classList.remove('fa-heart','fas')
        console.log(e.target.classList)
        e.target.classList.add('far','fa-heart')
        e.target.style = "color: #111;"
    }
})
// Responsive Event


$('.header__navbar-hider').onclick= function(){
    // this.style = "display: none;"
    $('.header').classList.add('mode-m-t')
    $('.header__navbar').classList.add('mode-m-t')
    $('.header__navbar-list').classList.add('mode-m-t')
    $('.header__search-panel').classList.add('mode-m-t')
}
$('.header__navbar-item-close-navbar').onclick= function(){
    $('.header').classList.remove('mode-m-t')
    $('.header__navbar').classList.remove('mode-m-t')
    $('.header__navbar-list').classList.remove('mode-m-t')
    $('.header__search-panel').classList.remove('mode-m-t')
}
$('.category__hider').onclick = function(){
    $('.category__auth').style = "display: flex;"
}
$('.category-mobile-ul').onclick= function(e){
    if(e.target.closest('.category-mobile-li')){
        
        $$('.category-mobile-li').forEach(function(ele){
            console.log(ele)
            if(ele.classList.contains('btn-primary'))
                ele.classList.remove('btn-primary')
        })
        e.target.classList.add('btn-primary')
    }
    
}
let n = false;
$('.select-item').onclick= function(){   
    if(n){     
        $('.select-ul').style = "display: none;"
        n= false;
    }
    else{
        $('.select-ul').style = "display: block;"
        n= true;
    }    
}
