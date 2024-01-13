import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = {
    id: "1",
    title: "Hello World",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: false,
    author: {
      name: "Justin Ung",
      email: "ungjus@gmail.com",
    },
    created_at: "2024-01-10"
  }
  return {
    props: post,
  }
}

const Post = (props: PostProps) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
      <div>
        <h2 className="font-bold text-lg pt-8">{title}</h2>
        <p className="py-4">By {props?.author?.name || "Unknown author"} {props.created_at}</p>
        <ReactMarkdown children={props.content} />
      </div>
      // {/* <style jsx>{`

      //   .actions {
      //     margin-top: 2rem;
      //   }

      //   button {
      //     background: #ececec;
      //     border: 0;
      //     border-radius: 0.125rem;
      //     padding: 1rem 2rem;
      //   }

      //   button + button {
      //     margin-left: 1rem;
      //   }
      // `}</style> */}
  )
}

export default Post
