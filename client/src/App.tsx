import React, { useContext, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layouts/AppLayout';
import Home from './pages/Home';
import About from './pages/About';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import { createTheme, ThemeProvider } from '@mui/material';
import { ColorModeContext } from './context/ColorModeContext';

function App() {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === 'light' ? 'dark' : 'light'
                );
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </AppLayout>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
