import React, { useEffect, useState } from "react";
import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function App() {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  const socket = new SockJS("http://localhost:3002/ws");
  const client = Stomp.over(socket);
  useEffect(() => {
    client.connect(
      {},
      function onConnect(data) {
        console.log("STOMP is now connected! FINALLY");
        console.log("data", data);

        setIsConnected(true);
       
        client.subscribe("/echo", (data) => {
          console.log("Receiver data from server: => ", data.body);
        });
        client.publish({ destination: "/echo", body: "123", headers: {} });
      },
      (error) => console.error(error)
    );
  }, []);

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
