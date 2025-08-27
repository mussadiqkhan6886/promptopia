'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { Post } from "@types";


const MyProfile = () => {

    const {data: session} = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await response.json();

        setPosts(data) 
        }

        if(session?.user.id) fetchPosts()
    }, [])

    const handleDelete = async (post: Post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

        if(hasConfirmed){
            try{
                await fetch(`api/prompt/${post._id.toString()}`, {
                    method: "DELETE"
                })
                const filteredPosts = posts.filter((p: {_id: number}) => p._id !== Number(post._id))
                setPosts(filteredPosts)
            }catch(err){
                console.log(err)
            }
        }
    }

    const handleEdit = (post: Post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

  return (
    <Profile name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}  />
    )
        
  
}

export default MyProfile
