'use client'

import React, {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form/Form';

const EditPrompt = () => {
  const router = useRouter();
//   const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);

    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'GET'
            });

            const data = await response.json();

            setPost({
                prompt: data?.prompt,
                tag: data?.tag
            })
        }

        if(promptId) getPromptDetails();
    },[promptId])

    
    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true);

        if(!promptId) return alert('PromptId Not Found');
         console.log('Checking Prompt is updating or not', post);
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post?.prompt,
                    tag: post?.tag
                })
            })

            if(response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log("Checking error in the updating prompt function", error)
        }
    }

    // const createPrompt = async (e) => {
    //    e.preventDefault();
    //    setSubmitting(true);

    //    try {
    //     const response = await fetch("/api/prompt/new", {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         prompt: post?.prompt,
    //         userId: session && session?.user.id,
    //         tag: post.tag
    //       })
    //     });

    //     console.log("Checking Response coming from the api while creating the new prompt", response)

    //     if(response.ok) {
    //       router.push("/");
    //     }
    //    } catch (error) {
    //     console.log("Error in Creating the Prompt through API Frontend error", error);
    //    } finally {
    //     setSubmitting(false);
    //    }
    // }
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}

export default EditPrompt
