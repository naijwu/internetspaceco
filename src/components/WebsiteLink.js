import React from 'react';

const WebsiteLink = (props) => {

    return (
        <a target="_blank" rel="noreferrer" className='link-item' style={{ background: props.colour }} href={`${props.url}`}>
            <div className='link-content'>
                <div className='link-text'>{props.title}</div>
                <div className='link-url'>{props.url}</div>
            </div>
        </a>
    );
}

export default WebsiteLink;