import React, { useState, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); // Start loading state
  
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        // Check for a successful response
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json(); // Parse the response JSON
      })
      .then(data => {
        //console.log(data); // Handle the fetched data
        setPosts(data); // Store the fetched data in the state
      })
      .catch(err => {
        // Handle any errors
        setError(err.message);
      })
      .finally(() => {
        // Stop the loading state
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post, i) => (
        <div key={post.id}>
          <h2>{post.id}. {post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
