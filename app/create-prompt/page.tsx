'use client'

import { Dispatch, SetStateAction, useState } from "react"
import {useSession} from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "@components/Form"

interface Post {
    post: {
        prompt: string
        tag: string
    }
    setPost: Dispatch<SetStateAction<{
        prompt: string;
        tag: string
    }>>
}

const CreatePrompt = () => {

    const [submitting, setSubmitting] = useState<boolean>(false)
    const [post, setPost] = useState<Post>({
        prompt: "",
        tag: ""
    }) 
    const router = useRouter()
    const {data: session} = useSession()

    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try{
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                }
            )
            })

            if(response.ok){
                router.push("/")
            }
        }catch(err){
            console.log(err)
        }finally{
            setSubmitting(false)
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
  )
}

export default CreatePrompt
