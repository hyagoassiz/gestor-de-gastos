import {
  Box,
  Checkbox,
  Pagination,
  Paper,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import Table from "@mui/material/Table";
import {
  Icon,
  StyledBox,
  StyledTableCellBody,
  StyledTableCellHead,
  StyledTableHead,
} from "./styles";
import { useState } from "react";
import { IDataTableColumns } from "../../interfaces";
import { useUrlParams } from "@/hooks/useUrlParams";

interface DataTableProps {
  columns: IDataTableColumns[];
  data: any[];
  textForEmptyData: string;
  selectionMode?: "single" | "multiple";
  rowKey?: string;
  selectedItems?: any[];
  onSelectionChange?: (selected: any[]) => void;
  totalPages?: number;
  page?: number;
  disablePagination?: boolean;
  tableHeight?: number | string;
  toolbar?: React.ReactNode;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  textForEmptyData,
  selectionMode,
  rowKey = "id",
  selectedItems,
  onSelectionChange,
  totalPages,
  page,
  disablePagination = false,
  tableHeight,
  toolbar,
}) => {
  const theme = useTheme();

  const { setParams } = useUrlParams();

  const isSelectable =
    selectionMode === "single" || selectionMode === "multiple";
  const isSingleSelect = selectionMode === "single";
  const isMultipleSelect = selectionMode === "multiple";

  const isControlled =
    selectedItems !== undefined && onSelectionChange !== undefined;
  const [internalSelected, setInternalSelected] = useState<any[]>([]);
  const selected = isControlled ? selectedItems! : internalSelected;
  const isRowSelected = (row: any) =>
    selected.some((item) => item[rowKey] === row[rowKey]);

  const handleSelectionChange = (newSelected: any[]) => {
    if (isControlled) onSelectionChange?.(newSelected);
    else setInternalSelected(newSelected);
  };

  const toggleSelectAll = () => {
    if (!isMultipleSelect) return;
    const allSelected = data.every((row) => isRowSelected(row));
    const newSelected = allSelected
      ? selected.filter(
          (item) => !data.some((row) => row[rowKey] === item[rowKey])
        )
      : [...selected, ...data.filter((row) => !isRowSelected(row))];
    handleSelectionChange(newSelected);
  };

  const toggleRowSelection = (row: any) => {
    if (isSingleSelect) {
      const alreadySelected = isRowSelected(row);
      handleSelectionChange(alreadySelected ? [] : [row]);
    } else {
      const alreadySelected = isRowSelected(row);
      const newSelected = alreadySelected
        ? selected.filter((item) => item[rowKey] !== row[rowKey])
        : [...selected, row];
      handleSelectionChange(newSelected);
    }
  };

  const isAllSelected =
    data.length > 0 && data.every((row) => isRowSelected(row));

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {toolbar && (
          <Box
            px={2}
            py={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="divider"
          >
            {toolbar}
          </Box>
        )}

        <TableContainer sx={{ maxHeight: tableHeight ?? 1000 }}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <StyledTableHead>
              <TableRow>
                {isSelectable && (
                  <StyledTableCellHead padding="checkbox">
                    {isMultipleSelect && (
                      <Checkbox
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        inputProps={{ "aria-label": "select all rows" }}
                      />
                    )}
                  </StyledTableCellHead>
                )}
                {columns.map((column) => (
                  <StyledTableCellHead
                    size="small"
                    key={column.key}
                    align={column.align ?? "left"}
                    sx={{ ...column?.style }}
                  >
                    {column.label}
                  </StyledTableCellHead>
                ))}
              </TableRow>
            </StyledTableHead>

            {data.length ? (
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={row[rowKey] ?? index}
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                      ...row?.style,
                    }}
                  >
                    {isSelectable && (
                      <StyledTableCellBody padding="checkbox">
                        <Checkbox
                          checked={isRowSelected(row)}
                          onChange={() => toggleRowSelection(row)}
                        />
                      </StyledTableCellBody>
                    )}
                    {columns.map((column) => (
                      <StyledTableCellBody
                        size="small"
                        key={column.key}
                        align={column.align ?? "left"}
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
                  <StyledTableCellBody
                    colSpan={columns.length + (isSelectable ? 1 : 0)}
                  >
                    <StyledBox>
                      <Icon color="warning" />
                      <Typography variant="body2">
                        {textForEmptyData}
                      </Typography>
                    </StyledBox>
                  </StyledTableCellBody>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        {!disablePagination && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            sx={{ borderTop: "1px solid", borderColor: "divider" }}
          >
            <Typography variant="body2" color="text.secondary">
              Total de resultados: {data.length}
            </Typography>

            <Pagination
              color="primary"
              count={totalPages}
              page={(page ?? 0) + 1}
              onChange={(_, value) => {
                setParams({ pagina: value });
              }}
              shape="rounded"
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};
