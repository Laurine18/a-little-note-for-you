import { useState, useEffect } from "react";
import { db, ref, get, child } from "../firebase"; // Import Firebase functions
import { motion } from "framer-motion";

export default function MessageExchange() {
  const [message, setMessage] = useState("");
  const [previousMessage, setPreviousMessage] = useState("...");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Fetch the last message from Firebase Realtime Database
    const fetchMessage = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "messages/lastMessage"));
        if (snapshot.exists()) {
          setPreviousMessage(snapshot.val());
        } else {
          setPreviousMessage("No message yet!");
        }
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };
    fetchMessage();
  }, []);

  const handleSubmit = async () => {
    if (message.trim() === "") return;
    try {
      // Store the new message in Firebase
      await set(ref(db, "messages/lastMessage"), message);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {!submitted ? (
          <>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Write a message to brighten a stranger’s day:
            </h1>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message here..."
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontFamily: "'Roboto', sans-serif",
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#2563eb",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Submit
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "medium",
                marginBottom: "10px",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              A message from a stranger:
            </h2>
            <div
              style={{
                padding: "10px",
                background: "#e5e7eb",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            >
              {previousMessage}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
