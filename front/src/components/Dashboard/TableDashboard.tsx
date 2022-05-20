
import {
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  tableCellClasses,
  LinearProgress,
  TablePagination,
  TableFooter
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Moment from "react-moment";
import React from 'react';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: "3em auto",
  borderRadius: "0.375rem",
  width: "90%",
  boxShadow: "8px 8px 10px rgba(0, 0, 0, 0.25)",
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FE9595",
    color: theme.palette.common.white,
    fontSize: "1.5em",
    textAlign: "center",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1em",
    textAlign: "center",
    color: "#4F4F4F",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child": {
    borderRadius: "0.375rem",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#E5E5E5",
  },
}));

interface PropsComponent {
  projectList: Project[];
  loading: boolean;
}

export default function TableDashboard({
  projectList,
  loading,
}: PropsComponent) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
 
      // Avoid a layout jump when reaching the last page with empty rows.
      const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projectList.length) : 0;
  return (
    <div>
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
          {loading &&
            [1, 2, 3].map((el) => {
              return (
                <>
                  <StyledTableRow key={el}>
                    <StyledTableCell>
                      <span className="inline-block opacity-60  h-7 w-52 bg-lh-secondary animate-pulse"></span>
                    </StyledTableCell>
                    <StyledTableCell>
                      <span className="inline-block opacity-60 h-7 w-52 bg-lh-secondary animate-pulse"></span>
                    </StyledTableCell>
                    <StyledTableCell>
                      <span className="inline-block opacity-60 h-7 w-52 bg-lh-secondary animate-pulse"></span>
                    </StyledTableCell>
                    <StyledTableCell>
                      <span className="inline-block  opacity-60 h-7 w-52 bg-lh-secondary animate-pulse"></span>
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              );
            })}

          {!loading && projectList.length > 0 ? (
            projectList.map((project: any) => {
              const color =
                project.advancement >= 60
                  ? "success"
                  : project.advancement <= 30
                  ? "error"
                  : "warning";
              return (
                <StyledTableRow key={project.id}>
                  <StyledTableCell>{project.title}</StyledTableCell>
                  <StyledTableCell className="relative">
                    <LinearProgress
                      color={color}
                      className="linearProgress"
                      value={project.advancement}
                      valueBuffer={100}
                      variant="buffer"
                    ></LinearProgress>
                    <span className="percent-status">
                      {project.advancement} % 
                    </span>
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    <Moment format="YYYY/MM/DD">
                      {new Date(project.due_at)}
                    </Moment>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <>Aucun résultat Trouvé</>
          )}
        </TableBody>
        <TableFooter>
          {/* <TableRow>
          <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={projectList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page"
                  }
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                //ActionsComponent={TablePaginationActions}
                //component={Box}
                labelDisplayedRows={({ page }) => {
                  return `Page: ${page}`;
                }}
                backIconButtonProps={{
                  color: "secondary"
                }}
                nextIconButtonProps={{ color: "secondary" }}
                showFirstButton={true}
                showLastButton={true}
                labelRowsPerPage={<span>Rows:</span>}
              />
          </TableRow> */}
        </TableFooter>
      </Table>      
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={projectList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </StyledTableContainer>

    
    </div>
  );
}
