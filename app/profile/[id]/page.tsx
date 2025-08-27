'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
import { Post } from "@types";


const MyProfile = ({params}: {params: {id: number}}) => {

    const [posts, setPosts] = useState<Post[]>([])
    const searchParam = useSearchParams()
    const username = searchParam.get("name")

    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.id}/posts`)
        const data = await response.json();

        setPosts(data) 
        }

        if(params?.id) fetchPosts()
    }, [params.id])

  return (
    <Profile 
        name={username}
        desc= {`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
        data={posts}  />
    )
        
  
}

export default MyProfile
