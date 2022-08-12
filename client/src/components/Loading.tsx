import { Backdrop, CircularProgress } from '@mui/material';

type LoadingProps = {
    isLoading: boolean;
};

function Loading({ isLoading }: LoadingProps) {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: 100,
            }}
            open={isLoading}
        >
            <CircularProgress color="secondary" />
        </Backdrop>
    );
}

export default Loading;
