import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/Product.css'

function Products({id,img,title,price}) {
    const navigate=useNavigate()
    
    return (
        <div className='each-product' onClick={()=>navigate(String(id))}>
            <img src={img} alt={title}/>
            <span className='p-title'>{title}</span>
            <span className='p-price'>{new Intl.NumberFormat('hi-IN',{style:'currency',currency:'INR'}).format(price)}</span>
        </div>
    );
}

export default Products;
