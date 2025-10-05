import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home"); // Match menuTabs
  const [balance, setBalance] = useState(100);
  const [transactions, setTransactions] = useState([]);
  const [pendingTx, setPendingTx] = useState({ recipient: "", amount: "" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [secretPhrase, setSecretPhrase] = useState("");

  const cryptoData = [
    { name: "Bitcoin", symbol: "BTC", price: "$26,000" },
    { name: "Ethereum", symbol: "ETH", price: "$1,900" },
    { name: "Mock ETH", symbol: "ETH", price: "$100" },
    { name: "Solana", symbol: "SOL", price: "$268.93" },
  ];

  const menuTabs = ["Home", "Send", "History"];

  const handleSendSubmit = (e) => {
    e.preventDefault();
    if (!pendingTx.recipient || !pendingTx.amount) return;
    setModalOpen(true);
  };

  const handleConfirm = () => {
    const amountNum = Number(pendingTx.amount);
    if (amountNum <= balance) {
      setBalance(balance - amountNum);
      setTransactions([
        ...transactions,
        {
          hash: Math.random().toString(36).substring(2),
          ...pendingTx,
          date: new Date().toLocaleString(),
        },
      ]);
      setPendingTx({ recipient: "", amount: "" });
      setSecretPhrase("");
      setModalOpen(false);
      setActiveTab("Home");
    } else {
      alert("Insufficient balance!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 flex flex-col justify-between"
      >
        {/* Balance and Content Section */}
        <div className="mb-6">
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="wait">
              {activeTab === "Home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl shadow-md cursor-pointer transition"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Balance</h2>
                    <p className="text-4xl font-extrabold text-gray-900">{balance} ETH</p>
                  </motion.div>
                  <div className="max-h-60 overflow-y-auto overflow-hidden space-y-3">
                    {cryptoData.map((coin, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl shadow-md cursor-pointer transition"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-800">{coin.name}</h3>
                          <p className="text-gray-500 text-sm">{coin.symbol}</p>
                        </div>
                        <p className="font-bold text-gray-900">{coin.price}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "Send" && (
                <motion.div
                  key="send"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Send ETH</h2>
                  <form onSubmit={handleSendSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Recipient Address"
                      value={pendingTx.recipient}
                      onChange={(e) => setPendingTx({ ...pendingTx, recipient: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg pr-10 text-black"
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      value={pendingTx.amount}
                      onChange={(e) => setPendingTx({ ...pendingTx, amount: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg pr-10 text-black"
                      max={balance}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Send
                    </motion.button>
                  </form>
                </motion.div>
              )}
              {activeTab === "History" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 p-4"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaction History</h2>
                  <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-200">
                    {transactions.length > 0 ? (
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 sticky top-0">
                          <tr>
                            <th className="border-b p-2 text-gray-700">Transaction Address</th>
                            <th className="border-b p-2 text-gray-700">To</th>
                            <th className="border-b p-2 text-gray-700">Amount</th>
                            <th className="border-b p-2 text-gray-700">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((tx, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                              <td className="border-b p-2 text-gray-800">{tx.hash}</td>
                              <td className="border-b p-2 text-gray-800">{tx.recipient}</td>
                              <td className="border-b p-2 text-gray-800">{tx.amount}</td>
                              <td className="border-b p-2 text-gray-800">{tx.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-600 p-2">No transactions yet.</p>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-around bg-gray-50 p-3 rounded-2xl shadow-inner"
        >
          {menuTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 mx-1 py-3 rounded-xl text-black-800 font-semibold transition ${activeTab === tab ? "bg-blue-200" : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              key="modal"
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white text-black p-6 rounded-2xl shadow-lg w-80"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Confirm Transaction</h3>
                <p className="mb-2">
                  Send {pendingTx.amount} ETH to {pendingTx.recipient}?
                </p>
                <input
                  type="password"
                  placeholder="Enter Secret Phrase"
                  value={secretPhrase}
                  onChange={(e) => setSecretPhrase(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={!secretPhrase}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Dashboard;