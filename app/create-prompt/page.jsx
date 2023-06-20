'use client'

import React, {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

import Form from '@components/Form/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });

    const createPrompt = async (e) => {
       e.preventDefault();
       setSubmitting(true);

       try {
        const response = await fetch("/api/prompt/new", {
          method: 'POST',
          body: JSON.stringify({
            prompt: post?.prompt,
            userId: session && session?.user.id,
            tag: post.tag
          })
        });

        console.log("Checking Response coming from the api while creating the new prompt", response)

        if(response.ok) {
          router.push("/");
        }
       } catch (error) {
        console.log("Error in Creating the Prompt through API Frontend error", error);
       } finally {
        setSubmitting(false);
       }
    }
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}

export default CreatePrompt
