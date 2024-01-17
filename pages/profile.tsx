import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";


const Profile = ({ user, error, isLoading }): JSX.Element => {

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    
    const role = user["http://a2zdawgs.com/roles"] + ""

    const isAdmin = (role === "Admin")
    

    return (
        <div>
            <Head>
                <title>A-Z Dawgs - Profile</title>
            </Head>

            <main >
                <h1 >Welcome to your profile.</h1> 

                <ReactMarkdown>
                    {JSON.stringify(user)}
                </ReactMarkdown>

                <p>Role: {role}</p>
                {isAdmin &&
                    <Link href="/draft">
                        <button className="bg-blue-600 rounded text-white hover:bg-blue-500 p-2">Create</button>
                    </Link>

                }
                
            </main>
        </div>
        
    )
  }
  
  export default withPageAuthRequired(Profile);