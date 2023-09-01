/* eslint-disable @next/next/no-html-link-for-pages */
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser, } from '@auth0/nextjs-auth0/client'
import { GetServerSideProps } from 'next';

export default function Home(){
    const {user} = useUser()

    return(
        <div>
            <h1>Hello auth</h1>
            <pre>
                {JSON.stringify(user,null,2)}
            </pre>
            <a href="/api/auth/logout">logout</a>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();