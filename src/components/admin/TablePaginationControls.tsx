
import {Box, FormControl, InputLabel, Select, MenuItem, Pagination, Typography, SelectChangeEvent} from '@mui/material';
import React from "react";

interface Props {
    limit: number;
    onLimitChange: (event: SelectChangeEvent<number>, child?: React.ReactNode) => void;
    totalPages: number;
    page: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    totalItems: number;
    itemName: string;
}

export const TablePaginationControls: React.FC<Props> = (props: Props) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
            <FormControl variant="outlined" size="small">
                <InputLabel>Itens por página</InputLabel>
                <Select
                    value={props.limit}
                    onChange={props.onLimitChange}
                    label="Itens por página"
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
            <Pagination
                count={props.totalPages}
                page={props.page}
                onChange={props.onPageChange}
                color="primary"
                showFirstButton
                showLastButton
            />
            <Typography variant="body2" color="text.secondary">
                Total de {props.itemName}: {props.totalItems}
            </Typography>
        </Box>
    );
};