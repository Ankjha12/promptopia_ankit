"use client"

import PromptCard from '@components/PromptCard/PromptCard'
import React, {useState, useEffect} from 'react'

const PromptCardList= ({data, handleTagClick}) => {
   return (
    <div className='mt-16 prompt_layout'>
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
           />
        ))}
    </div>
   )
}

const Feed = () => {

  const [searchText,setSearchText] = useState('');
  const [prompts, setPrompts] = useState([]);
  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPrompts(data);
    }

    fetchPrompt()
  },[])

  const handleSearchChange = async (e) => {

  }
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
       <input 
         type='text'
         placeholder='Search for a username or a tag'
         value={searchText}
         onChange={handleSearchChange}
         className='search_input peer'
       />
      </form>

      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed