import React, { useState, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  // State to store the posts data and loading state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        
        // Check for a successful response
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        
        // Parse the response JSON
        const data = await response.json();
        
        // Store the fetched data in the state
        setPosts(data);
      } catch (err) {
        // Handle any errors
        setError(err.message);
      } finally {
        // Stop the loading state
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array ensures the fetch runs only once on mount

  // Render loading state, error, or fetched data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {/* Render each post's title and body */}
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
