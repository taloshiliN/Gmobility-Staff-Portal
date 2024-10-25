
import React, { useState, useEffect, useRef } from 'react';

// Define the main component SimpleChatPlatform, which takes the current user as a prop
const SimpleChatPlatform = ({ currentUser }) => {
  // Set up state variables
  const [employees, setEmployees] = useState([]); // List of all employees
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Currently selected employee for chatting
  const [messages, setMessages] = useState([]); // Messages in the current chat
  const [newMessage, setNewMessage] = useState(''); // New message being typed by the user
  const [currentChat, setCurrentChat] = useState(null); // Information about the current chat session
  const [socket, setSocket] = useState(null); // WebSocket connection object
  const [unreadMessages, setUnreadMessages] = useState({}); // Track unread messages for different chats
  const [employeeChatMap, setEmployeeChatMap] = useState({}); // Map of employees to their chat sessions
  const [lastMessageTimes, setLastMessageTimes] = useState({}); // Store the last message time for each chat
  const messagesEndRef = useRef(null); // Reference to the end of the messages list for scrolling

  // Establish WebSocket connection when the component loads
  useEffect(() => {
    const ws = new WebSocket('ws://10.11.12.136:8080'); // WebSocket URL for server
    setSocket(ws); // Save WebSocket object to state

    // When the WebSocket connection opens
    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    // When a message is received from the server
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse the message from JSON
        console.log('Received WebSocket message:', data);
        
        if (data.type === 'newMessage') {
          // If the new message is for the currently open chat, update the messages
          if (data.message.chat_id === currentChat?.id) {
            setMessages(prevMessages => [...prevMessages, data.message]);
          } else if (data.unreadCount.user_id === currentUser.id) {
            // If the chat isn't open, update the unread message count for that chat
            setUnreadMessages(prev => ({
              ...prev,
              [data.message.chat_id]: data.unreadCount.count
            }));
          }

          // Update the last message time for the chat
          setLastMessageTimes(prev => ({
            ...prev,
            [data.message.chat_id]: new Date().getTime()
          }));
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      ws.close();
    };
  }, [currentChat, currentUser.id]); // Re-run this effect whenever currentChat or currentUser.id changes

  // Fetch employees, chats, and unread counts when the component loads
  useEffect(() => {
    fetchEmployees(); // Get the list of employees
    fetchChats(); // Get the list of chats for the current user
    fetchUnreadCounts(); // Get the number of unread messages for each chat
  }, [currentUser.id]); // Re-run this effect when currentUser.id changes

  // Scroll to the bottom of the messages list whenever messages change
  useEffect(() => {
    scrollToBottom(); // Ensure chat window stays scrolled to the most recent message
  }, [messages]);

  // Helper function to scroll to the bottom of the chat window
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch the list of employees from the server
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data.filter(emp => emp.id !== currentUser.id)); // Filter out the current user from the list
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Fetch the list of chat sessions for the current user
  const fetchChats = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/chats/user/${currentUser.id}`);
      const chats = await response.json();
      const chatMap = {};
      const messageTimes = {};
      
      // Create a map of employees to their chat sessions
      chats.forEach(chat => {
        const otherParticipant = chat.participants.find(id => id !== currentUser.id);
        chatMap[otherParticipant] = chat.id;
        messageTimes[chat.id] = new Date(chat.last_message_time).getTime();
      });

      setEmployeeChatMap(chatMap);
      setLastMessageTimes(messageTimes);
      console.log('Employee-Chat Map:', chatMap);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  // Fetch the count of unread messages for each chat
  const fetchUnreadCounts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/unread/${currentUser.id}`);
      const data = await response.json();
      const counts = {};
      
      data.forEach(item => {
        counts[item.chat_id] = item.count; // Store unread message count per chat
      });

      setUnreadMessages(counts);
    } catch (error) {
      console.error('Error fetching unread counts:', error);
    }
  };
  // When an employee is selected for chatting
  const handleSelectEmployee = async (employee) => {
    setSelectedEmployee(employee); // Set the selected employee
    const chatId = employeeChatMap[employee.id]; // Get the chat session ID for the employee
    
    if (chatId) {
      // If a chat exists, load the chat messages
      console.log(`Selecting existing chat: ${chatId} for employee: ${employee.id}`);
      setCurrentChat({ id: chatId, participants: [currentUser.id, employee.id] });
      fetchMessages(chatId); // Fetch the messages for the selected chat
      
      // Mark all messages as read in the chat
      try {
        await fetch('http://localhost:8080/api/markAsRead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser.id, chatId }),
        });
        setUnreadMessages(prev => ({ ...prev, [chatId]: 0 })); // Clear unread messages for this chat
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    } else {
      // If no chat exists, create a new one
      console.log(`Creating new chat for employee: ${employee.id}`);
      try {
        const createResponse = await fetch('http://localhost:8080/api/chats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ participants: [currentUser.id, employee.id] }),
        });
        const newChat = await createResponse.json();
        setCurrentChat({ id: newChat.id, participants: [currentUser.id, employee.id] });
        setEmployeeChatMap(prev => ({ ...prev, [employee.id]: newChat.id })); // Update the chat map with the new chat
        setLastMessageTimes(prev => ({ ...prev, [newChat.id]: new Date().getTime() }));
        setMessages([]); // Clear the message list for the new chat
      } catch (error) {
        console.error('Error creating new chat:', error);
      }
    }
  };

  // Fetch the messages for a specific chat
  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/messages/chat/${chatId}`);
      const data = await response.json();
      setMessages(data); // Set the fetched messages
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() && currentChat && socket) {
      const messageData = {
        type: 'chatMessage',
        chat_id: currentChat.id,
        sender_id: currentUser.id,
        content: newMessage,
      };

      socket.send(JSON.stringify(messageData)); // Send the new message through the WebSocket
      setNewMessage(''); // Clear the input field

      // Update the last message time for the chat
      setLastMessageTimes(prev => ({
        ...prev,
        [currentChat.id]: new Date().getTime()
      }));
    }
  };

  // Sort employees based on the time of the last message in their chat
  const sortedEmployees = [...employees].sort((a, b) => {
    const timeA = lastMessageTimes[employeeChatMap[a.id]] || 0;
    const timeB = lastMessageTimes[employeeChatMap[b.id]] || 0;
    return timeB - timeA;
  });

  return (
    
    <div className='animated fadeInDown' style={{ 
      display: 'flex', 
      height: '20%', 
      width: '100%', 
      backgroundColor: '#f0f2f5', 
      borderRadius: '10px', 
      overflow: 'hidden', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      
      //animations
      }}>
      {/* Sidebar for employee list */}
      <div style={{ width: '250px', backgroundColor: '#ffffff', borderRight: '1px solid #e0e0e0', overflow: 'auto' }}>
        <h2 style={{ padding: '20px', borderBottom: '1px solid #e0e0e0', margin: 0, color: '#2c3e50' }}>Employees</h2>
        {sortedEmployees.map((employee) => {
          const chatId = employeeChatMap[employee.id];
          const unreadCount = unreadMessages[chatId] || 0;
          return (
            <div
              key={employee.id}
              style={{
                padding: '15px 20px',
                cursor: 'pointer',
                backgroundColor: selectedEmployee?.id === employee.id ? '#e6f2ff' : 'transparent',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onClick={() => handleSelectEmployee(employee)} // When an employee is clicked, open the chat
            >
              {/* Display employee's first letter and name */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#3498db', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black', fontWeight: 'bold' }}>
                  {employee.name[0]} {/* Show the first letter of employee's name */}
                </div>
                <span style={{ color: 'black' }}>{employee.name}</span>
              </div>
              {/* Show unread message count if any */}
              {unreadCount > 0 && (
                <div style={{ 
                  backgroundColor: '#e74c3c', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '20px', 
                  height: '20px', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  fontSize: '12px' 
                }}>
                  {unreadCount} {/* Show the number of unread messages */}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Chat window where messages are displayed */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
        {selectedEmployee ? (
          <>
            {/* Display the selected employee's name at the top */}
            <div style={{ padding: '20px', borderBottom: '1px solid #e0e0e0', fontWeight: 'bold', color: '#2c3e50' }}>
              {selectedEmployee.name}
            </div>

            {/* Message history */}
            <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    marginBottom: '15px',
                    display: 'flex',
                    justifyContent: message.sender_id === currentUser.id ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '10px 15px',
                      borderRadius: '18px',
                      backgroundColor: message.sender_id === currentUser.id ? '#3498db' : '#f0f0f0',
                      color: message.sender_id === currentUser.id ? 'white' : 'black',
                    }}
                  >
                    <p style={{ margin: 0 }}>{message.content}</p> {/* Message content */}
                    <p style={{ margin: '5px 0 0', fontSize: '0.8em', opacity: 0.7 }}>
                      {new Date(message.timestamp).toLocaleTimeString()} {/* Message timestamp */}
                    </p>
                  </div>
                </div>
              ))}
              {/* Empty div used to scroll to the bottom of the chat */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input box and send button for new messages */}
            <div style={{ padding: '20px', borderTop: '1px solid #e0e0e0', display: 'flex' }}>
              <input
                type="text"
                value={newMessage} // Bind the input to the newMessage state
                onChange={(e) => setNewMessage(e.target.value)} // Update the newMessage state on change
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Send message on pressing Enter
                style={{ flex: 1, marginRight: '10px', padding: '10px', borderRadius: '20px', border: '1px solid #e0e0e0' }}
                placeholder="Type a message..."
              />
              <button 
                onClick={handleSendMessage} // Send message on clicking the button
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: '#3498db', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '20px', 
                  cursor: 'pointer' 
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          // Prompt the user to select an employee if none is selected
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
            Select an employee to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleChatPlatform; // Export the component for use in other parts of the app
