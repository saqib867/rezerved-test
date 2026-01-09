"use client";
import { db } from "@/firebase/firebase";
import { useReportMessages } from "@/hooks/useReportMessage";
import { useSingleReport } from "@/hooks/useSingleReport";
import { useAuthStore } from "@/store/authStore";
import { format } from "date-fns";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "next/navigation";
import React from "react";
import { BiSend } from "react-icons/bi";

const MessagePage = () => {
  const { id } = useParams();
  const [text, setText] = React.useState("");
  const { messages, hasMore, loadMore } = useReportMessages(id as string);
  const { report } = useSingleReport(id as string);
  const { user } = useAuthStore((state) => state);

  console.log("single report => ", report);

  console.log();

  // SCROLL HANDLING
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = React.useState(true);
  const prevScrollHeightRef = React.useRef(0);

  // Detect scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    // If user reaches top → load older messages
    if (scrollTop === 0 && hasMore) {
      loadMore();
    }

    // Determine if user is near bottom (50px threshold)
    const atBottom = scrollHeight - clientHeight - scrollTop < 50;
    setIsAtBottom(atBottom);
  };

  // Maintain scroll on messages update
  React.useEffect(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const newHeight = container.scrollHeight;

    // If loading older messages → restore previous position
    if (prevScrollHeightRef.current && messages.length > 0) {
      const diff = newHeight - prevScrollHeightRef.current;
      container.scrollTop = diff;
    }

    // Auto-scroll only if user is at bottom
    if (isAtBottom) {
      container.scrollTop = container.scrollHeight;
    }

    prevScrollHeightRef.current = newHeight;
  }, [messages]);

  // SEND MESSAGE
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!id || !text) return;

    try {
      const messagesRef = collection(db, "Reports", id as string, "Messages");

      const docRef = await addDoc(messagesRef, {
        code: "TXT",
        content: text,
        createdOn: Timestamp.now(),
        isRead: false,
        messageID: "",
        senderID: user?.uid,
      });

      await setDoc(docRef, { messageID: docRef.id }, { merge: true });

      setText("");

      // Scroll down after sending
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const updateReport = async (id: string, type: string) => {
    try {
      const reportRef = doc(db, "Reports", id);
      await updateDoc(reportRef, { reportStatus: type });
      return { success: true, message: "Report updated successfully" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  return (
    <div className="w-full h-[90vh] flex flex-col relative">
      {/* Header */}
      <div className="border-b border-gray-200 flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={
              report?.reporterImageURL
                ? report?.reporterImageURL
                : "https://api.dicebear.com/7.x/avataaars/svg?seed=Toth"
            }
            alt="Profile"
            className="w-12 h-12 rounded-full ring-2 ring-gray-100"
          />
          <div>
            <h3 className="font-semibold  text-lg">{report?.reporterName}</h3>
            {/* <p className="text-sm text-gray-500">tgerrtt@gmail.com</p> */}
          </div>
        </div>

        <span
          onClick={() => updateReport(id as string, "resolved")}
          className={`${
            report?.reportStatus == "resolved"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          } transition-colors px-6 py-2 rounded-full text-sm font-medium text-white cursor-pointer shadow-md`}
        >
          {report?.reportStatus == "resolved" ? "Resolved" : "Issue Resolve"}
        </span>
      </div>

      {/* Scrollable messages */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-6 py-8"
      >
        <div className="space-y-6">
          {/* Today Date Chip */}

          {/* Messages */}
          {messages.map((msg: any, index) => {
            const isAdmin = msg.senderID === user?.uid;

            return (
              <div
                key={index}
                className={`flex w-full ${
                  isAdmin ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[65%] px-5 py-3.5 shadow-sm ${
                    isAdmin
                      ? "bg-white text-gray-900 rounded-2xl rounded-br-md"
                      : "bg-gray-700 text-white rounded-3xl rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed mb-2">{msg?.content}</p>
                  <p
                    className={`text-xs ${
                      isAdmin ? "text-gray-500" : "text-gray-300"
                    }`}
                  >
                    {msg?.createdOn
                      ? format(msg.createdOn.toDate(), "hh:mm a")
                      : "08:00 PM"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Input */}
      <div className=" px-2 py-2 shadow-lg">
        <div className="mx-auto">
          <form
            onSubmit={sendMessage}
            className="bg-[#0B1739] rounded-full flex items-center   gap-3 px-6 py-2 shadow-md"
          >
            <input
              type="text"
              placeholder="Response Message"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              type="submit"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 transition-colors"
            >
              <BiSend size={22} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
