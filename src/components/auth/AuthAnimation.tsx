import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Brand Logo */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 mt-[-100px]"
            >
                <Image
                    src="/images/brand-logo.png"
                    alt="TPS"
                    className="dark:hidden"
                    width={160}
                    height={70}
                />
                <Image
                    src="/images/brand-logo-white.png"
                    alt="TPS"
                    className="hidden dark:block"
                    width={160}
                    height={70}
                />
            </motion.div>

            {/* Platform Text */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-[38px] font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-widest"
            >
                Platform
            </motion.div>

            <motion.svg
                width="160"
                height="160"
                viewBox="0 0 200 200"
                className="mb-8"
            >
                <motion.line
                    x1="40"
                    y1="40"
                    x2="160"
                    y2="160"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="text-black dark:text-white"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        delay: 1.2,
                        duration: 0.8,
                        opacity: { delay: 1.2, duration: 0.2 },
                    }}
                />

                <motion.line
                    x1="160"
                    y1="40"
                    x2="40"
                    y2="160"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="text-black dark:text-white"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        delay: 2.2,
                        duration: 0.8,
                        opacity: { delay: 2.2, duration: 0.2 },
                    }}
                />
            </motion.svg>


            {/* Login Form */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2, duration: 0.7 }}
                className="p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg w-[360px]"
            >
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
                            <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
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
            </motion.div>
        </div>
    );
}
