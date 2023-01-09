import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../Redux/Reducer/LoginBtn';
import { notifyUser } from '../Redux/Reducer/SendNotification';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const isLogin=useSelector(state=>state.Authentication.isLogin)
    const dispatch=useDispatch()
    if(isLogin){
        return children
    }
    else{
       dispatch(setLogin(true))
       dispatch(notifyUser('Login to Access the page'))
       return <Navigate to={'/'}/>
    }
}

export default ProtectedRoute;