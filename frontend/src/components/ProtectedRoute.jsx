import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";

function ProtectedRoute({children}) {
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
    const loading = useSelector((state)=>state.auth.loading);

    if (loading){
        return <div>Loading...</div>
    }

    if (!isAuthenticated){
        return <Navigate to="/login" />
    }
    return children;
}

export default ProtectedRoute