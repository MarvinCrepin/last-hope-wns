import {
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  tableCellClasses,
  TablePagination,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Moment from "react-moment";
import React from "react";

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
    fontFamily: "var(--font-text)",
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
  dataList: Project[];
  loading: boolean;
  columns: Column[];
}

export default function TableDashboard({
  dataList,
  loading,
  columns,
}: PropsComponent) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <StyledTableContainer /* component={Paper} */>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableHeaderCell key={column.id}>
                  {column.label}
                </StyledTableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              [1, 2, 3].map((el, index) => {
                return (
                  <StyledTableRow key={index}>
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
                );
              })}

            {!loading && dataList.length > 0 ? (
              dataList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project: any) => {
                  const color =
                    project.advancement >= 60
                      ? "success"
                      : project.advancement <= 30
                      ? "error"
                      : "warning";

                  return (
                    <StyledTableRow key={project.id}>
                      {columns.map((column, index) => {
                        const value = project[column.id];
                        return (
                          <>
                            {column.style === "text" && (
                              <StyledTableCell key={column.id + project.id}>
                                {value}
                              </StyledTableCell>
                            )}
                            {column.style === "linear-bar" && (
                              <StyledTableCell
                                className="relative"
                                key={column.id + project.id}
                              >
                                <LinearProgress
                                  color={color}
                                  className="linearProgress"
                                  value={value}
                                  valueBuffer={100}
                                  variant="buffer"
                                ></LinearProgress>
                                <span className="percent-status text-lh-light">
                                  {value} %
                                </span>
                              </StyledTableCell>
                            )}
                            {column.style === "multitext" && (
                              <StyledTableCell key={column.id + project.id}>
                                {column.metadata.property.map((el: string) => {
                                  return (
                                    <span
                                      className="ml-2"
                                      key={value[el] + column.id + project.id}
                                    >
                                      {value[el]}
                                    </span>
                                  );
                                })}
                              </StyledTableCell>
                            )}
                            {column.style === "date" && (
                              <StyledTableCell key={column.id + project.id}>
                                <Moment format={column.metadata.format}>
                                  {new Date(value)}
                                </Moment>
                              </StyledTableCell>
                            )}
                          </>
                        );
                      })}
                    </StyledTableRow>
                  );
                })
            ) : (
              <StyledTableRow>
                <StyledTableCell>Aucun résultat Trouvé</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledTableContainer>
    </div>
  );
}
