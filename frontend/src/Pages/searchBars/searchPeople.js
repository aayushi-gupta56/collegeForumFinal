import React, {useState, useRef} from 'react'
import './searchPosts.css'
import { BiArrowBack } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import Header from '../../Components/header';
import SearchUserResults from '../../Components/searchUserResult';

const SearchPeople = ({current})=>{

    const searchTerm = useRef();
    const [term, setTerm] = useState('');

    const handleBack = ()=>{
        window.location = `/student/${current.userID}`
    }

    const handleSearch = ()=>{
        setTerm(searchTerm.current.value);
    }

    return(
        <div className='searchPeopleMain'>
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
                }}>---------- Try writing uniqueID or name you want to search in input box above ---------</p>
                <SearchUserResults term={term}/>
            </div>
        </div>
    )
}

export default SearchPeople;