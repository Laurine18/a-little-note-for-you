import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MessageExchange() {
  const [message, setMessage] = useState("");
  const [previousMessage, setPreviousMessage] = useState("...");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedMessage = localStorage.getItem("lastMessage") || "No message yet!";
    setPreviousMessage(storedMessage);
  }, []);

  const handleSubmit = () => {
    if (message.trim() === "") return;
    localStorage.setItem("lastMessage", message);
    setSubmitted(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f3f4f6", padding: "20px" }}>
      <div style={{ maxWidth: "400px", width: "100%", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", textAlign: "center" }}>
        {!submitted ? (
          <>
            <h1 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Write a message to brighten a stranger’s day:</h1>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message here..."
              style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
            />
            <button onClick={handleSubmit} style={{ width: "100%", padding: "10px", backgroundColor: "#2563eb", color: "white", borderRadius: "6px", border: "none", cursor: "pointer" }}>
              Submit
            </button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2 style={{ fontSize: "16px", fontWeight: "medium", marginBottom: "10px" }}>A message from a stranger:</h2>
            <div style={{ padding: "10px", background: "#e5e7eb", borderRadius: "6px", fontSize: "16px" }}>
              {previousMessage}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
