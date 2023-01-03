import React from 'react';
import { useParams } from 'react-router-dom';
import Categorize from './Categorize';
import { laptops } from '../../Assets/ProductData';


function ProductPage(props) {
    const getParam=useParams()
    console.log(getParam);
    return (
        <div>
            <Categorize category={'Laptop'} products={laptops}/>
        </div>
    );
}

export default ProductPage;