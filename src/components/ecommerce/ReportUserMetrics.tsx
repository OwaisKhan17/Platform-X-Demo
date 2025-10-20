"use client";
import React from "react";
import { FileText, Users } from "lucide-react";
import StatCard from "../reusable/cards/Cards";

export const ReportUserMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 h-[-webkit-fill-available]">

      <StatCard
        title="Users"
        value={234}
        icon={<Users className="text-gray-800 size-6 dark:text-white/90" />}
        badgeValue="11.01%"
        badgeTrend="up"
        badgeColor="success"
      />

      <StatCard
        title="Reports"
        value="1,259"
        icon={<FileText className="text-gray-800 dark:text-white/90" />}
        badgeValue="9.05%"
        badgeTrend="down"
        badgeColor="error"
      />

    </div>
  );
};
