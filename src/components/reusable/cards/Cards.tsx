"use client";

import React from "react";
import { cn } from "@/lib/utils"; // optional helper if you use it
import { ArrowUp, ArrowDown } from "lucide-react";
import Badge from "@/components/ui/badge/Badge";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    badgeValue?: string;
    badgeTrend?: "up" | "down" | "neutral";
    badgeColor?: "primary" | "success" | "warning" | "error";
    className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    badgeValue,
    badgeTrend = "neutral",
    badgeColor = "primary",
    className,
}) => {
    const getTrendIcon = () => {
        if (badgeTrend === "up") return <ArrowUp className="size-4" />;
        if (badgeTrend === "down") return <ArrowDown className="size-4" />;
        return null;
    };

    return (
        <div
            className={cn(
                "rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6",
                className
            )}
        >
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                {icon}
            </div>

            {/* Content */}
            <div className="flex items-end justify-between mt-5">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {title}
                    </span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                        {value}
                    </h4>
                </div>

                {badgeValue && (
                    <Badge
                        variant="light"
                        color={badgeColor}
                        size="md"
                        startIcon={badgeTrend === "up" || badgeTrend === "down" ? getTrendIcon() : undefined}
                    >
                        {badgeValue}
                    </Badge>
                )}
            </div>
        </div>
    );
};

export default StatCard;
