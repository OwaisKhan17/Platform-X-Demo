"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import Button from "../ui/button/Button";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlySuccessfulReports() {

  const totalReports = 180;
  const successfulReports = 47;

  // Calculate success percentage
  const successRate = ((successfulReports / totalReports) * 100).toFixed(2);

  const series = [parseFloat(successRate)];

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] h-[-webkit-fill-available]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6 h-full">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Monthly Successful Reports
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Successful reports downloaded out of all the generated reports
            </p>
          </div>
          <div className="relative inline-block">
            <Button
              size="sm"
            >
              View More
            </Button>
          </div>
        </div>
        <div className="relative mt-[50px]">
          <div className="max-h-[330px]">
            <ReactApexChart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

        </div>
        <p className="text-sm text-gray-500 mt-10 text-center leading-relaxed">
          Out of <span className="font-semibold text-gray-700 dark:text-gray-400">{totalReports}</span> total reports generated this month,{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-400">{successfulReports}</span> were successfully downloaded,
          achieving a success rate of <span className="font-semibold text-blue-600 dark:text-white/90">{successRate}%</span>.
        </p>
      </div>

    </div>
  );
}
