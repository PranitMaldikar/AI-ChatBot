import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://ai-chat-bot-api.vercel.app/products";
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSend = async () => {
    // Dummy URL for now
    const dummyUrl = "https://dummy-url-for-send-button";
    try {
      const response = await fetch(dummyUrl, {
        method: 'POST',
        body: JSON.stringify({ prompt: userPrompt }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      console.log(result);
      setUserPrompt(''); // Clear input field after sending
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Welcome {loggedInUser}</h1>
        {/* Place your chatbot UI element here */}
      </div>
      <div>
        {
          products && products?.map((item, index) => (
            <ul key={index}>
              <span>{item.name} : {item.price}</span>
            </ul>
          ))
        }
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="text" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} />
        <button onClick={handleSend}>Send</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
