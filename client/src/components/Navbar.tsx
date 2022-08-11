import React, { MouseEvent, useState } from 'react';
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Tooltip,
    Avatar,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../context/ColorModeContext';
import { ReactComponent as GraphqlIcon } from '../assets/svg/graphql.svg';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const pages = ['clients', 'projects', 'about'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color="secondary">
            <Container maxWidth="xl">
                <Toolbar>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 1,
                            pt: 1,
                        }}
                    >
                        <Link to="/">
                            <GraphqlIcon
                                style={{
                                    fill: `${
                                        theme.palette.mode === 'dark'
                                            ? '#E10098'
                                            : '#fff'
                                    }`,
                                }}
                            />
                        </Link>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        <Link to={`/${page}`}>{page}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'block', md: 'none' },
                            mr: 2,
                        }}
                    >
                        <Link to="/">
                            <GraphqlIcon />
                        </Link>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link to={`/${page}`}>{page}</Link>
                            </Button>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            mr: 3,
                        }}
                    >
                        <IconButton
                            onClick={colorMode.toggleColorMode}
                            color="inherit"
                        >
                            {theme.palette.mode === 'dark' ? (
                                <Tooltip title="Turn on the light">
                                    <DarkModeIcon />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Turn off the light">
                                    <LightModeIcon />
                                </Tooltip>
                            )}
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Sokol Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
