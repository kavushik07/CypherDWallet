import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };
    const navigate = useNavigate();

    const handleCreateWallet = () => {
        navigate("/create-wallet");
    };

    const handleImportWallet = () =>{
        navigate("/import-wallet");
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <motion.div
                className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center min-h-[500px] flex flex-col items-center justify-between"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
            >
                <div>
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to MetaCypher</h1>

                    <ul className="text-left mt-12 space-y-8">
                        <li className="flex items-center">
                            <span className="text-yellow-500 mr-2">▶Swap to get instant USD</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-yellow-500 mr-2">▶Buy at an affordable price</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-yellow-500 mr-2">▶14+ Chains Supported - more coming soon!</span>
                        </li>
                    </ul>
                </div>

                <div className="space-y-3 w-full flex flex-col items-center">
                    <motion.button
                        className="w-3/4 bg-yellow-400 text-black-800 font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={handleCreateWallet}
                    >
                        CREATE WALLET
                    </motion.button>
                    <motion.button
                        className="w-3/4 bg-white text-black-800 font-semibold py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={handleImportWallet}
                    >
                        IMPORT WALLET
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

const box = {
    width: 100,
    height: 100,
    borderRadius: 5,
};