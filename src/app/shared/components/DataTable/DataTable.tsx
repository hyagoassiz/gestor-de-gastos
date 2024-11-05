import { TableBody, TableContainer, TableRow, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import { ITableColumn } from "../../interfaces";
import {
  Icon,
  StyledBox,
  StyledTableCellBody,
  StyledTableCellHead,
  StyledTableHead,
} from "./styles";

interface IDataTable {
  columns: ITableColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  textForEmptyData: string;
}

export const DataTable: React.FC<IDataTable> = ({
  columns,
  data,
  textForEmptyData,
}) => {
  return (
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
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <StyledTableCellBody
                    size="small"
                    key={column.key}
                    style={{ ...column?.style }}
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
  );
};
