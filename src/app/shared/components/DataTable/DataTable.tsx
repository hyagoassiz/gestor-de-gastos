import {
  Pagination,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import {
  Footer,
  Icon,
  StyledBox,
  StyledTableCellBody,
  StyledTableCellHead,
  StyledTableHead,
} from "./styles";
import { IDataColumns } from "../../interfaces";
import useDataTable from "./hooks/useDataTable";

interface IDataTable {
  columns: IDataColumns[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  textForEmptyData: string;
}

export const DataTable: React.FC<IDataTable> = ({
  columns,
  data,
  textForEmptyData,
}) => {
  const { paginatedData, totalPages, page, setPage } = useDataTable({ data });

  return (
    <>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <StyledTableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCellHead size="small" key={column.key}>
                  {column.label}
                </StyledTableCellHead>
              ))}
            </TableRow>
          </StyledTableHead>

          {data.length ? (
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <StyledTableCellBody
                      size="small"
                      key={column.key}
                      style={{
                        ...column?.style,
                        backgroundColor:
                          index % 2 === 0 ? "#F8F9FA" : "#FFFFFF",
                      }}
                    >
                      {row[column.key]}
                    </StyledTableCellBody>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <StyledTableCellBody colSpan={columns.length}>
                  <StyledBox>
                    <Icon />
                    <Typography variant="body2">{textForEmptyData}</Typography>
                  </StyledBox>
                </StyledTableCellBody>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {paginatedData.length > 0 && (
        <Footer spacing={2}>
          <Pagination
            color="primary"
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            shape="rounded"
          />
        </Footer>
      )}
    </>
  );
};
