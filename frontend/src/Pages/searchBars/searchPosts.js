import React,{useRef, useState} from 'react'
import Header from "../../Components/header"
import Footer from "../../Components/footer"
import { BsSearch } from "react-icons/bs"
import {BiArrowBack} from "react-icons/bi"
import "./searchPosts.css"
import SearchPostResults from '../../Components/searchPostResults'

const SearchPosts = ({current})=>{
    const searchTerm = useRef();
    const [term, setTerm] = useState('somthingveryrandomxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

    const handleSearch = ()=>{
        setTerm(searchTerm.current.value);
    }

    const handleBack = ()=>{
        window.location = `/student/${current.userID}`
    }

    return(
        <div className='searchPostsDiv'>
            <Header/>
            <div className="searchBarContain">
                <button className='back-btn-searchPosts' onClick={handleBack}><BiArrowBack/></button>
                <div className="search-box">
                    <input type="text" className="input-search" placeholder="Type to Search..." ref={searchTerm}/>
                    <button className="btn-search" onClick={handleSearch}><BsSearch/></button>
                </div>
                <p style={{
                    color: "white",
                    marginTop : "15px"
                }}>-----------------Try writing tags you want to search in input box above-----------</p>
                <SearchPostResults tags={term} current={current}/>
            </div>
        </div>
    )
}

export default SearchPosts;