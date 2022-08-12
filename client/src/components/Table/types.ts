import { ClientType } from '../../pages/Clients/types';
export type ClientsTableProps = {
    clients: ClientType[];
    editClient?: () => void;
    deleteClient: (variables: any) => void;
};

export interface IColumn {
    name: string;
    label: string;
    minWidth: number;
}

export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void;
}
