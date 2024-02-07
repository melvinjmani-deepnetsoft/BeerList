import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../components/header';

interface HeaderBarLayoutProps {
    children?: ReactNode;
}

const HeaderBarLayout: FC<HeaderBarLayoutProps> = () => {
    return (
        <>
            <Header />
            <div style={{ padding: "2%" }}>
                <Outlet />
            </div> 
        </>
    )
}
export default HeaderBarLayout;