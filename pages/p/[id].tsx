import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import { PostProps } from "../../components/Post"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const content = `

### Heading 3
Lorem ipsum dolor sit amet, **consectetur adipiscing elit**, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.  wertwerqwwrqwer qerqwe rqrqewrq rqewr qwerwer eer qwer

### Heading 3

Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
sunt in culpa qui officia deserunt mollit anim id est laborum.


`

  const post = {
    id: "1",
    title: "Hello World",
    content: content,
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
      <div className="flex flex-col justify-center text-left m-auto">
        <h2 className="font-bold text-lg pt-8 m-auto">{title}</h2>
        <p className="py-4 m-auto">By {props?.author?.name || "Unknown author"} {props.created_at}</p>
        <article className="prose lg:prose-md prose-gray m-auto text-wrap">
          <ReactMarkdown children={props.content} />
        </article>
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
