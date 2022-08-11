export type ClientType = {
    id: string;
    name: string;
    email: string;
    phone: string;
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
