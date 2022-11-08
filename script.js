// 
// Domloaded



// 
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:2100/products')
    .then((data)=>{        
        if(data.request.status===200){
            const productwrap=document.querySelector('.wrap-products');
            const productData=data.data.product;            
            productData.forEach(productE=>{
                // console.log(productE);
                const innerFormate=` <div id="${productE.id}" class="each-product">
                                    <h3>${productE.title}</h3>
                                    <div class="image"><img src="${productE.imageUrl}" alt="${productE.title}"></div>
                                    <div>
                                        <span class="span">
                                            $
                                            <span class="ammount">${productE.price}</span>
                                        </span>
                                        <button onClick="addCart(${productE.id})" id="product-${productE.id}" class="addCrt-btn">Add to cart</button>
                                    </div>
                                </div>`
                productwrap.innerHTML+=innerFormate;
            });           

        }      
   
    })
    .catch(err=>{console.log(err)});

    axios.get('http://localhost:2100/cart')
    .then((data)=>{
        if(data.request.status===200){
            const cartwrap=document.querySelector('.cart-items');
            const cartNo=document.querySelector('.cart-no');
            let totalAmmount=document.getElementById('total-value');
            const cartData=data.data.products;  
            let totalPrice=0.00;
            let quantityNo=0;  
            // console.log(cartData);
            cartData.forEach(productE=>{
                 
                const productDetails=` <div class='cart-row' id="in-cart-${productE.id}"><span class=" cart-item cart-colomn"><img src="${productE.imageUrl}"> ${productE.title}</span>
                <span class=" cart-price cart-colomn">${productE.price}</span>
                <span class=" cart-qunatity cart-colomn"><input type="text" value="${productE.cartItem.quantity}"> <button  onClick="removeCartItem(${productE.id})" class="cartItm-removeBtn">Remove</button></span></div>`;
                
                cartwrap.innerHTML += productDetails;
                quantityNo=quantityNo+productE.cartItem.quantity;
                
                totalPrice = parseFloat(parseFloat(totalPrice)+productE.price*productE.cartItem.quantity).toFixed(2);
                // console.log( typeof productE.price);
        

            })
            totalAmmount.innerText=totalPrice;   
       

        cartNo.innerText=quantityNo;
                
        } 
        
    })
    .catch(err=>console.log(err));
});



// 
// cart Button work
// 
const popCart=document.querySelectorAll('.popCartBtn');
const popUpCart=document.querySelector('.popUp-cart');
const closePop=document.querySelector('.close');


function addCart(productId){
    axios.post('http://localhost:2100/cart',{productId:productId})
    .then(response=>{
        // console.log(response);
        if(response.status===200){
           notification(response.data.message);
        }else{
            throw new Error(response.data.message);
        }
        
    })
    .catch((errMsg)=>{
        notification(errMsg);
    });
};

// 
// short Notification for cart
// 
const carter=document.querySelector('.cart-items');
function notification(message){
    const notify=document.createElement('div');
    notify.classList.add('toast');        
    notify.innerHTML=message;
    container.appendChild(notify);
    setTimeout(()=>{notify.remove()},2000)
}



// 
// open cart pop up function
// 
popCart.forEach(function(cartBtn){
    cartBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        popUpCart.style.display='block';
       
});
});


// 
// close cart pop up function
// 
closePop.addEventListener('click',(e)=>{
    e.preventDefault();
    popUpCart.style.display='none';
});




// 
// Add to cart button
// 

// console.log(carter);
// const mainDiv=document.getElementById('main-Container');
// mainDiv.addEventListener('click',(e)=>{ 


// //    
// // cart item removed function
// // 
//    if(e.target.className=='cartItm-removeBtn'){
function removeCartItem(productId){
    axios.post('http://localhost:2100/cart-delete-item',{productId:productId})
    .then((response)=>{
        // console.log(response);
        if(response.status===200){
        notification(response.data.message);
        }else{
            throw new Error(response.data.message);
        }
    })
    .catch(errMsg=>{
        notification(errMsg)
    })
   

};

