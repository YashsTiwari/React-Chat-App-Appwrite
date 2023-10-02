// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { databases } from "../appwriteConfig";
import { COLLECTION_ID_MESSAGES, DATABASE_ID } from "../globalVariable";
import { ID, Query } from "appwrite";
import { Trash2 } from "react-feather";
import moment from "moment";

function Room() {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(function () {
    getMessages();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = { body: messageBody };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    console.log("created!", response);
    setMessages((messages) => [response, ...messages]);
    setMessageBody("");
  }
  async function getMessages() {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    console.log("RESPONSE: ", response);
    setMessages(response.documents);
  }

  async function deleteMessage(message_id) {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
    setMessages((messages) =>
      messages.filter((message) => message.$id != message_id)
    );
  }
  return (
    <main className="container">
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              required
              maxLength="1000"
              placeholder="Say something..."
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input type="submit" value="Send" className="btn btn--secondary" />
          </div>
        </form>
        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <small className="message--timestamp">
                  {moment(message.$createdAt).format("DD/MM/YYYY, HH:mm")}
                </small>
                <Trash2
                  className="delete--btn"
                  onClick={() => deleteMessage(message.$id)}
                />
              </div>

              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Room;
