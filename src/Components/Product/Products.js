import React from 'react';
import '../../CSS/Product.css'
function Products({img,title,price}) {
    return (
        <div className='each-product'>
            <img src={img} alt={title}/>
            <span className='p-title'>{title}</span>
            <span className='p-price'>{new Intl.NumberFormat('hi-IN',{style:'currency',currency:'INR'}).format(price)}</span>
        </div>
    );
}

export default Products;
