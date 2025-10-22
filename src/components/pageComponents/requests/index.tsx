"use client";
 
import React, { useState } from "react";
import DynamicTable from "@/components/tables/Table";
import GlobalModal from "@/components/reusable/modals/Modal";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { Check, X, Search, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import AlertModal from "@/components/reusable/modals/AlertModal";
 
const initialTableData = [
    {
        id: 1,
        RequestId: "96a2098f586c4de29fc054e151443026",
        EntityType: "P2P Checker Request",
        EntityId: "P2P100008",
        RequestedOn: "10/07/2025 12:58:08 pm",
        Operation: "Add",
        Status: "Pending",
        RequestedBy: "MBone",
        Data: "{\"p2pDetails\":{\"TransactionID\":\"P2P100008\",\"DebtorIBAN\":\"PK32JSBL9999903155995444\",\"DebtorName\":\"MUZAMMIL SIDDIQUI\",\"CreditorIBAN\":\"PK95UBLD0000001013992401\",\"CreditorName\":\"Muhammad Shoaib\",\"TxnDateTime\":\"20251007125808\",\"TxnType\":null,\"TxnStatus\":null,\"TxnAmount\":\"20\",\"TxnCurrency\":\"PKR\",\"IsDebtor\":false,\"TxnStatusUpdated\":null,\"TxnStatusUpdateReasonCode\":null,\"TxnStatusUpdateReason\":null,\"InternalStatus\":null,\"TxnDirection\":null,\"IsResponseAvailable\":null,\"Narration\":\"RAAST P2P Funds Transfer\",\"PurposeOfPayment\":\"001\",\"SettlementDate\":\"20251007\",\"ToMMBID\":\"JINSA\",\"ToAlias\":\"\",\"FromAlias\":\"\",\"FromAccountType\":\"Wallet\",\"ToAccountType\":\"Wallet\"},\"CheckerRequestId\":\"96a2098f586c4de29fc054e151443026\",\"Name\":\"P2P\"}",
        Description: null,
        Selected: null,
        AssignedId: null,
    },
    {
        id: 2,
        RequestId: "a7b3109g697d5ef3afd165f262554137",
        EntityType: "P2P Checker Request",
        EntityId: "P2P100009",
        RequestedOn: "10/08/2025 02:15:22 pm",
        Operation: "Update",
        Status: "Approved",
        RequestedBy: "JDoe",
        Data: "{\"p2pDetails\":{\"TransactionID\":\"P2P100009\",\"DebtorIBAN\":\"PK34MEZN0000001234567891\",\"DebtorName\":\"John Doe\",\"CreditorIBAN\":\"PK12HABB0000001234567890\",\"CreditorName\":\"Ali Hassan\",\"TxnDateTime\":\"20251008141522\",\"TxnType\":null,\"TxnStatus\":null,\"TxnAmount\":\"5000\",\"TxnCurrency\":\"PKR\",\"IsDebtor\":false,\"TxnStatusUpdated\":\"Completed\",\"TxnStatusUpdateReasonCode\":null,\"TxnStatusUpdateReason\":\"Payment for services\",\"InternalStatus\":null,\"TxnDirection\":null,\"IsResponseAvailable\":null,\"Narration\":\"Business Payment\",\"PurposeOfPayment\":\"002\",\"SettlementDate\":\"20251008\",\"ToMMBID\":\"HABB\",\"ToAlias\":\"\",\"FromAlias\":\"\",\"FromAccountType\":\"Wallet\",\"ToAccountType\":\"Wallet\"},\"CheckerRequestId\":\"a7b3109g697d5ef3afd165f262554137\",\"Name\":\"P2P\"}",
        Description: "Update transaction details",
        Selected: null,
        AssignedId: "ADM001",
    },
    {
        id: 3,
        RequestId: "b8c4210h708e6fg4bge276g373665248",
        EntityType: "P2P Checker Request",
        EntityId: "P2P100010",
        RequestedOn: "10/09/2025 09:30:45 am",
        Operation: "Add",
        Status: "Rejected",
        RequestedBy: "SSmith",
        Data: "{\"p2pDetails\":{\"TransactionID\":\"P2P100010\",\"DebtorIBAN\":\"PK78BAHL0000001234567893\",\"DebtorName\":\"David Lee\",\"CreditorIBAN\":\"PK56ALFH0000001234567892\",\"CreditorName\":\"Sarah Smith\",\"TxnDateTime\":\"20251009093045\",\"TxnType\":null,\"TxnStatus\":null,\"TxnAmount\":\"1500\",\"TxnCurrency\":\"PKR\",\"IsDebtor\":false,\"TxnStatusUpdated\":\"Failed\",\"TxnStatusUpdateReasonCode\":\"001\",\"TxnStatusUpdateReason\":\"Insufficient funds\",\"InternalStatus\":null,\"TxnDirection\":null,\"IsResponseAvailable\":null,\"Narration\":\"Personal Transfer\",\"PurposeOfPayment\":\"001\",\"SettlementDate\":\"20251009\",\"ToMMBID\":\"ALFH\",\"ToAlias\":\"\",\"FromAlias\":\"\",\"FromAccountType\":\"Wallet\",\"ToAccountType\":\"Wallet\"},\"CheckerRequestId\":\"b8c4210h708e6fg4bge276g373665248\",\"Name\":\"P2P\"}",
        Description: "New P2P transaction request",
        Selected: null,
        AssignedId: "ADM002",
    },
];
 
const statusColorMap: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    Approved: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Rejected: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};
 
