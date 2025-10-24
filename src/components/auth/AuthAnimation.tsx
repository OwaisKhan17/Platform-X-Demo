import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeClosed, ArrowRight } from "lucide-react";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { TPSLogo } from "../reusable/svgs/icons";
import Lottie from "lottie-react";
import WaveAnimation from "@/components/reusable/animations/WaveLoop3.json";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const logoVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.3 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
            },
        },
    };

    const platformTextVariants = {
        hidden: { opacity: 0, y: 0, scale: 1 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: 1.5,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
            },
        },
    };

    const xWithLineVariants = {
        hidden: { opacity: 0, x: -50, scale: 0.5 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                delay: 2.5,
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
            },
        },
    };

    const formVariants = {
        hidden: { opacity: 0, y: 80, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: 3.8,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
            },
        },
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    const platformText = "PLATFORM";

    return (
        <div className="relative flex flex-col mt-[-20px] items-center justify-center w-full min-h-screen bg-[#f9fafb00] dark:bg-[#15223d61] overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 -z-20">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/videos/backgroundvideo.webm" type="video/webm" />
                </video>

                {/* Video overlay for theme adaptation */}
                <div className="absolute inset-0 bg-white/40 dark:bg-black/50" />

                {/* Additional subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/60 dark:to-gray-900/60" />
            </div>

            <div className="max-w-md relative w-full mt-5">
                <motion.div
                    variants={logoVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute left-[-12px] -top-[20px]"
                >
                    <div className="mb-3">
                        <TPSLogo width={100} height={50} />
                    </div>
                </motion.div>
            </div>

            <motion.div
                variants={platformTextVariants}
                initial="hidden"
                animate="visible"
                className="mb-0"
            >
                <div className="flex items-center gap-3 relative">
                    <h1 className="text-2xl md:text-[68px] font-light text-gray-800 dark:text-gray-200 tracking-[0.2em] uppercase">
                        {platformText.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 1.5 + index * 0.1,
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.div
                        variants={xWithLineVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute right-[-25px] top-[38px]"
                    >
                        <svg
                            width="200"
                            height="100"
                            viewBox="0 0 80 150"
                            className="text-[170px] w-[130px] h-[240px] absolute top-[-60px] left-[-30px] text-black dark:text-white"
                        >
                            <motion.line
                                x1="10"
                                y1="25"
                                x2="40"
                                y2="55"
                                stroke="currentColor"
                                strokeWidth="7"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{
                                    delay: 3,
                                    duration: 0.6,
                                    ease: "easeInOut",
                                }}
                            />

                            <motion.line
                                x1="50"
                                y1="10"
                                x2="0"
                                y2="70"
                                stroke="currentColor"
                                strokeWidth="7"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{
                                    delay: 3.4,
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                            />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                <div className="p-8 bg-white dark:bg-gray-800 dark:border-gray-700 border border-gray-200 rounded-2xl shadow-lg mt-8">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                        Sign In
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                        Enter your username and password to sign in!
                    </p>

                    <form className="space-y-5">
                        <div>
                            <Label>
                                Username <span className="text-red-500">*</span>
                            </Label>
                            <Input placeholder="Enter your username" type="text" />
                        </div>

                        <div>
                            <Label>
                                Password <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <Eye className="text-gray-500 dark:text-gray-400" />
                                    ) : (
                                        <EyeClosed className="text-gray-500 dark:text-gray-400" />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={setIsChecked}
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-400">
                                    Remember me
                                </span>
                            </div>
                            <Link
                                href="/reset-password"
                                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button className="w-full" size="sm">
                            Sign in
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
