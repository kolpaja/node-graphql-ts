import { Button, Container, Box } from '@mui/material';
import { ReactComponent as Error404icon } from '../../assets/svg/404_Error_with_a_cute_animal.svg';

function NotFound() {
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
                <Error404icon />
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

export default NotFound;