export default function RequestTableClient() {
    const [tableData, setTableData] = useState(initialTableData);
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRow, setSelectedRow] = useState<any>(null);
 
    const approveModal = useModal();
    const declineModal = useModal();
    const approveSuccessModal = useModal();
    const approveErrorModal = useModal();
    const declineSuccessModal = useModal();
    const declineErrorModal = useModal();
    const detailsModal = useModal();
 
    const handleApprove = () => {
        approveModal.openModal();
    };
 
    const confirmApprove = () => {
        approveModal.closeModal();
       
        try {
            const updatedData = tableData.map((item) =>
                selectedRowKeys.includes(item.id)
                    ? { ...item, Status: "Approved" }
                    : item
            );
            setTableData(updatedData);
            setSelectedRowKeys([]);
            approveSuccessModal.openModal();
        } catch (error) {
            approveErrorModal.openModal();
        }
    };
 
    const handleDecline = () => {
        declineModal.openModal();
    };
 
    const confirmDecline = () => {
        declineModal.closeModal();
       
        try {
            const updatedData = tableData.map((item) =>
                selectedRowKeys.includes(item.id)
                    ? { ...item, Status: "Rejected" }
                    : item
            );
            setTableData(updatedData);
            setSelectedRowKeys([]);
            declineSuccessModal.openModal();
        } catch (error) {
            declineErrorModal.openModal();
        }
    };
 
    const handleViewDetails = (row: any) => {
        setSelectedRow(row);
        detailsModal.openModal();
    };
 
    const filteredData = tableData.filter((item) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            item.RequestId.toLowerCase().includes(searchLower) ||
            item.EntityType.toLowerCase().includes(searchLower) ||
            item.RequestedBy.toLowerCase().includes(searchLower) ||
            item.Status.toLowerCase().includes(searchLower) ||
            (item.Description && item.Description.toLowerCase().includes(searchLower))
        );
    });
 
    const columns = [
        {
            key: "RequestId",
            label: "Request ID",
            render: (item: any) => (
                <span className="text-gray-800 dark:text-gray-200 text-sm font-mono">
                    {item.RequestId.substring(0, 8)}...
                </span>
            ),
        },
        {
            key: "RequestedBy",
            label: "Requested By",
            render: (item: any) => (
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {item.RequestedBy}
                </span>
            ),
        },
        {
            key: "EntityType",
            label: "Entity Type",
            render: (item: any) => (
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.EntityType}
                </span>
            ),
        },
        {
            key: "AssignedId",
            label: "Assigned ID",
            render: (item: any) => (
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.AssignedId || "-"}
                </span>
            ),
        },
        {
            key: "Description",
            label: "Description",
            render: (item: any) => (
                <span className="text-gray-600 dark:text-gray-400 max-w-[200px] truncate block text-sm">
                    {item.Description || "-"}
                </span>
            ),
        },
        {
            key: "Status",
            label: "Status",
            render: (item: any) => (
                <span
                    className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        statusColorMap[item.Status] || "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400"
                    )}
                >
                    {item.Status}
                </span>
            ),
        },
        {
            key: "RequestedOn",
            label: "Requested On",
            render: (item: any) => (
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.RequestedOn}
                </span>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (item: any) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleViewDetails(item)}
                        className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all shadow-sm hover:shadow-md"
                    >
                        <Eye size={16} className="text-blue-500" />
                    </Button>
                </div>
            ),
        },
    ];
 
    const getP2PDetails = (dataString: string) => {
        try {
            const parsedData = JSON.parse(dataString);
            return parsedData.p2pDetails || {};
        } catch (error) {
            return {};
        }
    };
 
    return (
        <>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    {/* Header with Actions and Search */}
                    <div className="flex items-center justify-between gap-4">
                        {/* Left Side - Search Bar */}
                        <div className="relative w-80">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search any requests..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            />
                        </div>
                        {/* Right Side - Action Buttons */}
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={handleApprove}
                                disabled={selectedRowKeys.length === 0}
                                className={cn(
                                    "flex items-center gap-2 rounded-xl border transition-all h-[38px] px-4",
                                    selectedRowKeys.length === 0
                                        ? "border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                        : "border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                                )}
                            >
                                <Check size={18} />
                                <span>Approve</span>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleDecline}
                                disabled={selectedRowKeys.length === 0}
                                className={cn(
                                    "flex items-center gap-2 rounded-xl border transition-all h-[38px] px-4",
                                    selectedRowKeys.length === 0
                                        ? "border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                        : "border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                                )}
                            >
                                <X size={18} />
                                <span>Decline</span>
                            </Button>
                        </div>
                    </div>
 
                    {/* Table */}
                    <DynamicTable
                        columns={columns}
                        data={filteredData}
                        rowKey={(r) => r.id}
                        rowSelection={{
                            selectedRowKeys,
                            onChange: setSelectedRowKeys,
                        }}
                    />
                </div>
            </div>
 
            {/* View Details Modal */}
            <GlobalModal
                isOpen={detailsModal.isOpen}
                onClose={detailsModal.closeModal}
                title="Transaction Details"
                confirmLabel="Close"
                showFooter={false}
                size="md"
            >
                {selectedRow ? (
                    <div className="space-y-4">
                        {(() => {
                            const p2pDetails = getP2PDetails(selectedRow.Data);
                            return (
                                <>
                                    {/* Row 1: Transaction ID and Date Time */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                Transaction ID
                                            </p>
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                {p2pDetails.TransactionID || "-"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                Date Time
                                            </p>
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                {selectedRow.RequestedOn}
                                            </p>
                                        </div>
                                    </div>
 
                                    {/* Row 2: To IBAN and To Account Title */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                To IBAN
                                            </p>
                                            <p className="text-sm text-gray-800 dark:text-gray-200 break-all">
                                                {p2pDetails.CreditorIBAN || "-"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                To Account Title
                                            </p>
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                {p2pDetails.CreditorName || "-"}
                                            </p>
                                        </div>
                                    </div>
 
                                    {/* Row 3: From IBAN and From Account Title */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                From IBAN
                                            </p>
                                            <p className="text-sm text-gray-800 dark:text-gray-200 break-all">
                                                {p2pDetails.DebtorIBAN || "-"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                From Account Title
                                            </p>
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                {p2pDetails.DebtorName || "-"}
                                            </p>
                                        </div>
                                    </div>
 
                                    {/* Row 4: Status and Type */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                Status
                                            </p>
                                            <span
                                                className={cn(
                                                    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                                                    statusColorMap[selectedRow.Status] ||
                                                        "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400"
                                                )}
                                            >
                                                {selectedRow.Status}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                Type
                                            </p>
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                {selectedRow.Operation || "-"}
                                            </p>
                                        </div>
                                    </div>
 
                                    {/* Row 5: Amount and Updated Status */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                Amount
                                            </p>
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                {p2pDetails.TxnCurrency || "PKR"}{" "}
                                                {p2pDetails.TxnAmount || "-"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                Updated Status
                                            </p>
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                {p2pDetails.TxnStatusUpdated || "-"}
                                            </p>
                                        </div>
                                    </div>
 
                                    {/* Row 6: Reason (Full Width) */}
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                            Reason
                                        </p>
                                        <p className="text-sm text-gray-800 dark:text-gray-200">
                                            {p2pDetails.TxnStatusUpdateReason ||
                                                p2pDetails.Narration ||
                                                "-"}
                                        </p>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No data available.
                    </p>
                )}
            </GlobalModal>
 
            {/* Approve Confirmation Modal */}
            <GlobalModal
                isOpen={approveModal.isOpen}
                onClose={approveModal.closeModal}
                title="Approve Requests"
                confirmLabel="Approve"
                cancelLabel="Cancel"
                onConfirm={confirmApprove}
                size="sm"
            >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Are you sure you want to approve {selectedRowKeys.length} selected request(s)?
                </p>
            </GlobalModal>
 
            {/* Decline Confirmation Modal */}
            <GlobalModal
                isOpen={declineModal.isOpen}
                onClose={declineModal.closeModal}
                title="Decline Requests"
                confirmLabel="Decline"
                cancelLabel="Cancel"
                onConfirm={confirmDecline}
                size="sm"
            >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Are you sure you want to decline {selectedRowKeys.length} selected request(s)?
                </p>
            </GlobalModal>
 
            {/* Approve Success Alert Modal */}
            <AlertModal
                isOpen={approveSuccessModal.isOpen}
                onClose={approveSuccessModal.closeModal}
                type="success"
                title="Requests Approved Successfully"
                description=""
                buttonText="Okay"
            />
 
            {/* Approve Error Alert Modal */}
            <AlertModal
                isOpen={approveErrorModal.isOpen}
                onClose={approveErrorModal.closeModal}
                type="error"
                title="Failed to Approve Requests"
                description=""
                buttonText="Okay"
            />
 
            {/* Decline Success Alert Modal */}
            <AlertModal
                isOpen={declineSuccessModal.isOpen}
                onClose={declineSuccessModal.closeModal}
                type="success"
                title="Requests Declined Successfully"
                description=""
                buttonText="Okay"
            />
 
            {/* Decline Error Alert Modal */}
            <AlertModal
                isOpen={declineErrorModal.isOpen}
                onClose={declineErrorModal.closeModal}
                type="error"
                title="Failed to Decline Requests"
                description=""
                buttonText="Okay"
            />
        </>
    );
}