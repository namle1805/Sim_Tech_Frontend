import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton, Box } from "@mui/material";
import {
  Pencil,
  Plus,
  RotateCw,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { Input, DatePicker, Popconfirm } from "antd";
import TypeTemplateModal from "./TypeTemplateModal";

interface Column {
  id: "templateName" | "createdBy" | "createdAt" | "status" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "templateName", label: "Template Name", minWidth: 300 },
  { id: "createdBy", label: "Created By", minWidth: 150 },
  { id: "createdAt", label: "Created At", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

const initialRows: ITemplate[] = [
  {
    _id: "T1",
    templateName: "Technical Log Book",
    createdBy: "Tan Loc",
    createdAt: "2025-07-01T10:30:00Z",
    status: true,
  },
  {
    _id: "T2",
    templateName: "Pool Trainer Handover For Training",
    createdBy: "Hoai Nam",
    createdAt: "2025-07-15T14:45:00Z",
    status: false,
  },
  {
    _id: "T3",
    templateName: "Training Equipment Handover",
    createdBy: "Van Khai",
    createdAt: "2025-06-20T08:10:00Z",
    status: true,
  },
  {
    _id: "T4",
    templateName: "Training Equipment Handover V.2",
    createdBy: "Tan Loc",
    createdAt: "2025-06-20T08:10:00Z",
    status: true,
  },
  {
    _id: "T5",
    templateName: "Pool Trainer Handover For Training V.2",
    createdBy: "Hoai Nam",
    createdAt: "2025-06-20T08:10:00Z",
    status: true,
  },
  {
    _id: "T6",
    templateName: "Training Equipment Handover V.2",
    createdBy: "Van Khai",
    createdAt: "2025-06-20T08:10:00Z",
    status: true,
  },
];

const { RangePicker } = DatePicker;

const TemplateTable = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rows, setRows] = useState<ITemplate[]>(initialRows);

  const [openModalTypeTemplate, setOpenModalTypeTemplate] =
    useState<boolean>(false);

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteUser = async (_id: string) => {
    setIsDeleteUser(true);
    console.log(`Delete template: `, _id);
    setIsDeleteUser(false);
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
            onClick={() => setOpenModalTypeTemplate(true)}
          >
            New Template
          </Button>
        </div>

        {/* Filter */}
        <div className="w-full bg-white rounded-lg shadow-md px-4 py-4 flex flex-col mb-6">
          {/* Title */}
          <div className="w-full flex items-center border-b border-gray-300 pb-2 mb-10">
            <SlidersHorizontal className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-md font-semibold text-gray-700">Filter</span>
          </div>

          {/* Filter Fields */}
          <div className="w-full flex flex-col gap-6">
            {/* Row 1: Template Name */}
            <div className="flex flex-row w-full items-center">
              <label className="w-[200px] text-base font-bold">
                Template Name:
              </label>
              <Input style={{ height: 35 }} className="flex-1" />
            </div>

            {/* Row 2: Created At */}
            <div className="flex flex-row w-[50%] items-center">
              <label className="w-[200px] text-base font-bold">
                Created At:
              </label>
              <RangePicker style={{ height: 35 }} className="flex-1" />
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
            <Table stickyHeader aria-label="template table">
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
                        const value = row[column.id as keyof ITemplate];

                        if (column.id === "status") {
                          let bgColor = "#eee";
                          let textColor = "#666";
                          let label = "";

                          if (value) {
                            bgColor = "#E9F9EE";
                            textColor = "#2E7D32";
                            label = "Active";
                          } else {
                            bgColor = "#FDECEA";
                            textColor = "#D32F2F";
                            label = "Inactive";
                          }

                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Box
                                sx={{
                                  display: "inline-block",
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: "12px",
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  backgroundColor: bgColor,
                                  color: textColor,
                                  textTransform: "capitalize",
                                }}
                              >
                                {label}
                              </Box>
                            </TableCell>
                          );
                        }

                        if (column.id === "action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <div className="flex items-center gap-2">
                                <IconButton>
                                  <Pencil className="w-5 h-5" color="#E98641" />
                                </IconButton>
                                <Popconfirm
                                  placement="leftTop"
                                  title={"Delete template"}
                                  description={
                                    "Are you sure you want to delete this template?"
                                  }
                                  onConfirm={() => handleDeleteUser(row._id)}
                                  okText="Delete"
                                  cancelText="Cancel"
                                  okButtonProps={{
                                    loading: isDeleteUser,
                                    style: {
                                      backgroundColor: "#FF3A31",
                                      color: "white",
                                      boxShadow:
                                        "0 4px 12px rgba(0, 0, 0, 0.4)",
                                    },
                                  }}
                                  cancelButtonProps={{
                                    style: {
                                      color: "black",
                                      boxShadow:
                                        "0 4px 12px rgba(0, 0, 0, 0.4)",
                                    },
                                  }}
                                >
                                  <IconButton
                                    disabled={!row.status}
                                    className={
                                      !row.status
                                        ? "opacity-50 pointer-events-none cursor-not-allowed"
                                        : ""
                                    }
                                  >
                                    <Trash2
                                      className="w-5 h-5"
                                      color="#D32F2F"
                                    />
                                  </IconButton>
                                </Popconfirm>
                              </div>
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

      <TypeTemplateModal
        openModalTypeTemplate={openModalTypeTemplate}
        setOpenModalTypeTemplate={setOpenModalTypeTemplate}
      />
    </>
  );
};

export default TemplateTable;
