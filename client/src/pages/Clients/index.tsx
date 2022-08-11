import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    Backdrop,
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    useTheme,
} from '@mui/material';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GET_CLIENTS } from '../../apollo/queris/client.query';
import { ClientType, IColumn, TablePaginationActionsProps } from './types';

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

function Clients() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [columns, setColumns] = useState<IColumn[]>([]);

    const { loading, error, data } = useQuery(GET_CLIENTS);

    /**
     * @returns the columns headers
     * @description filters the names of the project item
     * @see checkout for the `array.slice(2)` compare it with the data for the query
     */
    const getColums = (): IColumn[] => {
        if (!loading && !error) {
            const columsHeaders = Object.keys(data?.clients[0]).slice(2);
            const columns = columsHeaders.map((column) => {
                return {
                    name: column,
                    label: column.toLocaleUpperCase(),
                    minWidth: 170,
                };
            });
            return columns;
        } else return [];
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClientDelete = (id: string) =>
        console.log('Deleting client with id:', id);

    useEffect(() => {
        const cols = getColums();
        setColumns(cols);
    }, [data]);

    if (loading)
        return (
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
        );

    if (error) return <p>Something went wrong</p>;

    return (
        <>
            {!loading && !error && (
                <TableContainer component={Paper} elevation={3} sx={{ mt: 8 }}>
                    <Table
                        sx={{ minWidth: 500 }}
                        aria-label="custom pagination table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell width={40} />
                                {columns.length > 0 &&
                                    columns.map((column, idx) => (
                                        <TableCell
                                            key={column.name}
                                            style={{
                                                minWidth: column.minWidth,
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                <TableCell width={40} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.clients.length > 0 ? (
                                data.clients.map(
                                    (client: ClientType, idx: number) => {
                                        return (
                                            <TableRow key={client.id}>
                                                <TableCell width={40}>
                                                    {idx + 1}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    name
                                                </TableCell>
                                                <TableCell
                                                    style={{ width: 160 }}
                                                >
                                                    email
                                                </TableCell>
                                                <TableCell
                                                    style={{ width: 160 }}
                                                >
                                                    phone
                                                </TableCell>
                                                <TableCell
                                                    style={{ width: 60 }}
                                                >
                                                    <IconButton
                                                        color="secondary"
                                                        aria-label="delete"
                                                        onClick={() =>
                                                            handleClientDelete(
                                                                client.id
                                                            )
                                                        }
                                                    >
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                )
                            ) : (
                                <Box>No Data</Box>
                            )}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[
                                        5,
                                        10,
                                        25,
                                        { label: 'All', value: -1 },
                                    ]}
                                    colSpan={3}
                                    count={data.clients.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}

export default Clients;
