
function getItems() {
    db.collection("items").get().then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                make: doc.data().make,
                rating: doc.data().rating,
                price: doc.data().price
            })
        
        });
        generateItems(items)
    });
}



function generateItems(items) {
    let itemsHTML = "";
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("main-product","mr-5");
        doc.innerHTML = `
            <div class="product-image w-48 h-52 bg-white rounded-lg">
                <img class="rounded-xl w-full h-full object-contain p-2" src="${item.image}" alt="ps5-image">
            </div>
            <div class="product-name text-gray-700 font-bold mt-2 text-sm">
                ${item.name}
            </div>
            <div class="product-make text-green-700">
                ${item.make}
            </div>
            <div class="product-rating text-yellow-300 font-bold my-1">
                ⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price flex font-bold text-gray-700">
                <h2 class="text-lg font-bold">$${item.price}</h2>
            </div>
            
        `
        // itemsHTML += `
        // <div class="main-product mr-5">
                                     
        // </div>

        // `


        // let doc = document.createElement("div");
        // doc.classList.add("main-product","mr-4","mt-2");
        // doc.innerHTML = `
        //                 <div class="product-image w-48 h-52 bg-white rounded-lg">
        //                  <img class="rounded-xl w-full h-full object-contain p-2" src="${item.image}" alt="ps5-image">
        //                  </div>
        //                 <div class="product-name text-gray-700 font-bold mt-2 text-sm">
        //                         ${item.name}
        //                 </div>
        //                 <div class="product-make text-green-700">
        //                          ${item.make}
        //                 </div>
        //                 <div class="product-rating text-yellow-300 font-bold my-1">
        //                         ⭐⭐⭐⭐ ${item.rating}
        //                 </div>
        //                 <div class="product-price flex font-bold text-gray-700">
        //                 <h2 class="text-lg font-bold"> ${item.price}</h2>
        //                 </div>
                         
        // `
        function addToCart(item){
            // console.log("Add to Cart clicked");
            // console.log(item);
            let cartItem = db.collection("cart-items").doc(item.id);
            cartItem.get()
            .then(function(doc){
                if(doc.exists){
                    cartItem.update({
                        quantity: doc.data().quantity + 1
                    })
                } else {   
                    cartItem.set({
                        image: item.image,
                        make: item.make,
                        name: item.name,
                        rating: item.rating,
                        price: item.price,
                        quantity: 1
                    })
                }
            })
            
        }

        // let addToCartEl = document.createElement("div");
        // addToCartEl.classList.add("product-add","h-8","w-28","cursor-pointer", "hover:bg-yellow-600", "ml-2", "p-1", "bg-yellow-500", "rounded", "flex", "items-center", "justify-center", "font-bold", "text-white");
        // addToCartEl.innerText = "Add to cart";
        // addToCartEl.addEventListener("click",function());
        // doc.appendChild(addToCartEl);
        // doc.querySelector(".main-section-products").appendChild(doc);

        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add("product-add","cursor-pointer", "hover:bg-yellow-600", "ml-1", "p-2", "bg-yellow-500", "rounded", "flex", "items-center", "justify-center", "font-bold", "text-white");
        addToCartEl.innerText = "Add to Cart";
        addToCartEl.addEventListener("click",function(){
            addToCart(item);
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".main-section-products").appendChild(doc);
    })

}

getItems();