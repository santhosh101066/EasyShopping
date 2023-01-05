import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Categorize from './Categorize';
import { laptops } from '../../Data/ProductData';


function ProductPage(props) {
    const getParam=useParams()
    console.log(getParam);
    if(getParam.productId){
        return <Outlet context={getParam}/>
    }
    else{
        return  <Categorize category={'Laptop'} products={laptops}/>
    }
}

export default ProductPage;