import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
const checkNotLogged = (OriginComponent)=>{
    function ExtendComponent(){
        const logged = useSelector(({ Auth }) => Auth.login.logged)
        return !logged ? <Navigate to="/"/> :<OriginComponent />
    }
    return ExtendComponent
}
export default checkNotLogged