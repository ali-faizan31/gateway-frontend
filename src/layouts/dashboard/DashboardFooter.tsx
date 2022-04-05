import { FFooter, FItem } from 'ferrum-design-system'
import React from 'react'
import { Link } from 'react-router-dom'
import { PATH_AUTH } from '../../routes/paths'

const DashboardFooter = () => {
    return (
        <>
            <FFooter showLogo={false}>
                <FItem align="center">
                    Admin?
                    <Link
                        className="primary-color text-decoration-none "
                        to={PATH_AUTH.orgLogin}
                    >
                       Login Here
                    </Link>
                </FItem>
            </FFooter>
        </>
    )
}

export default DashboardFooter