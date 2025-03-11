import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code, Terminal, Lock, MessageCircle } from "lucide-react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const ADMIN_PASSWORD = "adminpassword1"; // Change this to your desired password

function Blog() {
  const [posts, setPosts] = useState([
    { title: "Welcome to My Blog", content: "This is my first post!" }
  ]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const authenticate = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const addPost = () => {
    if (newPost.title && newPost.content) {
      setPosts([...posts, newPost]);
      setNewPost({ title: "", content: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <motion.h1 className="text-4xl font-bold text-cyan-400 mb-6 flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Code className="mr-2" /> My Coding Blog
      </motion.h1>
      <Link to="/forum" className="text-cyan-300 underline mb-4">Go to Forum</Link>
      <div className="w-full max-w-2xl space-y-4">
        {posts.map((post, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gray-800 border border-cyan-500">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-cyan-300">{post.title}</h2>
                <p className="text-gray-300 mt-2">{post.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {!authenticated ? (
        <div className="mt-6 w-full max-w-2xl bg-gray-800 p-4 rounded-lg border border-cyan-500">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center">
            <Lock className="mr-2" /> Admin Login
          </h2>
          <Input placeholder="Enter Admin Password" type="password" className="mt-2 bg-gray-700 text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="mt-3 bg-cyan-500 hover:bg-cyan-400" onClick={authenticate}>Login</Button>
        </div>
      ) : (
        <div className="mt-6 w-full max-w-2xl bg-gray-800 p-4 rounded-lg border border-cyan-500">
          <h2 className="text-xl font-semibold text-cyan-300 flex items-center">
            <Terminal className="mr-2" /> New Post
          </h2>
          <Input placeholder="Title" className="mt-2 bg-gray-700 text-white" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
          <Textarea placeholder="Content" className="mt-2 bg-gray-700 text-white" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} />
          <Button className="mt-3 bg-cyan-500 hover:bg-cyan-400" onClick={addPost}>Post</Button>
        </div>
      )}
    </div>
  );
}

function Forum() {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({ title: "", content: "" });

  const addThread = () => {
    if (newThread.title && newThread.content) {
      setThreads([...threads, newThread]);
      setNewThread({ title: "", content: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <motion.h1 className="text-4xl font-bold text-cyan-400 mb-6 flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <MessageCircle className="mr-2" /> Community Forum
      </motion.h1>
      <Link to="/" className="text-cyan-300 underline mb-4">Go to Blog</Link>
      <div className="w-full max-w-2xl space-y-4">
        {threads.map((thread, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gray-800 border border-cyan-500">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-cyan-300">{thread.title}</h2>
                <p className="text-gray-300 mt-2">{thread.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 w-full max-w-2xl bg-gray-800 p-4 rounded-lg border border-cyan-500">
        <h2 className="text-xl font-semibold text-cyan-300 flex items-center">
          <Terminal className="mr-2" /> New Thread
        </h2>
        <Input placeholder="Title" className="mt-2 bg-gray-700 text-white" value={newThread.title} onChange={(e) => setNewThread({ ...newThread, title: e.target.value })} />
        <Textarea placeholder="Content" className="mt-2 bg-gray-700 text-white" value={newThread.content} onChange={(e) => setNewThread({ ...newThread, content: e.target.value })} />
        <Button className="mt-3 bg-cyan-500 hover:bg-cyan-400" onClick={addThread}>Post Thread</Button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </Router>
  );
}
