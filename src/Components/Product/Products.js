import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/Product.css'
import PriceFormat from '../StringFormat/PriceFormat';
import { SERVER } from '../../Api/AxiosApi';


function Products({id,title,price}) {
    const navigate=useNavigate()
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div className='each-product' onClick={()=>navigate("/view/"+id)}>
            <img src={SERVER+"/assets/images/"+id+".png"} alt={title}/>
            <span className='p-title'>{title}</span>
            <span className='p-price'><PriceFormat price={price}/></span>
        </div>
    );
}

export default Products;
