import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import DynamicTable from "@/components/tables/Table";
import Badge from "@/components/ui/badge/Badge";
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

    const columns = [
        {
            key: "type",
            label: "Type",
        },
        { key: "dateTime", label: "Date - Time" },
        {
            key: "message",
            label: "Message",
        },
        {
            key: "status",
            label: "Status",

        },
        { key: "actions", label: "Actions" },
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
