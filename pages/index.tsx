import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: "1",
      title: "Hello World!",
      content: "This is the contents of the blog",
      published: false,
      author: {
        name: "Justin U",
        email: "ungjus@gmail.com",
      },
    },
  ]
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1 className="text-xl font-bold pt-8">Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="bg-white mt-8 hover:shadow">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Blog
