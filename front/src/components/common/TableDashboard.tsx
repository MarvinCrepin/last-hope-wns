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
import Actions from "../Dashboard/Actions";
import { roleList } from "./Utils";
import { role } from "../../slicer/authSlice";
import { useSelector } from "react-redux";
import { Project, User, Column, TaskInList, RowElement } from "../global";

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
  dataList: Project[] | TaskInList[] | User[];
  loading: boolean;
  columns: Column[];
  clickHandlerRow?: (params: RowElement) => void;
  handleChangeSelect?: (params: RowElement) => void;
  deleteAction?: (params: RowElement) => void;
  viewAction?: (params: RowElement) => void;
  updateAction?: (params: RowElement) => void;
}

export default function TableDashboard({
  dataList,
  loading,
  columns,
  clickHandlerRow,
  handleChangeSelect,
  deleteAction,
  viewAction,
  updateAction,
}: PropsComponent) {
  const userRole = useSelector(role);
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

  React.useEffect(() => {
    setPage(0);
  }, [dataList]);

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
                    <StyledTableRow
                      className={clickHandlerRow && "cursor-pointer"}
                      key={project.id}
                      onClick={() =>
                        clickHandlerRow && clickHandlerRow(project)
                      }
                    >
                      {columns.map((column, index) => {
                        const value = project[column.id];
                        return (
                          <>
                            {column.style === "text" && (
                              <StyledTableCell key={column.id + project.id}>
                                {value ? value : "Not defined"}
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
                                  value={value ? value : 0}
                                  valueBuffer={100}
                                  variant="buffer"
                                ></LinearProgress>
                                <span className="percent-status text-lh-light">
                                  {value ? value : 0} %
                                </span>
                              </StyledTableCell>
                            )}
                            {column.style === "multitext" && (
                              <StyledTableCell key={column.id + project.id}>
                                {value
                                  ? column.metadata.property.map(
                                      (el: string) => {
                                        return (
                                          <span
                                            className="ml-2"
                                            key={
                                              value[el] + column.id + project.id
                                            }
                                          >
                                            {value[el]}
                                          </span>
                                        );
                                      }
                                    )
                                  : "Not defined"}
                              </StyledTableCell>
                            )}
                            {column.style === "date" && (
                              <StyledTableCell key={column.id + project.id}>
                                <Moment format={column.metadata.format}>
                                  {new Date(value)}
                                </Moment>
                              </StyledTableCell>
                            )}
                            {column.style === "actions" && (
                              <StyledTableCell key={column.id + project.id}>
                                {deleteAction && viewAction && updateAction && (
                                  <Actions
                                    updateItem={() => console.log(project)}
                                    viewItem={() => console.log(project)}
                                    deleteItem={() => deleteAction(project)}
                                  />
                                )}
                              </StyledTableCell>
                            )}
                            {column.style === "select" && (
                              <StyledTableCell key={column.id + project.id}>
                                {userRole === "ROLE_DEVELOPER" ? (
                                  <span>{userRole}</span>
                                ) : (
                                  <select
                                    onChange={(
                                      e: React.ChangeEvent<HTMLSelectElement>
                                    ) =>
                                      handleChangeSelect &&
                                      handleChangeSelect({
                                        project,
                                        value: e.target.value,
                                      })
                                    }
                                    id={project.id}
                                    className="w-36 rounded-md bg-lh-light text-lh-dark p-2 mx-2"
                                  >
                                    {roleList.map((roleName) =>
                                      project.roles === roleName ? (
                                        <option selected value={roleName}>
                                          {roleName}
                                        </option>
                                      ) : (
                                        <option value={roleName}>
                                          {roleName}
                                        </option>
                                      )
                                    )}
                                  </select>
                                )}
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
