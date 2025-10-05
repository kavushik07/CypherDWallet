import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ethers } from "ethers";

export default function CreateWallet() {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [walletMnemonic, setWalletMnemonic] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }
        if (password.length < 8) {
            setMessage("Password must be at least 8 characters!");
            return;
        }
        // Generate wallet with ethers.js
        const wallet = ethers.Wallet.createRandom();
        localStorage.setItem("walletPassword", password);
        localStorage.setItem("walletAddress", wallet.address);
        localStorage.setItem("walletMnemonic", wallet.mnemonic.phrase);
        setWalletAddress(wallet.address);
        setWalletMnemonic(wallet.mnemonic.phrase);
        setMessage("Wallet created successfully!");
        setTimeout(() => navigate("/wallet-setup", { state: { address: wallet.address, mnemonic: wallet.mnemonic.phrase } }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
        console.log("Show Password:", !showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
        console.log("Show Confirm Password:", !showConfirmPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <motion.div
                className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center min-h-[500px] flex flex-col items-center justify-between"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
            >
                <div>
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Password</h1>
                        <p className="text-gray-600 mb-4 text-sm">
                            This password will unlock your MetaCypher wallet only on this device.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4 w-full text-left">
                            <div>
                                <label className="block text-gray-700 mb-1">New Password (8 characters min)</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        className="w-full p-2 border border-gray-300 rounded-lg pr-10 text-black"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <AiOutlineEye className="text-gray-800" /> : <AiOutlineEyeInvisible className="text-gray-800" />}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm password"
                                        className="w-full p-2 border border-gray-300 rounded-lg pr-10 text-black"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? <AiOutlineEye className="text-gray-800" /> : <AiOutlineEyeInvisible className="text-gray-800" />}
                                    </span>
                                </div>
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full bg-gray-300 text-black-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.8 }}
                            >
                                Confirm
                            </motion.button>
                        </form>
                    </>
                    {message && <p className="mt-4 text-red-500">{message}</p>}
                </div>
                <div></div>
            </motion.div>
        </div>
    );
}