"use client";
import React from "react";
import Button from "../ui/button/Button";

interface CongratsCardProps {
    title?: string;
    message?: string;
    percentage?: string;
    highlightText?: string;
    buttonText?: string;
    imageSrc?: string;
    imageAlt?: string;
    redirectUrl?: string; // new prop
    className?: string;
}

const CongratsCard: React.FC<CongratsCardProps> = ({
    title = "Congratulations John! 🎉",
    message = "You have done",
    percentage = "72% more sales",
    highlightText = "today. Check your new badge in your profile.",
    buttonText = "View Badges",
    imageSrc = "/images/user/man-with-laptop.png",
    imageAlt = "View Badge User",
    redirectUrl = "/badges",
    className = "",
}) => {
    const handleClick = () => {
        window.location.href = redirectUrl;
    };
    return (
        <div
            className={`rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 ${className}`}
        >
            <div className="flex flex-wrap items-start">
                {/* Left Column */}
                <div className="w-full sm:w-7/12">
                    <div className="p-4">
                        <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h5>
                        <p className="mt-1 mb-3 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
                            {message}{" "}
                            <span className="mt-1 font-semibold text-gray-500 text-theme-sm dark:text-gray-400">{percentage}</span>{" "}
                            {highlightText}
                        </p>
                        {buttonText && (
                            <Button
                                onClick={handleClick}
                                size="sm"
                            >
                                {buttonText}
                            </Button>

                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full sm:w-5/12 text-center sm:text-left">
                    <div className="pb-0 px-0 sm:px-6">
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="h-44 mx-auto sm:mx-0 transform rtl:-scale-x-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CongratsCard;
