// 
// cart Button work
// 
const popCart=document.querySelectorAll('.popCartBtn');
const popUpCart=document.querySelector('.popUp-cart');
const closePop=document.querySelector('.close');

popCart.forEach(function(cartBtn){
    cartBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        popUpCart.style.display='flex';
    });
});

closePop.addEventListener('click',(e)=>{
    e.preventDefault();
    popUpCart.style.display='none';
});


// 
// Add to cart button
// 
const addCartBtn=document.querySelectorAll('.addCrt-btn');
let count=0;
addCartBtn.forEach(function(btn){
    // console.log(btn);
    btn.addEventListener('click',()=>{
        count++;
        const productDetail=btn.parentElement.parentElement;
        const productNme=productDetail.querySelector('h3').innerHTML;
        const productValue=productDetail.querySelector('.ammount').innerHTML;
        if(count>1){
            alert(productNme+'Already added')
        }else{        

        const notify=document.createElement('div');
        notify.classList.add('toast');        
        notify.innerHTML=` ${productNme} is successfully added to cart`;
        container.appendChild(notify);
        setTimeout(()=>{notify.remove()},2000)
            console.log(productNme,productValue);
        }
    });
        
    });
