import { ReportUserMetrics } from "@/components/reports/ReportUserMetrics";
import React from "react";
import CongratsCard from "@/components/user-profile/CongratsCard";
import MonthlyReportsChart from "@/components/reports/MonthlyReportsChart";
import ReportsList from "@/components/reports/ReportList";
import MonthlySuccessfulReports from "@/components/reports/MonthlySuccessfulReports";

export default function Dashboard() {

  const currentHour = new Date().getHours();

  // Determine greeting based on time
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 18) return "Good afternoon";
    return "Good evening";
  };

  const greeting = `${getGreeting()}, Owais! 👋`;

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">

      <div className="col-span-12 space-y-6 xl:col-span-7">
        <CongratsCard
          title={greeting}
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
        <MonthlySuccessfulReports />
      </div>

      <div className="col-span-12">
        <ReportsList />
      </div>

    </div>
  );
}
