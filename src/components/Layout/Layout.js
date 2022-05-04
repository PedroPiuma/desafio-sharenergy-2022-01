import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            <p>Layout teste</p>
            <ul>
                <li><Link to='/'>Home</Link></li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Layout
