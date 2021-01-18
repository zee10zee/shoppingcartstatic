
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready(){
    var cartItemRemoveBtn = document.getElementsByClassName('btn-danger');

    for(var i = 0; i< cartItemRemoveBtn.length; i++){
        cartItemRemoveBtn[i].addEventListener("click", removeBtnClicked);
    }

    var quantityInput = document.getElementsByClassName('quantityInput');
    for(var i = 0; i< quantityInput.length; i++){
        quantityInput[i].addEventListener("click", quantityChanged);
    }
    var cartTotalPrice = document.getElementsByClassName('totalPrice');
    var addToCartBtn = document.getElementsByClassName('btn-success')
    
    for(var i = 0 ;i < addToCartBtn.length; i++){
        var button = addToCartBtn[i]
        button.addEventListener("click", addToCartClicked);
    }

    var purchaseBtn = document.getElementsByClassName('btn-info')[0]
    purchaseBtn.addEventListener("click", purchaseBtnClicked)
}



function purchaseBtnClicked(){
    var cartRows = document.getElementsByClassName('cartRow');

    if(cartRows.length == 0){
        alert("Cart is empty, please add some items to cart")
        return 
    }else{
        alert("Thanks for purchasing, items just purchased !");
        var cartItemContainer = document.getElementsByClassName('cart-items-container')[0];
            while(cartItemContainer.hasChildNodes()){
                cartItemContainer.removeChild(cartItemContainer.firstChild)
            }
            updateTotalPrice()
    } 
}

// remove cart row 
function removeBtnClicked(e){
    var removeBtnClicked = e.target;
    let removeBtnParent = removeBtnClicked.parentElement.parentElement.remove();
    // var totalCartPrice = document.getElementsByClassName('totalPrice')[0].innerText = '$' + 0;
    updateTotalPrice()
}


function quantityChanged(e){
    var input = e.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotalPrice()
}

function addToCartClicked(e){
    var button = e.target;
    var cartItem = button.parentElement;
    var itemPrice = cartItem.getElementsByClassName('price')[0].innerText
    var itemName = cartItem.getElementsByClassName('name')[0].innerText
    var itemImage = cartItem.getElementsByClassName('shop-img')[0].src;
    addToCartItem(itemPrice, itemName, itemImage)
    // console.log(itemPrice, itemName, itemImage)
    updateTotalPrice()

}

function addToCartItem(price, name, imageSrc){

    var cartRow = document.createElement("div")
    cartRow.classList.add("cartRow")
    var cartItemsContainer = document.getElementsByClassName('cart-items-container')[0]
    var cartItemNames = cartItemsContainer.getElementsByClassName('item-name')

    for(var i = 0; i< cartItemNames.length; i++){
        if(cartItemNames[i].innerText == name){
            alert("this Item is already added !")
            return 
        }
    }

    var cartRowContent = ` <li class="itemNameAndImg">
    <img src="${imageSrc}" alt="" class="item-image">
    <span class="item-name">${name}</span>
   </li>
   <li class="itemPrice">${price}</li>
   <li ><input class="quantityInput" type="number" value="1">
       <button class="btn btn-danger">Remove</button>
   </li>`

   cartRow.innerHTML = cartRowContent;
   cartItemsContainer.append(cartRow)
   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeBtnClicked)
   cartRow.getElementsByClassName('quantityInput')[0].addEventListener('change', quantityChanged)  
}


function updateTotalPrice(){
    var total = 0;
    var cartContainer = document.getElementsByClassName('cart')[0]
    var cartRows = cartContainer.getElementsByClassName('cartRow');
    // console.log(cartRows, cartContainer)

    for(var i = 0; i< cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("itemPrice")[0]
        var quantityElement = cartRow.getElementsByClassName('quantityInput')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value; 
        total = total + (price * quantity);
        console.log(price)
    }
    total = Math.round((total* 100)/100)
    document.getElementsByClassName('totalPrice')[0].innerText = '$' + total;
    // console.log(cartPriceText)

}


