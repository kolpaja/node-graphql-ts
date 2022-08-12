import {
    Box,
    Button,
    Divider,
    FormControl,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ClientType } from '../../pages/Clients/types';
import { ADD_CLIENT } from '../../apollo/mutations/client.muations';
import { GET_CLIENTS } from '../../apollo/queries/client.query';
import { useMutation } from '@apollo/client';

type AddClientFormProps = {
    isEdit?: boolean;
    values: Omit<ClientType, 'id'>;
    onClose: () => void;
    addClient?: (variables: any) => void;
};

function AddClientForm({ isEdit, onClose }: AddClientFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient, { data, loading, error }] = useMutation(ADD_CLIENT, {
        variables: {
            name,
            email,
            phone,
        },
        update(cache, { data: { addClient } }) {
            const { clients }: any = cache.readQuery({
                query: GET_CLIENTS,
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: clients.concat(addClient),
                },
            });
        },
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log('onSubmit', name, email, phone);
        if (name === '' || email === '' || phone === '') {
            return alert('Please fill in all fields');
        }
        addClient();
        if (!error && !loading) return onClose();
    };

    return (
        <Stack
            direction="column"
            sx={{
                p: '20px 15px',
                width: 400,
            }}
            spacing={{ xs: 1, sm: 3, md: 5, lg: 7, xl: 8 }}
            position="relative"
        >
            {/*X Close drawer btn */}
            <IconButton
                onClick={onClose}
                size="medium"
                sx={{ position: 'absolute', top: 10, right: 15 }}
            >
                <CloseIcon />
            </IconButton>

            <Stack spacing={2}>
                <Typography variant="h5" component={'h5'} textAlign="center">
                    Add New Client
                </Typography>
                <Divider />
            </Stack>

            <form onSubmit={onSubmit}>
                <Stack direction="column" sx={{}} spacing={5}>
                    <FormControl>
                        <TextField
                            variant="outlined"
                            label="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value.trim())}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            variant="outlined"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            variant="outlined"
                            label="Phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.trim())}
                        />
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button
                            fullWidth
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color={'primary'}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
}

export default AddClientForm;
