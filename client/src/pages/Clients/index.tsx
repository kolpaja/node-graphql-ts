import {useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
    Box,
    Chip,
    Container,
    Divider,
    IconButton,
    SwipeableDrawer,
} from '@mui/material';
import { GET_CLIENTS } from '../../apollo/queries/client.query';
import { ClientType } from './types';
import { DELETE_CLIENT } from '../../apollo/mutations/client.muations';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import AddClientForm from '../../components/forms/AddClientForm';
import ClientsTable from '../../components/Table';
import Loading from '../../components/Loading';

function Clients() {
    const [isOpen, setIsOpen] = useState(false);
    //todo edit clients
    const [clientValues, setClientValues] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        update(cache, { data: { deleteClient } }) {
            const existingData: any = cache.readQuery({
                query: GET_CLIENTS,
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: existingData.clients.filter(
                        (client: ClientType) => client.id !== deleteClient.id
                    ),
                },
            });
        },
    });

    if (loading) return <Loading isLoading={loading} />;

    if (error) return <p>Something went wrong</p>;

    return (
        <Container maxWidth={false} sx={{ pt: 4 }}>
            <Divider textAlign="left">
                <Chip label="Active Clients" />
            </Divider>

            {/* Add new client */}
            <Box>
                <IconButton onClick={handleOpen}>
                    <PersonAddRoundedIcon />
                </IconButton>
            </Box>
            <SwipeableDrawer
                anchor="right"
                open={isOpen}
                onClose={handleClose}
                onOpen={handleOpen}
            >
                <AddClientForm
                    isEdit={false}
                    values={clientValues}
                    onClose={handleClose}
                />
            </SwipeableDrawer>

            {/* Display all active clients */}
            {!loading && !error && (
                <ClientsTable
                    deleteClient={deleteClient}
                    clients={data.clients}
                />
            )}
        </Container>
    );
}

export default Clients;
