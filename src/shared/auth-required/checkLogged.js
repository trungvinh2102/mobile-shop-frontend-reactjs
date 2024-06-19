import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const checkLogged = (OriginConponent) => {
  function ExtendsComponent() {
    const logged = useSelector(({ Auth }) => Auth.login.logged)
    return logged ? <Navigate to={'/'} /> : <OriginConponent />
  }
  return ExtendsComponent
}



export default checkLogged