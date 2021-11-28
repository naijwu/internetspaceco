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
        <div className='input-row' onClick={()=>console.log(props.id)}>
            <div className='website-name'>
                Title: 
                <input type="text" value={title} onChange={e=>updateTitle(e)} />
            </div>
            <div className='website-link'>
                Link: 
                <input type="text" value={url} onChange={e=>updateUrl(e)} />
            </div>
            <div className='item-actions'>
                <div onClick={()=>props.delete(props.id)}>Delete</div>
                {!(props.id === 0) && (<div onClick={()=>props.move("up", props.id)}>Up</div>)}
                {!(props.id === (props.length - 1)) && (<div onClick={()=>props.move("down", props.id)}>Down</div>)}
            </div>
        </div>
    );
}

export default WebsiteItem;