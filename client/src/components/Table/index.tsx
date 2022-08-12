import React, { useState } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import {
    Box,
    IconButton,
    TableContainer,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableRow,
    TableFooter,
    TableHead,
    Paper,
    TablePagination,
    Typography,
    Stack,
} from '@mui/material';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    TablePaginationActionsProps,
    ClientsTableProps,
    IColumn,
} from './types';
import { ClientType } from '../../pages/Clients/types';

const clientsColumns = [
    { label: 'Name', name: 'name', minWidth: 200 },
    { label: 'Email', name: 'email', minWidth: 200 },
    { label: 'Phone', name: 'phone', minWidth: 200 },
];

function ClientsTable({
    clients,
    deleteClient,
    editClient,
}: ClientsTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const mappedClients = clients.map((client: any, idx: number) =>
        Object.assign({ nr: idx + 1 }, client)
    );

    return (
        <TableContainer component={Paper} elevation={3} sx={{ mt: 2 }}>
            <MuiTable
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell width={40} />
                        {clientsColumns.length > 0 &&
                            clientsColumns.map(
                                (column: IColumn, idx: number) => (
                                    <TableCell
                                        key={column.name}
                                        style={{
                                            minWidth: column.minWidth,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                )
                            )}
                        <TableCell width={40} />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {clients.length > 0 ? (
                        mappedClients
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((client: any, idx: number) => {
                                return (
                                    <TableRow key={client.id}>
                                        <TableCell width={40}>
                                            {client.nr}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {client.name}
                                        </TableCell>
                                        <TableCell width={160}>
                                            {client.email}
                                        </TableCell>
                                        <TableCell width={160}>
                                            {client.phone}
                                        </TableCell>
                                        <TableCell width={160}>
                                            <IconButton
                                                color="secondary"
                                                aria-label="delete"
                                                onClick={() =>
                                                    deleteClient({
                                                        variables: {
                                                            id: client.id,
                                                        },
                                                    })
                                                }
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                    ) : (
                        <TableRow>
                            <Box width={100} height={40}>
                                <Typography variant="h6" component="h6">
                                    No Data
                                </Typography>
                            </Box>
                        </TableRow>
                    )}
                </TableBody>
            </MuiTable>
            <TablePagination
                rowsPerPageOptions={[8, 15, 30, 50, 100]}
                component="div"
                count={clients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default ClientsTable;
