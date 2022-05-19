import { TableHead, Table, TableRow, TableBody, TableCell, TableContainer, tableCellClasses, tableRowClasses } from '@mui/material';
import { useQuery } from "@apollo/client";
import getAllProjects from '../../queries/Project/GetAllProject';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxWidth: '80%',
    margin: '0 auto',
    borderRadius: '4px'
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#FE9595',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:last-child": {
        borderRadius: '25%  ',
        border: "1px solid transparent"
    },
    "&:nth-child(odd)": {
        backgroundColor: '#E5E5E5'
    }
}));

const StyledTable = styled(Table)(({ theme }) => ({
    borderRadius: '4px',
}));

// function fetchData() {
//     const { loading, error, data } = useQuery(getAllProjects);
//     if (loading) return null;
//     if (error) return `Error! ${error}`;
//     return data;
// }

export default function TableDashboard() {
    return (
        <StyledTableContainer /* component={Paper} */>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Project</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Project Manager</StyledTableCell>
                        <StyledTableCell>Due date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <TableCell>Last Hope</TableCell>
                        <TableCell>80%</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>12/12/2020</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Hope Last</TableCell>
                        <TableCell>60%</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>12/10/2021</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Avengers</TableCell>
                        <TableCell>40%</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>17/12/2020</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Jack et Mich</TableCell>
                        <TableCell>50%</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>21/08/2022</TableCell>
                    </StyledTableRow>
                {/* {fetchData().map((data: {title: string, advancement: number, due_date: Date }) => {
                    <TableRow>
                        <TableCell>{data.title}</TableCell>
                        <TableCell>{data.advancement}</TableCell>
                        <TableCell>{data.title}</TableCell>
                        <TableCell>{data.due_date.toString()}</TableCell>
                    </TableRow>
                })} */}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}