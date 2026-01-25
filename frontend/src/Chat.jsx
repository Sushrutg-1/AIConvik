import { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { MyContext } from "./MyContext";

// Formating Text
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }

    if (!prevChats?.length) return;

    const content = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;

      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  return (
    <>
      {newChat && <h1>Talk To A<b className="i-letter">I</b>Convik...</h1>}
      <div className="chats">
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "AIConvikDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMsg">{chat.content}</p>
            ) : (
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </Markdown>
            )}
          </div>
        ))}

        {prevChats.length > 0 && (
          <>
            {latestReply !== null ? (
              <div className="AIConvikDiv" key={"typingEffect"}>
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {latestReply}
                </Markdown>
              </div>
            ) : (
              <div className="AIConvikDiv" key={"typingEffect"}>
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {prevChats[prevChats.length - 1].content}
                </Markdown>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
