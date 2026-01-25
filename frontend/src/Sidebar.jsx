import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { v4 as uuidv4 } from "uuid";

export default function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/thread");
      const response = await res.json();
      const filteredData = response.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filteredData);
      // console.log(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const res = await fetch(
        `http://localhost:8080/api/thread/${newThreadId}`,
      );
      const response = await res.json();
      // console.log(response);
      setPrevChats(response);
      setNewChat(false);
      setReply(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const options = {
        method: "DELETE",
      };

      const res = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
        options,
      );
      const response = await res.json();
      // console.log(response);

      // Re-rendering history after thread delete
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId),
      );

      if (threadId == currThreadId) {
        createNewChat();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="sidebar">
        <button onClick={createNewChat}>
          <img
            src="src/assets/AIConvik.logo.png"
            alt="AIConvik Logo"
            className="logo"
          />
          Create New Chat
          <span>
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
        </button>

        <ul className="history">
          {allThreads?.map((thread, idx) => (
            <li
              key={idx}
              onClick={(e) => changeThread(thread.threadId)}
              className={thread.threadId === currThreadId ? "highlighted" : ""}
            >
              {thread.title}
              <i
                className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId);
                }}
              ></i>
            </li>
          ))}
        </ul>

        <div className="sign">
          {" "}
          Created By{" "}
          <b className="i-letter">
            Sushrut <i className="fa-solid fa-heart"></i>
          </b>
        </div>
      </section>
    </>
  );
}
