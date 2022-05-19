import { TableHead, Avatar, Table, TableRow, TableBody, TableCell, TableContainer, tableCellClasses, tableRowClasses, LinearProgress } from '@mui/material';
import { useQuery } from "@apollo/client";
import GetAllProjects from '../../queries/Project/GetAllProject';
import { styled } from '@mui/material/styles';
import { AnyRecord } from 'dns';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    margin: '3em auto',
    borderRadius: '0.375rem',
    width: '90%',
    boxShadow: '8px 8px 10px rgba(0, 0, 0, 0.25)',
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#FE9595',
      color: theme.palette.common.white,
      fontSize: '1.5em',
      textAlign: 'center',
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: '1em',
        textAlign: 'center',
        color: '#4F4F4F',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:last-child": {
        borderRadius: '0.375rem',
    },
    "&:nth-of-type(odd)": {
        backgroundColor: '#E5E5E5'
    }
}));

const StyledTable = styled(Table)(({ theme }) => ({
    borderRadius: '4px',
}));



export default function TableDashboard() {

    const Test = async() => {
        const { loading, error, data } =  useQuery(GetAllProjects);
        await console.log(data.GetAllProjects)
        return await data.GetAllProjects
    }
    
    Test()

    return (
        <StyledTableContainer /* component={Paper} */>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableHeaderCell>Project</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Project Manager</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Due date</StyledTableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Test().map((data: any) => {
                            const color = data.advancement >= 60 ? "success" : data.advancement <= 30 ? "error" : "warning";
                            <StyledTableRow>
                                <StyledTableCell>Last Hope</StyledTableCell>
                                <StyledTableCell className='relative'><LinearProgress color={color} className='linearProgress' value={data.advancement} valueBuffer={100} variant='buffer'></LinearProgress><span className='percent-status'>80%</span></StyledTableCell>
                                <StyledTableCell>John Doe</StyledTableCell>
                                <StyledTableCell>12/12/2020</StyledTableCell>
                            </StyledTableRow>
                        })
                    }
                    <StyledTableRow>
                        <StyledTableCell>Hope Last</StyledTableCell>
                        <StyledTableCell>60%</StyledTableCell>
                        <StyledTableCell>John Doe</StyledTableCell>
                        <StyledTableCell>12/10/2021</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Avengers</StyledTableCell>
                        <StyledTableCell>40%</StyledTableCell>
                        <StyledTableCell>John Doe</StyledTableCell>
                        <StyledTableCell>17/12/2020</StyledTableCell>
                    </StyledTableRow>
                {/* {fetchData().map((data: {title: string, advancement: number, due_date: Date }) => {
                    <TableRow>
                        <StyledTableCell>{data.title}</StyledTableCell>
                        <StyledTableCell>{data.advancement}</StyledTableCell>
                        <StyledTableCell>{data.title}</StyledTableCell>
                        <StyledTableCell>{data.due_date.toString()}</StyledTableCell>
                    </TableRow>
                })} */}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}