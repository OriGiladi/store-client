import { isRouteErrorResponse, useRouteError } from "react-router-dom"

function AuthError() { // TODO: display it in the login component
    const error = useRouteError()
    if (isRouteErrorResponse(error)) {//&& error.status === 401 {
        return (
            <div>
                <h2>{error.data.message}</h2>
            </div>
        );
    }
    throw error;
}

export default AuthError