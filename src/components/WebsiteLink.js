import React from 'react';

const WebsiteLink = (props) => {

    return (
        <a target="_blank" rel="noreferrer" className='link-item' href={`${props.url}`}
        style={{
            background: props.colour, 
            boxShadow: props.shadow ? '0 0 10px rgba(0,0,0,0.03)' : 'none',
            border: props.border ? `1px solid ${props.border}` : 'none'
        }} >
            <div className='link-content'>
                <div className='link-text'>{props.title}</div>
                <div className='link-url'>{props.url}</div>
            </div>
        </a>
    );
}

export default WebsiteLink;