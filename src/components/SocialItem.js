import React, {useState} from 'react';

const SocialItem = (props) => {

    const [url, setUrl] = useState(props.url);

    const updateUrl = (e) => {
        props.setUrl(e.target.value, props.id);
        setUrl(e.target.value);
    }

    return (
        <div className='input-row'>
            <div className='social-link'>
                Link: 
                <input type="text" value={url} onChange={e=>updateUrl(e)} />

                <br/>

                <div onClick={() => props.delete(props.id)}>delete</div>
                {!(props.id === 0) && ( // not first
                    <div onClick={() => props.move("up", props.id)}>up</div>
                )}
                {!(props.id === (props.length - 1)) && ( // not last
                    <div onClick={() => props.move("down", props.id)}>down</div>
                )}
            </div>
        </div>
    );
}

export default SocialItem;