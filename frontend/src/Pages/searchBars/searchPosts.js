import React,{useRef, useState} from 'react'
import Header from "../../Components/header"
import Footer from "../../Components/footer"
import { BsSearch } from "react-icons/bs"
import "./searchPosts.css"
import SearchPostResults from '../../Components/searchPostResults'

const SearchPosts = ({current})=>{
    const searchTerm = useRef();
    const [term, setTerm] = useState('somthingveryrandom');

    const handleSearch = ()=>{
        setTerm(searchTerm.current.value);
        console.log(term);
    }

    return(
        <div className='searchPostsDiv'>
            <Header/>
            <div className="searchBarContain">
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
            <Footer/>
        </div>
    )
}

export default SearchPosts;