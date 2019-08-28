function extractFilename(path) {
    if (path.substr(0, 12) == "C:\\fakepath\\")
      return path.substr(12); // modern browser
}
function updateFilename(path) {
    var name = extractFilename(path);
    document.getElementById('filename').textContent = name;
}

var addItemBtn = document.querySelector('#addItemBtn');
var addItemForm = document.querySelector('#addItem');
var header = document.querySelector('header');
var mainPage = document.querySelector('#main-page');
var catalog = document.querySelector('#catalog');
var form = document.forms['addForm'];
var formTitle = form.querySelector('p');
var itemName = form.querySelector('#GET-name');
var itemPrice = form.querySelector('#GET-price');
var itemImg = form.querySelector('#GET-image');
var description = form.querySelector('#GET-description');
var cartContainer = document.querySelector('#cart-list-container');
var cartBtn = document.querySelector('#cartBtn')


//get started
var login = document.querySelector('#login');
document.addEventListener('keypress',function(e){
    if(e.which == '13'){
        login.style.display = 'none';
        header.style.display = 'flex';
        mainPage.style.display = 'flex';
    }
})
login.addEventListener('click', function(e){
    if(e.target.className == 'btn'){
        login.style.display = 'none';
        header.style.display = 'flex';
        mainPage.style.display = 'flex';
    }
})

// open add item form using button 
addItemBtn.addEventListener('click',function(e){
    addItemForm.style.display = 'flex'    
    addItemForm.style.zIndex = '20'
    mainPage.style.zIndex = '0'
    catalog.style.opacity = '.5'
    form.querySelector('#alertmsg').innerHTML = ''
    itemName.value = ''; itemPrice.value='';itemImg.value = ''; description.value = '';
    formTitle.innerHTML = 'ADD ITEM TO YOUR SHOP';
})

// add item form cancel function
var addItemCancelBtn = document.querySelector('#btn-cancel');
addItemCancelBtn.addEventListener('click',function(e){
    addItemForm.style.display = 'none'    
    addItemForm.style.zIndex = 'initial'
    header.style.zIndex = 'initial'
    mainPage.style.zIndex = 'initial'
    catalog.style.opacity = 'initial'
})
var addItemCancelCross = document.querySelector('#closeFormBtn');
addItemCancelCross.addEventListener('click',function(e){
    addItemForm.style.display = 'none'    
    addItemForm.style.zIndex = 'initial'
    header.style.zIndex = 'initial'
    mainPage.style.zIndex = 'initial'
    catalog.style.opacity = 'initial'
})

//get input value
form.addEventListener('submit',function(e){
    e.preventDefault(); 
    if(itemName.value == '' || itemPrice.value == '' || description.value == '' || itemImg.value == ''){
        form.querySelector('#alertmsg').innerHTML = 'please fill all the form above'
    }else {
        var item = {
            name: itemName.value,
            price: itemPrice.value,
            image: extractFilename(itemImg.value),
            description: description.value
        }
        formTitle.innerHTML = itemName.value + ' has been added';
        itemName.value = ''; itemPrice.value='';itemImg.value = ''; description.value = '';
        var cardsDiv = document.createElement('div');
        cardsDiv.classList.add('cards')
        var cardImgDiv = document.createElement('div');
        cardImgDiv.classList.add('card-img')
        cardImgDiv.setAttribute('id', item.name);
        var cardAddCart = document.createElement('div');
        cardAddCart.classList.add('addToCart');
        cardAddCart.innerHTML = '+'
        var cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        var cardContentP = document.createElement('p');
        var cardContentSpanPrice = document.createElement('span');
        var cardContentDesc = document.createElement('span');
        var cardContentDelete = document.createElement('span');
        cardContentDelete.classList.add('delete')
        cardContentP.innerHTML = item.name;
        cardContentSpanPrice.innerHTML = item.price + ' IDR';
        cardContentDesc.innerHTML = item.description;
        cardContentDelete.innerHTML = 'delete';
        cardContent.appendChild(cardContentP);
        cardContent.appendChild(cardContentSpanPrice);
        cardContent.appendChild(cardContentDesc);
        cardContent.appendChild(cardContentDelete);
        cardsDiv.appendChild(cardImgDiv);
        cardsDiv.appendChild(cardAddCart);
        cardsDiv.appendChild(cardContent);
        catalog.appendChild(cardsDiv);

    }
    var imageBg = document.getElementById(item.name);
    console.log(imageBg.attributes);
    var imageUrl = "url('img/" + item.image + "')";
    console.log(imageUrl);
    imageBg.style.backgroundImage = imageUrl;
    addItemForm.style.display = 'none'    
    addItemForm.style.zIndex = 'initial'
    header.style.zIndex = 'initial'
    mainPage.style.zIndex = 'initial'
    mainPage.style.opacity = 'initial'
    catalog.style.opacity = 'initial'
    document.getElementById('filename').textContent = '';
})

