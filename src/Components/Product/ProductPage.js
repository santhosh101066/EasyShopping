import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Categorize from './Categorize';
import AxiosApi from '../../Api/AxiosApi';

export const ProductId=createContext(null)
function ProductPage(props) {
    const getParam=useParams()
    const [product,getProduct]=useState(null)
    useEffect(()=>{
        AxiosApi.get('product/basic/'+getParam.type).then((res)=>getProduct(res.data))
    },[getParam.type])
    console.log(getParam);
    if(getParam.productId){
        return <Outlet context={getParam}/>
    }
    else{
        
        return  <Categorize category={String(getParam.type+"s")} products={product}/>
    }
}

export default ProductPage;