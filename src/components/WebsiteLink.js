import React from 'react';

const WebsiteLink = (props) => {

    return (
        <a target="_blank" rel="noreferrer" className='link-item' href={`${props.url(props.id)}`}>
            <div className='link-content'>
                <div className='link-text'>{props.title(props.id)}</div>
                <div className='link-url'>{props.url(props.id)}</div>
            </div>
        </a>
    );
}

export default WebsiteLink;