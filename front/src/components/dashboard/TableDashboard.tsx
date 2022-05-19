import {
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  tableCellClasses,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Moment from "react-moment";

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
}

export default function TableDashboard({ projectList }: PropsComponent) {
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
          {projectList.map((project: any) => {
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
                  <span className="percent-status">{project.advancement}</span>
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>
                  <Moment format="YYYY/MM/DD">
                    {new Date(project.due_at)}
                  </Moment>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
