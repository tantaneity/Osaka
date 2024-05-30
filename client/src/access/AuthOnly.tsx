import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useUserStore from "@/store/UserStore"
import LoginDialog from "@/components/dialog/LoginDialog"
interface AuthOnlyProps {
    children?: ReactNode
}
function AuthOnly({ children }: AuthOnlyProps): ReactNode {
    const isAuth = useUserStore(state => state.isAuth)
    console.log(isAuth)
    const isLoading = useUserStore(state => state.isLoading)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth && !isLoading) {
            console.log('LOL')
            navigate('/')
        }
    }, [isLoading, isAuth, navigate])

    if (!isAuth) {
        return <LoginDialog open={!isAuth} handleOpen={() => {navigate('/')}} />
    }

    return children
}

export default AuthOnly
