import React, { useState } from 'react';

const WebsiteItem = (props) => {

    const [title, setTitle] = useState(props.title(props.id));
    const [url, setUrl] = useState(props.url(props.id));

    const updateTitle = (e) => {
        props.setTitle(e.target.value, props.id);
        setTitle(props.title(props.id));
    }
    
    const updateUrl = (e) => {
        props.setUrl(e.target.value, props.id);
        setUrl(props.url(props.id));
    }

    return (
        <div className='input-row'>
            <div className='website-name'>
                Title: 
                <input type="text" value={title} onChange={e=>updateTitle(e)} />
            </div>
            <div className='website-link'>
                Link: 
                <input type="text" value={url} onChange={e=>updateUrl(e)} />
            </div>
        </div>
    );
}

export default WebsiteItem;