import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function MessageExchange() {
  const [message, setMessage] = useState("");
  const [previousMessage, setPreviousMessage] = useState("...");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Fetch the last message from storage (mocked here, replace with real API call)
    const storedMessage = localStorage.getItem("lastMessage") || "No message yet!";
    setPreviousMessage(storedMessage);
  }, []);

  const handleSubmit = () => {
    if (message.trim() === "") return;
    localStorage.setItem("lastMessage", message); // Store new message
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md p-6 text-center shadow-lg bg-white rounded-2xl">
        {!submitted ? (
          <>
            <h1 className="text-xl font-semibold mb-4">Write a message to brighten a stranger’s day:</h1>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message here..."
              className="mb-4 w-full p-2 border border-gray-300 rounded-md"
            />
            <Button onClick={handleSubmit} className="w-full">Submit</Button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2 className="text-lg font-medium mb-4">A message from a stranger:</h2>
            <CardContent className="p-4 bg-gray-200 rounded-lg text-lg">
              {previousMessage}
            </CardContent>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
