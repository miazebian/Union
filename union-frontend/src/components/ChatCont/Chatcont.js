import React, { useState, useEffect, useRef } from "react";
import "./chatcont.css";
import PropTypes from "prop-types";
import { FiPaperclip } from "react-icons/fi";
import axios from "axios";

Chatcont.propTypes = { currentChatuser: PropTypes.string.isRequired };

function Chatcont({ currentChatuser }) {
  const scrollRef = useRef(null);
  const [message, setmessage] = useState([]);
  const id = localStorage.getItem("AccountID");
  const [input, setinput] = useState("");
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  // console.log(`Name: '${currentChatuser.Name}'`);

  const [groupacc, setgroupacc] = useState([]);

  const [inacc, setinacc]=useState(true);
  //console.log(currentChatuser);

  useEffect(() => {
    if (currentChatuser._id !== undefined && inacc) {
      
      axios
        .get(
          `http://localhost:5300/api/auth/getAccount/${currentChatuser.Sender}`,
          {}
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setgroupacc((prev) => [...prev, data]);
        })
        .catch((err) => {
          console.log(err);
        });
      //   console.log(currentChatuser.Receiver);
      currentChatuser.Receiver.map((el) => {
        //    console.log(1);
        axios
          .get(`http://localhost:5300/api/auth/getAccount/${el}`, {})
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            setgroupacc((prev) => [...prev, data]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      setinacc(false);
    }
  }, [groupacc, currentChatuser, inacc]);
  //console.log((currentChatuser));

  const [uniqueAccounts, setunique] = useState([]);
  useEffect(() => {
    if (groupacc.length !== 0) {
      //removing duplicates from account1
      setunique(
        groupacc.filter((item, index) => {
          return (
            groupacc.findIndex((acc) => acc.AccountID === item.AccountID) ===
            index
          );
        })
      );
    }
  }, [groupacc]);

  useEffect(() => {
    if (currentChatuser._id !== undefined) {
      axios
        .get(
          `http://localhost:5300/api/msg/get/chat/msg/group/${currentChatuser._id}`
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          data[data.length] = { Name: currentChatuser.Name };
          setmessage(data);
        })
        .catch((err) => {
          console.log(err);
        });
      //console.log(message);
    } else {
      axios
        .get(
          `http://localhost:5300/api/msg/get/chat/msg/${id}/${currentChatuser.AccountID}`
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => setmessage(data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, currentChatuser, message]);

  // console.log(message[message.length-1].Name);

  //console.log(groupacc);

  const sendmsg = () => {
    if (input !== "") {
      const messages = {
        myself: true,
        message: input,
        attachment: attachment,
      };

      if (currentChatuser._id) {
        axios
          .post(`http://localhost:5300/api/msg/msg`, {
            from: id,
            to: currentChatuser._id,
            Name: currentChatuser.Name,
            message: messages,
          })
          .then(() => {
            setmessage(message.concat(messages));
            setinput("");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(`http://localhost:5300/api/msg/msg`, {
            from: id,
            to: currentChatuser.AccountID,
            message: messages,
          })
          .then(() => {
            setmessage(message.concat(messages));
            setinput("");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  function t(type) {
    if (type === 3) {
      return "Witness";
    }
    if (type === 1) {
      return "Member";
    }
    if (type === 2) {
      return "Judge";
    }
  }

  function handleFileUpload(e) {
    e.preventDefault();
  }
  const handleAttachmentChange = (event) => {
    setAttachment(event.target.files[0]);
  };
  //    console.log((message[message.length-1].Name.split(" ")));
  //console.log((currentChatuser.Name));
  //  console.log(message[message.length-1].Name===currentChatuser.Name);

  return (
    <div className="MainChatCont">
      <div>
        <p>
          <br></br>
        </p>
        <div
          style={{
            display: "flex",
            padding: "1%",
            paddingLeft: "2%",
            backgroundColor: "#404040",
            color: "white",
          }}
        >
          <img
            src={currentChatuser.Profile_Picture}
            className="userProfile"
            alt=""
          />

          {message.length !== 0 &&
          message[message.length - 1].Name === currentChatuser.Name &&
          message[message.length - 1].Name !== undefined ? (
            <div style={{ marginLeft: "1%", fontSize: "large" }}>
              <p>Members</p>
              <div style={{ display: "flex", fontSize: "5" }}>
                {uniqueAccounts.map((item) => (
                  <p>{item.username}&ensp;</p>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ marginLeft: "1%", fontSize: "large" }}>
              <p>{currentChatuser.username}</p>
              <p>{currentChatuser.Country_of_Origin}</p>
              <p>{t(currentChatuser.Accountype)}</p>
            </div>
          )}
        </div>
        <div className="msgcont">
          {message.map((item) => (
            <div ref={scrollRef}>
              {message.length !== 0 &&
              message[message.length - 1].Name === currentChatuser.Name &&
              message[message.length - 1].Name !== undefined ? (
                item.Sender !== id ? (
                  <div>
                    {uniqueAccounts
                      .filter((user) => user.AccountID === item.Sender)
                      .map((user) => (
                        <div className="messagesender">
                          <div>
                          <img
                            src={user.Profile_Picture}
                            style={{
                              width: "50%",
                              background: "none",
                              margin: "2%",
                            }}
                            alt="Image"
                          />
                          <p style={{ fontsize: "smaller" }}>{user.username}</p>
                          </div>
                          <p className="messagesentother" style={{marginLeft:"5%"}}>{item?.message}</p>

                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="messageisent">
                    <p className="messageisenttext">{item?.message}</p>
                  </div>
                )
              ) : item.myself === false ? (
                <div className="messagesender">
                  <img
                    src={currentChatuser.Profile_Picture}
                    style={{ width: "5%", background: "none", margin: "2%" }}
                    alt=""
                  />
                  <p className="messagesentother">{item?.message}</p>
                </div>
              ) : (
                <div className="messageisent">
                  <p className="messageisenttext">{item?.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="msgSenderCont">
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Write yor message to your friend"
            className="inputmsg"
          />

          <div className="iconimporttext">
            <form onSubmit={handleFileUpload}>
              <div className="file-input-container">
                <label htmlFor="file-input">
                  <FiPaperclip size={35} />
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleAttachmentChange}
                  multiple
                />
              </div>
            </form>
          </div>

          <button onClick={sendmsg} className="buttontext">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
export default Chatcont;
