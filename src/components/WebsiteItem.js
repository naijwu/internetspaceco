import React, { useEffect, useState } from 'react';

// repetitive code ewwww
const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
)

const UpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
)

const DownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{transform:"rotate(180deg)"}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
)

const WebsiteItem = (props) => {

    const [title, setTitle] = useState(props.title);
    const [url, setUrl] = useState(props.url);

    useEffect(() => {
        setTitle(props.title);
        setUrl(props.url);
    }, [props])

    const updateTitle = (e) => {
        props.setTitle(e.target.value, props.id);
        setTitle(e.target.value, props.id);
    }
    
    const updateUrl = (e) => {
        props.setUrl(e.target.value, props.id);
        setUrl(e.target.value, props.id);
    }

    return (
        <div className='input-row'>
            <div className='website-name'>
                <input type="text" value={title} onChange={e=>updateTitle(e)} placeholder="Title" />
            </div>
            <div className='website-link'>
                <input type="text" value={url} onChange={e=>updateUrl(e)} placeholder="Link" />
            </div>
            <div className="item-actions">
                <div className="move-items">
                    {!(props.id === 0) && ( // not first
                        <div className="move-up" onClick={() => props.move("up", props.id)} >
                            <UpIcon />
                        </div>
                    )}
                    {!(props.id === (props.length - 1)) && ( // not last
                        <div className="move-down" onClick={() => props.move("down", props.id)}>
                            <DownIcon />
                        </div>
                    )}
                </div>
                <div className="delete-item" onClick={() => props.delete(props.id)}>
                    <DeleteIcon />
                </div>
            </div>
        </div>
    );
}

export default WebsiteItem;