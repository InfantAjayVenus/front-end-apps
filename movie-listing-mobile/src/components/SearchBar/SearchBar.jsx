import React, { useState } from 'react';
import './SearchBar.scss';

export const SearchBar = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchQuery}
                className="search-box"
                placeholder="Search for movie names"
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyPress={(event) => {
                    if (event.charCode === 13 && searchQuery!=='') {
                        props.search(searchQuery);
                        setSearchQuery('');
                    }
                }}
            />
            <input
                type="submit"
                value=""
                className="search-btn"
                onClick={() => {
                    if (searchQuery !== '') {
                        props.search(searchQuery);
                        setSearchQuery('');
                    }
                }}
            />
        </div>
    );
}