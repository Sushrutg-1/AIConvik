import { useContext, useEffect, useState } from "react";
import Chat from "./Chat";
import "./Chatwindow.css";
import { MyContext } from "./MyContext";
import { RingLoader } from "react-spinners";

export default function Chatwindow() {
  const {
    prompt,
    setPrompt,
    currThreadId,
    setCurrThreadID,
    reply,
    setReply,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    if (!prompt) {
      return;
    }
    setLoading(true);
    setNewChat(false);

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch(
        "https://aiconvik.onrender.com/api/chat",
        options,
      );
      const reply = await response.json();
      // console.log(reply.reply);
      setReply(reply.reply);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }
    setPrompt("");
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="chatWindow">
        <div className="navbar">
          <span className="BrandName">
            A<b className="i-letter">I</b>Convik
            <i className="fa-solid fa-angle-down"></i>
          </span>
          <div className="=userIconDiv" onClick={handleProfileClick}>
            <span className="userIcon">
              <i className="fa-solid fa-user"></i>
            </span>
          </div>
        </div>

        {isOpen && (
          <div className="dropDown">
            <div className="dropDownItem">
              <i className="fa-solid fa-gear"></i> Setting
            </div>
            <div className="dropDownItem">
              <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade
            </div>
            <div className="dropDownItem">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Log-Out
            </div>
          </div>
        )}

        <Chat> </Chat>
        <RingLoader color={"rgba(0, 242, 255, 0.5)"} loading={loading} />
        <div className="chatInput">
          <div className="inputBox">
            <input
              type="text"
              placeholder="Ask AIConvik"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
            />
            <div id="submit" onClick={getReply}>
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>
          <p className="info">
            A<b className="i-letter">I</b>Convik can make mistakes, so
            double-check it!
          </p>
        </div>
      </div>
    </>
  );
}
