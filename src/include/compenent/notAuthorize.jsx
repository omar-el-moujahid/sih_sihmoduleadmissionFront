import React from 'react'
import "../Style/notAuthorize.css"
import { Link } from 'react-router-dom'
function NotAuthorize() {
    return (
        <>

            <div className="container">
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <section className="error-message text-center">
                        <h1 className="error-code">404</h1>
                        <p className="error-description">Page not found</p>
                        <Link className="nav-link " to={"/chu/patient-login"} > Go to the  Sein In →</Link>
                    </section>
                </div>
            </div>


        </>
    )
}

export default NotAuthorize