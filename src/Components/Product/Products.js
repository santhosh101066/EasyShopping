import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/Product.css'

function Products({id,img,title,price}) {
    const navigate=useNavigate()
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div className='each-product' onClick={()=>navigate(String(id))}>
            <img src={img} alt={title}/>
            <span className='p-title'>{title}</span>
            <span className='p-price'>{new Intl.NumberFormat('hi-IN',{style:'currency',currency:'INR'}).format(price)}</span>
        </div>
    );
}

export default Products;
