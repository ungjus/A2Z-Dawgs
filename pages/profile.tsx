import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import Head from "next/head";
const Profile = ({ user, error, isLoading }): JSX.Element => {

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    
    const role = user["http://a2zdawgs.com/roles"]

    return (
        <div>
            <Head>
                <title>A-Z Dawgs - Profile</title>
            </Head>

            <main >
                <h1 >Welcome to your profile.</h1>
                <p className="text-wrap">{JSON.stringify(user)}</p>
                <p>Role: {role}</p>
            </main>
        </div>
        
    )
  }
  
  export default withPageAuthRequired(Profile);