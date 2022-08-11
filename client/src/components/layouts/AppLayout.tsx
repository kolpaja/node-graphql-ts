import { Container, Toolbar } from '@mui/material';
import React, { ReactNode } from 'react';
import Navbar from '../Navbar';

interface AppLayoutProps {
    children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <Navbar />
            <Toolbar>{children}</Toolbar>
        </>
    );
}

export default AppLayout;
