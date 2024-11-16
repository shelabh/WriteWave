'use client'
import { useState } from 'react';

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const res = await fetch('/api/blog/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, authorId: 1 }),
    });

    if (res.ok) {
      alert('Post created successfully!');
    }
  };

  return (
    <>
      <div className=" max-w-7xl mx-auto p-10">
      <form onSubmit={handleSubmit} className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 mb-4 w-full"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Submit
      </button>
    </form>

      </div>
    </>
    
  );
};

export default Write;
