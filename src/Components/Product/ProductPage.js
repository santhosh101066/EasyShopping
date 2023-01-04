import React from 'react';
import { useParams } from 'react-router-dom';
import Categorize from './Categorize';
import { laptops } from '../../Data/ProductData';
import DetailedProduct from './DetailedProduct';


function ProductPage(props) {
    const getParam=useParams()
    console.log(getParam);
    return (
        <div>
            <DetailedProduct/>
            <Categorize category={'Laptop'} products={laptops}/>
        </div>
    );
}

export default ProductPage;