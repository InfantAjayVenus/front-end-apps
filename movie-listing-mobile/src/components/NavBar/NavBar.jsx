import React from 'react';
import './NavBar.scss';

export const NavBar = (props) => (
    <div className="nav-bar">
        <input
            type="button"
            value="Popular"
            className={`
                btn
                ${props.active==='popular' ? 'active' : ''}    
            `} 
            onClick={props.setActive.bind(this,'popular')}
        />
        <input
            type="button"
            value="Up Coming"
            className={`
                btn
                ${props.active==='upcoming' ? 'active' : ''}    
            `} 
            onClick={props.setActive.bind(this,'upcoming')}
        />
        <input
            type="button"
            value="Now Playing"
            className={`
                btn
                ${props.active==='now_playing' ? 'active' : ''}    
            `} 
            onClick={props.setActive.bind(this,'now_playing')}
        />
    </div>
)