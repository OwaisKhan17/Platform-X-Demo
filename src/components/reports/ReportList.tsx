import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

// Define the TypeScript interface for each transaction report
interface TransactionReport {
  id: number;
  fileName: string; // Name of the downloaded report
  format: string; // File format (PDF, Excel, CSV, etc.)
  downloadDateTime: string; // Date and time when downloaded
  fileSize: string; // Size of the file
  status: "Success" | "Failed" | "Error"; // Download status
  image: string; // Thumbnail or icon for file type
}

// Define table data
const tableData: TransactionReport[] = [
  {
    id: 1,
    fileName: "Monthly_Transactions_Jan_2025",
    format: "PDF",
    downloadDateTime: "2025-10-09 14:32",
    fileSize: "2.4 MB",
    status: "Success",
    image: "/images/files/pdf.png", // Replace with your file icons
  },
  {
    id: 2,
    fileName: "Quarterly_Report_Q2",
    format: "Excel",
    downloadDateTime: "2025-10-08 18:10",
    fileSize: "1.8 MB",
    status: "Failed",
    image: "/images/files/excel.png",
  },
  {
    id: 3,
    fileName: "Yearly_Overview_2024",
    format: "CSV",
    downloadDateTime: "2025-10-07 10:45",
    fileSize: "3.1 MB",
    status: "Success",
    image: "/images/files/csv.png",
  },
  {
    id: 4,
    fileName: "Branch_Report_North",
    format: "PDF",
    downloadDateTime: "2025-10-05 16:22",
    fileSize: "2.9 MB",
    status: "Error",
    image: "/images/files/pdf.png",
  },
  {
    id: 5,
    fileName: "Weekly_Summary",
    format: "Excel",
    downloadDateTime: "2025-10-03 09:15",
    fileSize: "1.2 MB",
    status: "Success",
    image: "/images/files/excel.png",
  },
];

export default function ReportsList() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Downloaded Transactions Report
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Report Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Download Date/Time
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                File Size
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={report.image}
                        className="h-[50px] w-[50px]"
                        alt={report.fileName}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {report.fileName}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {report.format}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {report.downloadDateTime}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {report.fileSize}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      report.status === "Success"
                        ? "success"
                        : report.status === "Failed"
                        ? "error"
                        : "warning"
                    }
                  >
                    {report.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
