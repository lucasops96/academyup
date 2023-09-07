/* eslint-disable @next/next/no-html-link-for-pages */
import {  getSession } from '@auth0/nextjs-auth0'
import { getAccessToken } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Home() {
  const {user} = useUser()

    return(
        <div>
            <h1>Hello auth</h1>
            <pre>
                {JSON.stringify(user,null,2)}
            </pre>
            <a href="/api/auth/login">login</a>
        </div>
    )
}

export const getServerSideProps : GetServerSideProps = async ({req,res}) => {
  const token = await getAccessToken(req,res);

  console.log(token);

  return{
    props:{},
  };
};


