import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  created_at: string;
};

const Post = ({ post }: { post: PostProps }): JSX.Element => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const letter = String.fromCharCode(Number(post.title))
  return (
    <div className="text-inherit p-8"onClick={() => Router.push("/p/[title]", `/p/${post.title}`)}>
      <h2 className="font-bold text-lg ">{post.title}</h2>
      <small className="py-96">By {authorName} {post.created_at}</small>
      <ReactMarkdown children={post.content} />
    </div>
  );
};

export default Post;