//Delete cards
catalog.addEventListener('click', function(e){
    if(e.target.className == 'delete'){
        var card = e.target.parentElement.parentElement;
        var warning = document.querySelector('#warning');
        warning.style.display = 'initial';
        catalog.style.opacity = '.5';
        warning.addEventListener('click',function(e){
            if(e.target.className == 'btn yesDelete'){
                catalog.removeChild(card);
                warning.style.display = 'none';
                catalog.style.opacity = '1';
            }else if(e.target.className == 'btn noDelete'){
                warning.style.display = 'none';
                catalog.style.opacity = '1';
            }
        })
    }
})

//add item to cart
catalog.addEventListener('click',function(e){
    if(e.target.className == 'addToCart'){
        if(cartContainer.children.length == 0){
            cartBtn.style.display = 'flex'   
        }
        var itemNameAdded = e.target.nextSibling.firstChild;
        var itemPriceAdded = itemNameAdded.nextSibling;
        var cartList = document.createElement('div');
        cartList.classList.add('cart-list');
        var spanName = document.createElement('span');
        var spanPrice = document.createElement('span');
        spanPrice.classList.add('cart-price');
        var spanDel = document.createElement('span');
        spanDel.innerHTML = 'x';
        spanName.innerHTML = itemNameAdded.innerHTML;
        spanPrice.innerHTML = itemPriceAdded.innerHTML;
        spanDel.classList.add('cart-delete');
        cartList.appendChild(spanName);
        cartList.appendChild(spanPrice);
        cartList.appendChild(spanDel);
        cartContainer.appendChild(cartList);
    }
})
//delete cart element
cartContainer.addEventListener('click', function(e){
    if(e.target.className == 'cart-delete'){
        if(cartContainer.children.length == 1){
            cartBtn.style.display = 'none'   
        }
        var cartList = e.target.parentElement;
        cartContainer.removeChild(cartList);
    }
})

// var cartContainer = document.querySelector('#cart-list-container');
// var cartBtn = document.querySelector('#cartBtn')
var checkoutBtn = cartBtn.querySelector('.calculateCart');
var clearCartBtn = cartBtn.querySelector('.clearCart');

clearCartBtn.addEventListener('click',function(){
    cartContainer.innerHTML = '';
    cartBtn.style.display = 'none';
})
var checkoutPayment = document.querySelector('#checkoutPayment');
var paymentContainer = document.querySelector('#paymentContainer');
var paymentListContainer = document.querySelector('#paymentlist-container');
checkoutBtn.addEventListener('click',function(){
    checkoutPayment.style.display = 'flex';
    catalog.style.opacity = '.5';
    cartContainer.style.opacity = '.5';
    cartBtn.style.opacity = '.5';
    var timeCheckout = checkoutPayment.querySelector('#timepayment');
    timeCheckout.firstElementChild.innerHTML = Date ();
    var totalAmount = 0;
    for(var i = 0; i < cartContainer.children.length; i++){
        var itemList = cartContainer.children[i].firstElementChild.innerHTML;
        var price = cartContainer.children[i].firstElementChild.nextElementSibling.innerHTML.split(' ')[0];
        console.log(itemList,price)
        totalAmount += Number(price);
        var paymentList = document.createElement('div');
        paymentList.classList.add('payment-list');
        var itemSpan = document.createElement('span');
        itemSpan.innerHTML = itemList;
        var priceCheckoutSpan = document.createElement('span');
        priceCheckoutSpan.innerHTML = price + ' IDR';
        paymentList.appendChild(itemSpan);
        paymentList.appendChild(priceCheckoutSpan);
        paymentListContainer.appendChild(paymentList);
    }
    paymentListContainer.nextElementSibling.firstElementChild.nextElementSibling.innerHTML = totalAmount + ' IDR';
})

var paymentBtn = document.querySelector('#paymentBtn');
var completePayment = paymentBtn.querySelector('.completePayment');
var cancelPayment = paymentBtn.querySelector('.cancelPayment');

cancelPayment.addEventListener('click',function(){
    checkoutPayment.style.display = 'none';
    paymentListContainer.innerHTML = '';
    catalog.style.opacity = 'initial';
    cartContainer.style.opacity = 'initial';
    cartBtn.style.opacity = 'initial';
})

var successPayment = document.querySelector('#successPayment');
var paymentImage = checkoutPayment.querySelector('#paymentImg');


completePayment.addEventListener('click',function(){
    paymentImage.style.display = 'none';
    paymentContainer.style.display = 'none';
    successPayment.style.display = 'flex';

})

var doneSuccessBtn = successPayment.querySelector('.donePayment');
doneSuccessBtn.addEventListener('click',function(){
    paymentImage.style.display = 'block';
    paymentContainer.style.display = 'flex';
    successPayment.style.display = 'none';
    checkoutPayment.style.display = 'none';
    catalog.style.opacity = 'initial';
    cartContainer.style.opacity = 'initial';
    cartBtn.style.opacity = 'initial';
    cartBtn.style.display = 'none';
    cartContainer.innerHTML = '';
    paymentListContainer.innerHTML = '';
})