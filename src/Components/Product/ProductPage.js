import React from 'react';
import { useParams } from 'react-router-dom';

function ProductPage(props) {
    const getParam=useParams()
    console.log(getParam);
    return (
        <div>
            Productpage {getParam.type}
        </div>
    );
}

export default ProductPage;