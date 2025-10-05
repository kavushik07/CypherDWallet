import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SeedPhrase() {
    const navigate = useNavigate();

    // Initialize 12 empty words
    const [mnemonicWords, setMnemonicWords] = useState(Array(12).fill(""));

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    // Save the words in localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("walletMnemonic", mnemonicWords.join(" "));
    }, [mnemonicWords]);

    const handleInputChange = (index, value) => {
        const newWords = [...mnemonicWords];
        newWords[index] = value;
        setMnemonicWords(newWords);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <motion.div
                className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center min-h-[500px] flex flex-col items-center justify-between"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
            >
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Wallet Setup</h1>
                    <p className="text-gray-600 mb-4 text-sm">
                        Enter your 12-word Secret Recovery Phrase below. Save it securely.
                    </p>

                    <div className="text-left mb-6">
                        <p className="text-gray-700 mb-2"><strong>12-Word Secret Phrase:</strong></p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            {mnemonicWords.map((word, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={word}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className="border p-2 rounded w-full text-center text-black"
                                    placeholder={`Word ${index + 1}`}
                                />
                            ))}
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
            </motion.div>
        </div>
    );
}
