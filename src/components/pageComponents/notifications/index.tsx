"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/tables/Table";
import GlobalModal from "@/components/reusable/modals/Modal";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { AlertTriangle, CheckCircle2, Info, OctagonAlert, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AlertModal from "@/components/reusable/modals/AlertModal";

const initialTableData = [
    {
        id: 1,
        type: "Critical",
        dateTime: "10/07/2025 05:34:36 pm",
        message: "Multiple logins detected for user: admin",
        status: "Read",
        actions: "View Details",
    },
    {
        id: 2,
        type: "Warning",
        dateTime: "10/08/2025 01:12:08 pm",
        message: "Password attempt limit reached for user: demo",
        status: "Unread",
        actions: "View Details",
    },
    {
        id: 3,
        type: "Info",
        dateTime: "10/09/2025 10:24:41 am",
        message: "System maintenance scheduled at 12:00 am",
        status: "Read",
        actions: "View Details",
    },
    {
        id: 4,
        type: "Critical",
        dateTime: "10/10/2025 07:44:29 pm",
        message: "Database connection lost temporarily",
        status: "Unread",
        actions: "View Details",
    },
    {
        id: 5,
        type: "Success",
        dateTime: "10/11/2025 02:18:56 pm",
        message: "Backup completed successfully",
        status: "Read",
        actions: "View Details",
    },
];

const typeConfig: Record<
    string,
    { icon: React.ElementType; color: string; bg: string }
> = {
    Critical: {
        icon: OctagonAlert,
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-50 dark:bg-red-500/10",
    },
    Warning: {
        icon: AlertTriangle,
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-500/10",
    },
    Info: {
        icon: Info,
        color: "text-sky-600 dark:text-sky-400",
        bg: "bg-sky-50 dark:bg-sky-500/10",
    },
    Success: {
        icon: CheckCircle2,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
};

const statusColorMap: Record<string, string> = {
    Read: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Unread:
        "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400",
};

export default function NotificationTableClient() {
    const [tableData, setTableData] = useState(initialTableData);
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
        []
    );

    const detailsModal = useModal();
    const deleteModal = useModal();
    const deleteSuccessModal = useModal();

    const [selectedRow, setSelectedRow] = useState<any>(null);

    const [rowToDelete, setRowToDelete] = useState<any>(null);

    const handleViewDetails = (row: any) => {
        setSelectedRow(row);
        detailsModal.openModal();
    };

    const handleDeleteClick = (row: any) => {
        setRowToDelete(row);
        deleteModal.openModal();
    };

    const confirmDelete = () => {
        setTableData((prev) => prev.filter((item) => item.id !== rowToDelete.id));
        deleteModal.closeModal();
        deleteSuccessModal.openModal();
    };

    const columns = [
        {
            key: "type",
            label: "Type",
            render: (item: any) => {
                const config = typeConfig[item.type] || typeConfig.Info;
                const Icon = config.icon;
                return (
                    <div className={cn("flex items-center gap-2 font-medium", config.color)}>
                        <span
                            className={cn(
                                "p-2 rounded-lg inline-flex items-center justify-center",
                                config.bg
                            )}
                        >
                            <Icon className="w-4 h-4" />
                        </span>
                        <span className="text-sm">{item.type}</span>
                    </div>
                );
            },
        },
        {
            key: "dateTime",
            label: "Date - Time",
            render: (item: any) => (
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.dateTime}
                </span>
            ),
        },
        {
            key: "message",
            label: "Message",
            render: (item: any) => (
                <span className="text-gray-800 dark:text-gray-200 max-w-[350px] truncate block text-sm">
                    {item.message}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (item: any) => (
                <span
                    className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        statusColorMap[item.status] || "bg-gray-100 text-gray-700"
                    )}
                >
                    {item.status}
                </span>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (item: any) => (
                <div className="flex items-center gap-3">
                    {/* View Details Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(item)}
                        className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.05] rounded-full px-4 py-1.5 text-xs font-medium transition-all shadow-sm hover:shadow-md"
                    >
                        <span className="flex items-center gap-1.5">
                            <Info className="w-4 h-4 text-blue-500" />
                            View Details
                        </span>
                    </Button>

                    {/* Delete Button */}
                    <Button
                        onClick={() => handleDeleteClick(item)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all shadow-sm hover:shadow-md"
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            ),
        },

    ];

    return (
        <>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    <DynamicTable columns={columns} data={tableData} rowKey={(r) => r.id} rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                    }} />
                </div>
            </div>

            <GlobalModal
                isOpen={detailsModal.isOpen}
                onClose={detailsModal.closeModal}
                title="Notification Details"
                confirmLabel="Close"
                showFooter={false}
                size="lg"
            >
                {selectedRow ? (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span
                                className={cn(
                                    "p-2 rounded-lg inline-flex items-center justify-center",
                                    selectedRow.type === "Critical" && "animate-ping",
                                    selectedRow.type === "Success" && "animate-bounce",
                                    typeConfig[selectedRow.type]?.bg || typeConfig.Info.bg
                                )}
                            >
                                {React.createElement(
                                    typeConfig[selectedRow.type]?.icon || typeConfig.Info.icon,
                                    {
                                        className: cn(
                                            "w-5 h-5",
                                            typeConfig[selectedRow.type]?.color
                                        ),
                                    }
                                )}
                            </span>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                                <p
                                    className={cn(
                                        "text-sm font-medium",
                                        typeConfig[selectedRow.type]?.color || typeConfig.Info.color
                                    )}
                                >
                                    {selectedRow.type}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Date - Time</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {selectedRow.dateTime}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Message</p>
                            <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
                                {selectedRow.message}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                            <span
                                className={cn(
                                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                    statusColorMap[selectedRow.status] || statusColorMap.Unread
                                )}
                            >
                                {selectedRow.status}
                            </span>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No data available.</p>
                )}

            </GlobalModal>

            <GlobalModal
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.closeModal}
                title="Confirm Deletion"
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={confirmDelete}
            >
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete{" "}
                    <span className="font-medium">{rowToDelete?.type}</span> notification?
                    This action cannot be undone.
                </p>
            </GlobalModal>

            <AlertModal
                isOpen={deleteSuccessModal.isOpen}
                onClose={deleteSuccessModal.closeModal}
                type="success"
                title="Well Done!"
                description="Your action was successful."
            />

        </>
    );
}
