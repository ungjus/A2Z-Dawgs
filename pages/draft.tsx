import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";


const Draft = ({ user, error, isLoading }): JSX.Element => {

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add logic to handle form submission
    };

    const handleReset = (event) => {
        setTitle('');
        setContent('');
    };

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        // TODO
        // You will implement this next ...
    };


    return (
        <div className="flex">
            <Head>
                <title>A-Z Dawgs - Create</title>
            </Head>
            <div className="w-1/2 p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleTitleChange}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={content}
                            onChange={handleContentChange}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            rows={8}
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                        Publish
                    </button>
                    <button type="reset" onClick={handleReset} className="py-2 px-4"> Reset</button>
                </form>
            </div>

            <article className="w-1/2 p-4 border-l prose lg:prose-md prose-gray">
                <ReactMarkdown children={title} />
                <ReactMarkdown children={content} />
            </article>
        </div>
    )
}

export default withPageAuthRequired(Draft);