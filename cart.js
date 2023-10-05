function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
                // image: doc.data().image,
                // name: doc.data().name,
                // make: doc.data().make,
                // rating: doc.data().rating,
                // price: doc.data().price
            })
        })
        generateCartItems(cartItems);
        getTotalCost(cartItems)
    })
}

function getTotalCost(items){
    let totalCost = 0;
    items.forEach((item)=>{
        totalCost += (item.price * item.quantity);
    })
    document.querySelector(".total-cost-number").innerText = numeral(totalCost.format('$0,0.00'));
}

function decreaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if(doc.exists) {
            if(doc.data().quantity > 1) {
                cartItem.update({
                    quantity: doc.data().quantity -1
                })
            }
        }
    })
}

function increaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc){
        if(doc.exists){
            if(doc.data().quantity > 0){
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        }
    })
}

function deleteItem(itemId){
    db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems) {
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML += `
        <div class="cart-item flex items-center pb-4 border-b border-gray-100">
        <div class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg">
            <img class="w-full h-full object-contain" src="${item.image}" alt="">
        </div>
     <div class="cart-item-details flex-grow font-bold text-gray-600 text-sm">
         <div  class="cart-item-title">
             ${item.name}
         </div>
         <div class="cart-item-brand text-sm text-gray-400">
             ${item.make}
         </div>
     </div>
     <div class="cart-item-counter w-48 flex items-center">
         <div data-id="${item.id}" class="cart-item-decrease chevron-left cursor-pointer text-gray-400 bg-gray-100 rounded-xl h-6 w-6 flex justify-center items-center hover:bg-gray-200 cursor-pointer mr-2">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                                        
         </div>
         <h4 class="text-gray-400">x${item.quantity}</h4>
         <div data-id="${item.id}" class="cart-item-increase chevron-right cursor-pointer text-gray-400 bg-gray-100 rounded-xl h-6 w-6 flex justify-center items-center hover:bg-gray-200 cursor-pointer ml-2">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> 
         </div>
     </div>
     <div class="cart-item-total-cost w-48 font-bold text-gray-400">
        $ ${item.price * item.quantity}
     </div>
     <div data-id="${item.id}" class="cart-item-del w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400">
         <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
     </div>
    </div>  
        `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners(){
    let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    let increaseButtons = document.querySelectorAll(".cart-item-increase");

    let deleteButtons = document.querySelectorAll(".cart-item-del");
    // console.log(deleteButtons);



    decreaseButtons.forEach((button) => {
        button.addEventListener("click", function(){
            console.log('decreseing');
            decreaseCount(button.dataset.id);
        })
    })
    
    increaseButtons.forEach((button) => {
        button.addEventListener("click", function(){
            increaseCount(button.dataset.id)
        })
    })

    deleteButtons.forEach((button) => {
        button.addEventListener("click", function(){
            deleteItem(button.dataset.id)
        })
    })

}




getCartItems();