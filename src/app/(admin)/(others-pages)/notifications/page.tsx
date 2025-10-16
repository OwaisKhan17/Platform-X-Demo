import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import DynamicTable from "@/components/tables/Table";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import React from "react";

const tableData = [
    {
        id: 1,
        type: "Critical", // maps from "Title"
        dateTime: "10/07/2025 05:34:36 pm", // from "CreatedDateTime"
        message: "Multiple logins detected for user: admin", // from "Message"
        status: "Read", // from "IsRead"
        actions: "View Details", // or could be a button/action later
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


export default function Notifications() {

    const typeColorMap: Record<string, string> = {
        Critical: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
        Warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
        Info: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
        Success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    };

    const statusColorMap: Record<string, string> = {
        Read: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
        Unread: "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400",
    };

    function cn(...classes: (string | boolean | undefined | null)[]) {
        return classes.filter(Boolean).join(" ");
    }

    const columns = [
        {
            key: "type",
            label: "Type",
            render: (item: any) => (
                <span
                    className={cn(
                        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize",
                        typeColorMap[item.type] || "bg-gray-100 text-gray-700"
                    )}
                >
                    {item.type}
                </span>
            ),
        },
        {
            key: "dateTime",
            label: "Date - Time",
            render: (item: any) => (
                <span className="text-gray-600 dark:text-gray-400">{item.dateTime}</span>
            ),
        },
        {
            key: "message",
            label: "Message",
            render: (item: any) => (
                <span className="text-gray-800 dark:text-gray-200 max-w-[350px] truncate block">
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
                <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/[0.05] rounded-xl transition-all"
                >
                    {item.actions}
                </Button>
            ),
        },
    ];

    return (
        <div>
            <PageBreadcrumb pageTitle="Notifications" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    <DynamicTable columns={columns} data={tableData} rowKey={(r) => r.id} />
                </div>
            </div>
        </div>
    );
}
