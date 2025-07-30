import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Switch, IconButton, TextField, MenuItem } from "@mui/material";
import {
  Pencil,
  Plus,
  RotateCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import WarehouseCreateModal from "./WarehouseCreateModal";
import WarehouseUpdateModal from "./WarehouseUpdateModal";

interface Column {
  id: "code" | "name" | "status" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "code", label: "Code", minWidth: 200 },
  { id: "name", label: "Name", minWidth: 300 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

const initialRows: IWarehouse[] = [
  { _id: "W1", code: "WH001", name: "Main Warehouse", status: true },
  { _id: "W2", code: "WH002", name: "Backup Warehouse", status: false },
  { _id: "W3", code: "WH003", name: "Northern WH", status: true },
  { _id: "W4", code: "WH004", name: "Central WH", status: false },
  { _id: "W5", code: "WH005", name: "Southern WH", status: true },
  { _id: "W6", code: "WH006", name: "HCM WH", status: true },
  { _id: "W7", code: "WH007", name: "DN WH", status: true },
  { _id: "W8", code: "WH008", name: "HN WH", status: true },
  { _id: "W9", code: "WH009", name: "HP WH", status: true },
  { _id: "W10", code: "WH0010", name: "CT WH", status: true },
];

const WarehouseManagementTable = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rows, setRows] = useState<IWarehouse[]>(initialRows);

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IWarehouse | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleToggleStatus = (code: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.code === code ? { ...row, status: !row.status } : row
      )
    );
  };

  return (
    <>
      <div className="min-h-[1300] w-full flex flex-col p-6 bg-[#F6F6F6]">
        {/* Add New */}
        <div className="w-full bg-white rounded-lg shadow-md px-4 py-2 flex justify-end mb-6">
          <Button
            variant="contained"
            startIcon={<Plus className="w-5 h-5" />}
            style={{
              backgroundColor: "#FF5353",
              borderRadius: "0.5rem",
              textTransform: "none",
            }}
            className="hover:brightness-110 text-white"
            onClick={() => setOpenModalCreate(true)}
          >
            New
          </Button>
        </div>

        {/* Filter */}
        <div className="w-full bg-white rounded-lg shadow-md px-4 py-4 flex flex-col mb-6">
          {/* Title */}
          <div className="w-full flex items-center border-b border-gray-300 pb-2 mb-10">
            <SlidersHorizontal className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-md font-semibold text-gray-700">Filter</span>
          </div>

          {/* Filter Fields*/}
          <div className="w-full flex gap-10 mb-6">
            {/* Name Input */}
            <div className="flex w-[50%] items-center gap-2">
              <label className="min-w-[60px] text-base font-bold">Name:</label>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter name"
                fullWidth
              />
            </div>
            {/* Status Select */}
            <div className="flex w-[50%] items-center gap-2">
              <label className="min-w-[60px] text-base font-bold">
                Status:
              </label>
              <TextField
                select
                variant="outlined"
                size="small"
                defaultValue=""
                fullWidth
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FF5353",
                borderRadius: "4rem",
                marginRight: "1rem",
                width: "3rem",
                height: "3rem",
                minWidth: "unset",
                padding: 0,
              }}
              className="hover:brightness-110 text-white"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FF5353",
                borderRadius: "4rem",
                width: "3rem",
                height: "3rem",
                minWidth: "unset",
                padding: 0,
              }}
              className="hover:brightness-110 text-white"
            >
              <RotateCw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <Paper sx={{ width: "100%", overflow: "auto", minHeight: "600px" }}>
          <TableContainer
            sx={{
              minHeight: "500px",
              maxHeight: "calc(100vh - 200px)",
              height: "100%",
              overflowY: "auto", // Bật scroll khi vượt quá
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari
              },
            }}
          >
            <Table stickyHeader aria-label="warehouse table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#EFEFEF",
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#333",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id as keyof IWarehouse];

                        if (column.id === "status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Switch
                                checked={row.status}
                                onChange={() => handleToggleStatus(row.code)}
                                sx={{
                                  "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: "#4CAF50",
                                  },
                                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                    {
                                      backgroundColor: "#4CAF50",
                                    },
                                }}
                              />
                            </TableCell>
                          );
                        }

                        if (column.id === "action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <IconButton
                                onClick={() => {
                                  setDataUpdate(row);
                                  setOpenModalUpdate(true);
                                }}
                              >
                                <Pencil className="w-5 h-5" color="#E98641" />
                              </IconButton>
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      <WarehouseCreateModal
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
      />

      <WarehouseUpdateModal
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        setDataUpdate={setDataUpdate}
        dataUpdate={dataUpdate}
      />
    </>
  );
};

export default WarehouseManagementTable;
