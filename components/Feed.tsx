"use client";

import { useState, useEffect } from "react";
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
  const [posts, setPosts] = useState([])

  const handleSearchChange = () => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json();

      setPosts(data) 
    }

    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or username" value={searchText} onChange={handleSearchChange} required className="search_input peer"
         />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />

    </section>
  )
}

export default Feed
