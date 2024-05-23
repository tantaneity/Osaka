import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/UserStore";

type ChildProp = {
    children?: React.ReactNode
}

function RequireAuth({ children }: ChildProp): React.ReactNode {
    const isAuth = useUserStore(state => state.isAuth)
    const isLoading = useUserStore(state => state.isLoading)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !isAuth) {
            navigate('/login')
        }
    }, [isLoading, isAuth, navigate])

    return isAuth ? children : null; 
}

export default RequireAuth;
