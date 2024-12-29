import { Outlet } from "react-router-dom"
import { SkeletonTheme } from 'react-loading-skeleton'

const Layout = () => {
    return (
        <SkeletonTheme baseColor="#48426d" highlightColor="#312c51">
            <Outlet />
        </SkeletonTheme>
    )
}

export default Layout