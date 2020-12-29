import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import {EmplContext} from "../App";

export default function Nav() {
    const {nameHandler} = useContext(EmplContext);
    return (
                <nav className={'nav'}>
                    <ul className={'nav-items'}>
                        <li className={'nav-item'} onClick={()=>nameHandler('')}><Link to={'/'}>List</Link></li>
                        <li className={'nav-item'}><Link to={'/form'}>Form</Link></li>
                    </ul>
                </nav>
    )
}