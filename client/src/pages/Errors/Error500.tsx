import { Button, Container, Box } from '@mui/material';
import { ReactComponent as Error500icon } from '../../assets/svg/500_Internal_Server_Error.svg';

function Error500() {
    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: '10px',
            }}
        >
            <Box
                sx={{
                    textTransform: 'uppercase',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Error500icon />
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        textTransform: 'uppercase',
                    }}
                    href="/"
                >
                    Go back home
                </Button>
            </Box>
        </Container>
    );
}

export default Error500;
