import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Box } from "@mui/material";
import {
  CircleX,
  CloudDownload,
  RotateCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import dayjs from "dayjs";
import type { DatePickerProps } from "antd";
import { DatePicker, Select } from "antd";
import ReportResponseModal from "./ReportResponseClose";
import ReportCloseModal from "./ReportCloseModal";

interface Column {
  id:
    | "no"
    | "dateRaised"
    | "techlogRaised"
    | "description"
    | "dateCleared"
    | "techlogCleared"
    | "status"
    | "note"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "no", label: "No.", minWidth: 50 },
  { id: "dateRaised", label: "Date raised", minWidth: 100 },
  { id: "techlogRaised", label: "Techlog raised", minWidth: 100 },
  { id: "description", label: "Description & Troubleshooting", minWidth: 300 },
  { id: "dateCleared", label: "Date cleared", minWidth: 100 },
  { id: "techlogCleared", label: "Techlog cleared", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "note", label: "Note", minWidth: 150 },
  { id: "action", label: "Action", minWidth: 100 },
];

const initialRows: IReport[] = [
  {
    _id: "1",
    dateRaised: new Date("2025-07-01"),
    dateCleared: new Date("2025-07-02"),
    techlogRaised: 1001,
    techlogCleared: 2001,
    description: "Error in cooling system detected",
    status: "Opening",
    note: "Cleared after system reboot",
  },
  {
    _id: "2",
    dateRaised: new Date("2025-07-03"),
    dateCleared: new Date("2025-07-05"),
    techlogRaised: 1002,
    techlogCleared: 2002,
    description: "Network latency spike",
    status: "Opening",
    note: "Switched to backup network",
  },
  {
    _id: "3",
    dateRaised: new Date("2025-07-04"),
    dateCleared: new Date("2025-07-04"),
    techlogRaised: 1003,
    techlogCleared: 2003,
    description: "Power fluctuation in lab 2",
    status: "Closed",
    note: "Issue due to overloaded circuit",
  },
  {
    _id: "4",
    dateRaised: new Date("2025-07-06"),
    dateCleared: new Date("2025-07-07"),
    techlogRaised: 1004,
    techlogCleared: 2004,
    description: "Printer malfunction",
    status: "Closed",
    note: "Replaced ink cartridge",
  },
  {
    _id: "5",
    dateRaised: new Date("2025-07-08"),
    dateCleared: new Date("2025-07-10"),
    techlogRaised: 1005,
    techlogCleared: 2005,
    description: "Software crash during demo",
    status: "Closed",
    note: "Patch released by vendor",
  },
  {
    _id: "6",
    dateRaised: new Date("2025-07-09"),
    dateCleared: new Date("2025-07-09"),
    techlogRaised: 1006,
    techlogCleared: 2006,
    description: "WiFi instability in zone A",
    status: "Closed",
    note: "Router restarted",
  },
  {
    _id: "7",
    dateRaised: new Date("2025-07-11"),
    dateCleared: new Date("2025-07-11"),
    techlogRaised: 1007,
    techlogCleared: 2007,
    description: "Unauthorized access alert",
    status: "Closed",
    note: "False positive due to test",
  },
  {
    _id: "8",
    dateRaised: new Date("2025-07-12"),
    dateCleared: new Date("2025-07-13"),
    techlogRaised: 1008,
    techlogCleared: 2008,
    description: "System update failure",
    status: "Closed",
    note: "Manual update performed",
  },
  {
    _id: "9",
    dateRaised: new Date("2025-07-14"),
    dateCleared: new Date("2025-07-15"),
    techlogRaised: 1009,
    techlogCleared: 2009,
    description: "Hard disk space full",
    status: "Closed",
    note: "Archived old logs",
  },
  {
    _id: "10",
    dateRaised: new Date("2025-07-16"),
    dateCleared: new Date("2025-07-17"),
    techlogRaised: 1010,
    techlogCleared: 2010,
    description: "Temperature sensor error",
    status: "Closed",
    note: "Recalibrated sensor",
  },
];

