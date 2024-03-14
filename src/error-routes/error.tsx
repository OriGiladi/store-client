import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <>
            <div>404 error</div>
            <p>Go to the <Link style={{color:"#B83280"}} to ='/'>Catalog</Link></p>
        </>
        
    )
}

export default ErrorPage