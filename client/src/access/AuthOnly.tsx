import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useUserStore from "@/store/UserStore"
import LoginDialog from "@/components/dialog/LoginDialog"
interface AuthOnlyProps {
    children?: ReactNode
}
function AuthOnly({ children }: AuthOnlyProps): ReactNode {
    const {isAuth, isLoading} = useUserStore()
    
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !isAuth) {
            navigate('/')
        }
    }, [isLoading, isAuth, navigate])

    if (!isAuth) {
        return <LoginDialog open={!isAuth} handleOpen={() => {navigate('/')}} />
    }

    return children
}

export default AuthOnly
