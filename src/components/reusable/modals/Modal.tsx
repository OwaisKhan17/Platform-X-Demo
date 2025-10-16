"use client";
import React from "react";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";

interface GlobalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
    onConfirm?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    showFooter?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
}

export default function GlobalModal({
    isOpen,
    onClose,
    title = "Modal Title",
    children,
    onConfirm,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    showFooter = true,
    size = "md",
}: GlobalModalProps) {
    const widthClass =
        size === "sm"
            ? "max-w-sm"
            : size === "md"
                ? "max-w-md"
                : size === "lg"
                    ? "max-w-lg"
                    : "max-w-2xl";

    return (
        <Modal isOpen={isOpen} onClose={onClose} className={`${widthClass} p-6 lg:p-8`}>
            {/* Header */}
            {title && (
                <h4 className="font-semibold text-gray-800 mb-6 text-title-sm dark:text-white/90">
                    {title}
                </h4>
            )}

            {/* Body */}
            <div className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                {children}
            </div>

            {/* Footer */}
            {showFooter && (
                <div className="flex items-center justify-end w-full gap-3 mt-8">
                    <Button size="sm" variant="outline" onClick={onClose}>
                        {cancelLabel}
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => {
                            if (onConfirm) onConfirm();
                            onClose();
                        }}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            )}
        </Modal>
    );
}
