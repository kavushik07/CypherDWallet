import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SeedPhrase() {
    const navigate = useNavigate();

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const { state } = useLocation();
    const storedAddress = localStorage.getItem("walletAddress") || "Not available";
    const storedMnemonic = localStorage.getItem("walletMnemonic") || "Not available";
    const address = state?.address || storedAddress;
    const mnemonic = state?.mnemonic || storedMnemonic;

    useEffect(() => {
        console.log("SeedPhrase State:", state); // Debug state
        console.log("LocalStorage Mnemonic:", storedMnemonic); // Debug localStorage
        console.log("Parsed Mnemonic Array:", mnemonic.split(" ")); // Debug split
    }, [state]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <motion.div
                className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center min-h-[500px] flex flex-col items-center justify-between"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
            >
                <div>
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Wallet Created</h1>
                    <p className="text-gray-600 mb-4 text-sm">
                        Your wallet has been successfully created. Please save the following details securely.
                    </p>
                    <p className="text-gray-600 mb-4 text-sm">
                        Never disclose your Secret Recovery Phrase. Anyone with this phrase can take your assets forever. Don't Store this pharse in any Digital ways also.
                    </p>
                    <div className="text-left mb-6">
                        <p className="text-gray-700 mb-2"><strong>12-Word Secret Phrase:</strong></p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            {mnemonic.split(" ").length > 0 ? (
                                mnemonic.split(" ").map((word, index) => (
                                    <span
                                        key={index}
                                        className="border p-1 rounded bg-white text-black"
                                    >
                                        {word || "N/A"}
                                    </span>
                                ))
                            ) : (
                                <p className="text-red-500">Secret Phrase not available or invalid</p>
                            )}
                        </div>
                    </div>

                    <motion.button
                        className="w-full bg-gray-300 text-black-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => { navigate('/Dashboard'); }}
                    >
                        Proceed to Dashboard
                    </motion.button>
                </div>
                <div></div>
            </motion.div>
        </div>
    );
}