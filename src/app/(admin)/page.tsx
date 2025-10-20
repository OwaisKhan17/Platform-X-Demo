import { ReportUserMetrics } from "@/components/ecommerce/ReportUserMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import CongratsCard from "@/components/user-profile/CongratsCard";
import MonthlyReportsChart from "@/components/ecommerce/MonthlyReportsChart";

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">

      <div className="col-span-12 space-y-6 xl:col-span-7">
        <CongratsCard
          title="Good afternoon, John! 👋"
          message="You’ve received"
          percentage="8"
          highlightText="requests"
          buttonText="View Requests"
          imageSrc="/images/user/man-with-laptop.png"
        />
      </div>

      <div className="col-span-12 space-y-6 xl:col-span-5">
        <ReportUserMetrics />
      </div>

      <div className="col-span-12 space-y-6 xl:col-span-7">

        <MonthlyReportsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <RecentOrders />
      </div>

    </div>
  );
}
