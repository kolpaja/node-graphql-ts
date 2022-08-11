import { Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../Navbar';

interface AppLayoutProps {
    children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <CssBaseline />
            <Navbar />
            <Toolbar>{children}</Toolbar>
        </>
    );
}

export default AppLayout;
