import React, { useContext, useEffect, useState }/*, { useContext }*/ from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import logo from "../pages/konoha.png";
import { ContextPage } from '../StoreForPage';
import { ContextSearch } from '../StoreForSearch';
import Logout from './Log/Logout';


const Navbar = () => {
    const userData = useSelector((state) => state.userReducer);
    const [pageState, setPageState] = useContext(ContextPage);
    const [queryState, setQueryState] = useContext(ContextSearch);
	const [searchQuery, setsearchQuery] = useState("");

    const searchFunction = (e) => {
        e.preventDefault()
        setQueryState(searchQuery);
    }

    useEffect(() => {
		if(queryState===null){
			setsearchQuery('')
		}
	}, [queryState]);

    return (
        <div className="topbar stick">
            <div className="logo" >
                <a href='/'>
                    <img src={logo} style={{width: '50px', height: '50px'}} alt="logo"/> KONOHA
                </a>
            </div>
            <div className="top-area">
                <ul>
                <li>
                        <form className="d-flex" style={{marginTop:'10px'}}>
                            <input className="form-control me-1" 
                                type="search" 
                                id='search' 
                                placeholder="Que chercher-vous?" 
                                name="search"
                                onChange={(e) => setsearchQuery(e.target.value)}
                                value={searchQuery} 
                            />
                            <button className="btn btn-light" onClick={searchFunction}>Chercher</button>
                        </form>
                    </li>
                    
                    <li>
                        <a href="/" title="Home" data-ripple=""><img src='./img/icons/home.svg' title='new user' alt='new user' style={{float:'left'}}/></a>
                    </li>
                    <li className="li-nav" onClick={()=>{
                        const e = {messagePage: true, profilPage: false,friendPage:false, conversation:pageState.conversation}
                        setPageState(e)
                        }}>
                        <img src='./img/icons/icons8-comments-48.png' title='message' alt='message' style={{float:'left'}}/>
                    </li>
                    <li onClick={()=>{
                        const e = {messagePage: false, profilPage: true, friendPage:false, conversation:pageState.conversation}
                        setPageState(e)
                        }}>
                        <img src={userData.picture} title='profil' alt='profil' style={{float:'left', height:'40px', width:'45px', borderRadius:"100%", marginTop:"10px"}}/><br/>
                    </li>
                    <Logout />
                    
                </ul>
            </div>
        </div>
    );
};

export default Navbar;