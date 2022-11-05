// 
// Domloaded

// const  axios = require("axios");

// 

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/products')
    .then((data)=>{
        
        if(data.request.status===200){
            const productwrap=document.querySelector('.wrap-products');
            const productData=data.data.product;
            
            productData.forEach(productE=>{
                console.log(productE);
                const innerFormate=` <div id="${productE.id}" class="each-product">
                                    <h3>${productE.title}</h3>
                                    <div class="image"><img src="${productE.imageUrl}" alt="${productE.title}"></div>
                                    <div>
                                        <span class="span">
                                            $
                                            <span class="ammount">${productE.price}</span>
                                        </span>
                                        <button  id="product-${productE.id}" class="addCrt-btn">Add to cart</button>
                                    </div>
                                </div>`
                productwrap.innerHTML+=innerFormate;
            });
            

        }
       
   
    })
    .catch(err=>{console.log(err)});
});

// 
// cart Button work
// 
const popCart=document.querySelectorAll('.popCartBtn');
const popUpCart=document.querySelector('.popUp-cart');
const closePop=document.querySelector('.close');

popCart.forEach(function(cartBtn){
    cartBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        popUpCart.style.display='block';
    });
});

closePop.addEventListener('click',(e)=>{
    e.preventDefault();
    popUpCart.style.display='none';
});


// 
// Add to cart button
// 
const carter=document.querySelector('.cart-items');
// console.log(carter);
const mainDiv=document.getElementById('main-Container');
mainDiv.addEventListener('click',(e)=>{
   if(e.target.className=='addCrt-btn'){
    // console.log(e.target.parentElement.parentElement);   
    const cartNo=document.querySelector('.cart-no');
    let totalAmmount=document.getElementById('total-value');
    // console.log(totalAmmount);

    
        const productDetail=e.target.parentNode.parentNode;
        const prodId=productDetail.id;
        const productNme=productDetail.querySelector('h3').innerHTML;
        const productValue=productDetail.querySelector('.ammount').innerHTML;
        const prodImage=productDetail.querySelector('.image img').src;
        if(document.querySelector(`#in-cart-${prodId}`)){
            alert(`${productNme} is already added`);
            return;
        }
            
        const send2Cart=document.createElement('div');
        send2Cart.classList.add('cart-row');
        send2Cart.setAttribute('id',`in-cart-${prodId}`);
        const productDetails=` <span class=" cart-item cart-colomn"><img src="${prodImage}"> ${productNme}</span>
        <span class=" cart-price cart-colomn">${productValue}</span>
        <span class=" cart-qunatity cart-colomn"><input type="text" value="1"> <button class="cartItm-removeBtn">Remove</button></span>`;
        send2Cart.innerHTML=productDetails;
        carter.appendChild(send2Cart);

        totalAmmount.innerText=(parseFloat(totalAmmount.innerText)+parseFloat(productValue)).toFixed(2);   
        console.log(totalAmmount);

        cartNo.innerHTML=parseInt(cartNo.innerHTML)+1;

        const notify=document.createElement('div');
        notify.classList.add('toast');        
        notify.innerHTML=` ${productNme} is successfully added to cart`;
        container.appendChild(notify);
        setTimeout(()=>{notify.remove()},2000)

   }
   if(e.target.className=='cartItm-removeBtn'){
    const cartNo=document.querySelector('.cart-no');
    let totalAmmount=document.getElementById('total-value');

        cartNo.innerHTML=parseInt(cartNo.innerHTML)-1;
        cartItem=e.target.parentNode.parentNode;
        cartPrice=cartItem.querySelector('.cart-price').innerText;
        totalAmmount.innerText=((parseFloat( totalAmmount.innerText)).toFixed(2) - (parseFloat(cartPrice)).toFixed(2)).toFixed(2);
        cartItemId=cartItem.id;
        cartItem.remove();
   }
})



