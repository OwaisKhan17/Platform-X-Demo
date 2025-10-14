import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import CongratsCard from "@/components/user-profile/CongratsCard";

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
        <EcommerceMetrics />
      </div>

      <div className="col-span-12 space-y-6 xl:col-span-7">

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12">
        <RecentOrders />
      </div>

    </div>
  );
}
