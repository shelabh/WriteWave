'use client'
import { useEffect, useState } from 'react';

// Define a type for the post data (for better TypeScript support)
type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: number;
    email: string;
  };
};

const Blogs = () => {
	const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch posts');
        }

        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
	return (
		<>
			<div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Blog Posts</h1>
      <div className="grid grid-cols-1 gap-6">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-gray-500 text-sm mt-2">Posted by: {post.author.email}</p>
              <p className="text-gray-400 text-xs">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
		</>
	)
}

export default Blogs