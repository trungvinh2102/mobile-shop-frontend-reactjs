import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const checkNotLogged = (OriginConponent) => {
  function ExtendsComponent() {
    const logged = useSelector(({ Auth }) => Auth.login.logged)
    return logged ? <OriginConponent /> : <Navigate to={'/Login'} />
  }
  return ExtendsComponent
}

export default checkNotLogged