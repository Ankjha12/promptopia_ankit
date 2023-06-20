"use client"
import React, {useState, useEffect, useLayoutEffect} from 'react'
import { useSession } from 'next-auth/react'
import {useRouter} from "next/navigation";

import Profile from '@components/Profile/Profile';

const MyProfile = () => {
const [prompts, setPrompts] = useState([]);
    const {data: session} = useSession();

    const router = useRouter();

    useEffect(() => {
      const fetchPrompts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);

        const data = await response.json();

        console.log("Checking Response coming from the backend for a prompts data for a perticular user", response, data)

        setPrompts(data)
      }
      console.log("checking session data inside useEffect", session);

      if(session?.user.id) fetchPrompts();
    },[session])

    const handleEdit = (prompts) => {
         router.push(`/update-prompt?id=${prompts._id}`)
    }

    const handleDelete = async (prompt) => {
      const hasConfirmed = confirm('Are you sure you want to delete this Prompt?');

      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${prompt._id.toString()}`, {
            method: "DELETE"
          })

          const filteredPost = prompts.filter((post) => post._id !== prompt._id);

          setPrompts(filteredPost);
        } catch (error) {
          console.log("error in deleting Prompt card! Please try again")
        }
      }
    }
  return (
   <Profile
     name="My"
     desc="Welcome to your personalize profile page"
     data={prompts}
     handleEdit={handleEdit}
     handleDelete={handleDelete}
    />
  )
}

export default MyProfile
