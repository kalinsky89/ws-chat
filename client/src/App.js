import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

function App() {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  const [newStompClient, setNewStompClient] = useState();
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080",
      reconnectDelay: 5000,
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
      logRawCommunication: true,
      debug: (str) => console.log(str),
    });
    client.onConnect = () => {
      // console.log("connected to webscoket server");
      // setIsConnected(true);
      // setStompClient(client);
      alert("works");
    };
    client.onStompError = (frame) => {
      console.error("STOMP error:", frame.headers.message);
    };
    
    const callback = function(message) {
        if (message.body) {
          alert("got message with body " + message.body)
        } else {
          alert("got empty message");
        }
      };

    client.subscribe("/topic/messages", callback);

    client.activate();

    
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

  // const handleSendMessage = () => {
  //   if (stompClient && stompClient.connected && message.trim() !== "") {
  //     stompClient.publish({ destination: "/app/sendMessage", body: message });
  //     setMessage("");
  //   }
  // };

  return (
    <div className="App">
      <h1>WebSocket Chat App</h1>
      {isConnected ? (
        <div>Connected to server</div>
      ) : (
        <p>Connecting to WebSocket server...</p>
      )}
    </div>
  );
}

export default App;