const ReportManagementTable = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rows, setRows] = useState<IReport[]>(initialRows);

  const [openModalResponse, setOpenModalResponse] = useState<boolean>(false);
  const [openModalClose, setOpenModalClose] = useState<boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleTechlogRaised = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div className="min-h-[1300] w-full flex flex-col p-6 bg-[#F6F6F6]">
        {/* Export */}
        <div className="w-full bg-white rounded-lg shadow-md px-4 py-2 flex justify-end mb-6">
          <Button
            variant="contained"
            startIcon={<CloudDownload className="w-5 h-5" />}
            style={{
              backgroundColor: "#FF5353",
              borderRadius: "0.5rem",
              textTransform: "none",
            }}
            className="hover:brightness-110 text-white"
          >
            Export
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
            {/* Row 1: Techlog raised / cleared */}
            <div className="flex gap-10">
              <div className="flex flex-col w-[50%] gap-2">
                <label className="min-w-[60px] text-base font-bold">
                  Techlog raised:
                </label>
                <Select
                  style={{ width: "100%", height: 35 }}
                  onChange={handleTechlogRaised}
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                  ]}
                />
              </div>
              <div className="flex flex-col w-[50%] gap-2">
                <label className="min-w-[60px] text-base font-bold">
                  Techlog cleared:
                </label>
                <Select
                  style={{ width: "100%", height: 35 }}
                  onChange={handleTechlogRaised}
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                  ]}
                />
              </div>
            </div>

            {/* Row 2: Techlog raised date / cleared date */}
            <div className="flex gap-10">
              <div className="flex flex-col w-[50%] gap-2">
                <label className="min-w-[60px] text-base font-bold">
                  Techlog raised:
                </label>
                <DatePicker onChange={onChange} style={{ height: 35 }} />
              </div>
              <div className="flex flex-col w-[50%] gap-2">
                <label className="min-w-[60px] text-base font-bold">
                  Techlog cleared:
                </label>
                <DatePicker onChange={onChange} style={{ height: 35 }} />
              </div>
            </div>

            {/* Row 3: Status */}
            <div className="flex gap-10 pr-10">
              <div className="flex flex-col w-[50%] gap-2">
                <label className="min-w-[60px] text-base font-bold">
                  Status:
                </label>
                <Select
                  style={{ width: "100%", height: 35 }}
                  onChange={handleTechlogRaised}
                  options={[
                    { value: "Opening", label: "Opening" },
                    { value: "Closed", label: "Closed" },
                  ]}
                />
              </div>
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
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari
              },
            }}
          >
            <Table stickyHeader aria-label="report management table">
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
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id as keyof IReport];

                        if (column.id === "no") {
                          return (
                            <TableCell key="no" align={column.align}>
                              {page * rowsPerPage + index + 1}
                            </TableCell>
                          );
                        }

                        if (column.id === "status") {
                          let bgColor = "#eee";
                          let textColor = "#666";
                          const label = String(value);

                          if (label.toLowerCase() === "opening") {
                            bgColor = "#FFF9E5";
                            textColor = "#D29B00";
                          } else if (label.toLowerCase() === "closed") {
                            bgColor = "#E9F9EE";
                            textColor = "#2E7D32";
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
                          const status = String(row.status).toLowerCase();
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {status === "opening" && (
                                <div className="flex flex-col gap-3">
                                  <Button
                                    variant="contained"
                                    style={{
                                      backgroundColor: "#FF5353",
                                      borderRadius: "0.5rem",
                                      textTransform: "none",
                                      fontSize: "0.85rem",
                                    }}
                                    className="hover:brightness-110 text-white"
                                    onClick={() => {
                                      setOpenModalResponse(true);
                                    }}
                                  >
                                    Response
                                  </Button>
                                  <Button
                                    variant="contained"
                                    startIcon={<CircleX className="w-4 h-4" />}
                                    style={{
                                      backgroundColor: "#28A745",
                                      borderRadius: "0.5rem",
                                      textTransform: "none",
                                      fontSize: "0.85rem",
                                    }}
                                    className="hover:brightness-110 text-white"
                                    onClick={() => {
                                      setOpenModalClose(true);
                                    }}
                                  >
                                    Close
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {(column.id === "dateRaised" ||
                              column.id === "dateCleared") &&
                            value
                              ? dayjs(value).format("DD-MMM-YY")
                              : `${value ?? ""}`}
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

      <ReportResponseModal
        openModalResponse={openModalResponse}
        setOpenModalResponse={setOpenModalResponse}
      />

      <ReportCloseModal
        openModalClose={openModalClose}
        setOpenModalClose={setOpenModalClose}
      />
    </>
  );
};

export default ReportManagementTable;
