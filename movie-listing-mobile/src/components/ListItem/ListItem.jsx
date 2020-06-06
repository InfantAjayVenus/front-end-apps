import React from 'react';
import './ListItem.scss';

export const ListItem = (props) => (
    <div className={`list-item`}>
        <span
            className="poster"
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/w500/${props.context.poster_path}")`,
                backgroundSize: '100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        ></span>
        <div className="info">
        <h1 className="title">{props.context.title}</h1>
        <p className="desc">{props.context.overview.substring(0,125)+"..."}</p>
        <div className="meta">
        <span className="left">Rating: {props.context.vote_average}</span>
        <span className="right">Language: {props.context.original_language}</span>
        </div>
        </div>
    </div>
);