"use client";

import { useState, useEffect, ChangeEvent } from "react";
import PromptCard from "./PromptCard";
import { Post } from "@types";


interface Props {
  data: Post[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList = ({data, handleTagClick}: Props) => {
  return(
    <div className="mt-16 prompt_layout">
      {data?.map((post: Post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeOut, setSearchTimeOut] = useState<NodeJS.Timeout | null>()
  const [searchResult, setSearchResult] = useState<Post[]>([])
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json();

      setPosts(data) 
    }

    fetchPosts()
  }, [])

  const filteredPrompts = (search: string) => {
    const regex = new RegExp(search, "i")
    
    return posts.filter(
      (post) => 
        regex.test(post.prompt) ||
      regex.test(post.tag) || 
      regex.test(post.creator.username)
    )
  }
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(searchTimeOut) clearTimeout(searchTimeOut)
    setSearchText(e.target.value)

    setSearchTimeOut(
      setTimeout(() => {
        const result = filteredPrompts(e.target.value)
        setSearchResult(result)
      }, 500)
    )
  }

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName)

    const result = filteredPrompts(tagName)
    setSearchResult(result)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or username" value={searchText} onChange={handleSearchChange} required className="search_input peer"
         />
      </form>

      <PromptCardList 
        data={searchText ? searchResult : posts} 
        handleTagClick={handleTagClick} 
      />
    </section>
  )
}

export default Feed
