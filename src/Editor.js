import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { database } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import WebsiteItem from './components/WebsiteItem';
import WebsiteLink from './components/WebsiteLink';
import SocialItem from './components/SocialItem';
import SocialLink from './components/SocialLink';

const MoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
)

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
)

const Editor = (props) => {

    const { email, pages } = props;

    const { currentUser } = useAuth();

    // WYSIWYG
    const [name, updateName] = useState('');
    const [bio, updateBio] = useState('');
    const [pfpURL, updatePfpURL] = useState('');
    const [bgpURL, updateBgpURL] = useState('');

    // For display purpose only
    const [displayWebsites, setDisplayWebsites] = useState();
    const [displaySocials, setDisplaySocials] = useState();
    const [displayEditWebsites, setDisplayEditWebsites] = useState();
    const [displayEditSocials, setDisplayEditSocials] = useState();
    const [trigger, setTrigger] = useState(false);

    // For data payload
    const [websites, updateWebsites] = useState([]); 
    const [socials, updateSocials] = useState([]);

    // Only for input management purposes
    // const [classicMode, setClassicMode] = useState('');
    // const [shadow, setShadow] = useState('');
    const [pageAlign, setPageAlign] = useState('');
    const [colourBackground, setColourBackground] = useState('#FFFFFF');
    const [colourContainer, setColourContainer] = useState('#FFFFFF');
    const [colourBox, setColourBox] = useState('#FFFFFF');
    const [colourText, setColourText] = useState('#000000');


    /*
        Payload objects:

        websites = [
            {
                title: string,
                url: string
            }
        ]

        socials = [
            (url)
        ]

        (Created right before sending DB request)
        options = {
            // classic: true/false,
            // shadow: true/false,
            align: string ("left"/"centre"/"right"),
            colour_bg: string ("#XXXXXX"), // entire page background colour
            colour_primary: string ("#XXXXXX"), // text colour
            colour_secondary: string ("#XXXXXX"), // sub-text/link colour
        }
    */

    const [unsavedChangesInfo, setUnsavedChangesInfo] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);



    // load data

    useEffect(() => {
        if(props.loaded) {
            setButtonDisable(false);

            updateName(props.recentState.data.name ? props.recentState.data.name : '');
            updateBio(props.recentState.data.biography ? props.recentState.data.biography : '');

            updateSocials(props.recentState.socialsData ? props.recentState.socialsData : []);
            updateWebsites(props.recentState.websitesData ? props.recentState.websitesData : []);

            updatePfpURL(props.recentState.images.profile ? props.recentState.images.profile : '');
            updateBgpURL(props.recentState.images.background ? props.recentState.images.background : '');

            setPageAlign(props.recentState.options.align ? props.recentState.options.align : '')
            setColourBackground(props.recentState.options.colour_bg ? props.recentState.options.colour_bg : '')
            setColourContainer(props.recentState.options.colour_container ? props.recentState.options.colour_container : '')
            setColourBox(props.recentState.options.colour_box ? props.recentState.options.colour_box : '')
            setColourText(props.recentState.options.colour_text ? props.recentState.options.colour_text : '')
        }
    }, [props]);

    useEffect(() => {
        if(props.loaded) {
            if(
                (props.recentState.data.name !== name) ||
                (props.recentState.data.biography !== bio) ||
                (props.recentState.images.profile !== pfpURL) ||
                (props.recentState.images.background !== bgpURL)
            ) {
                setUnsavedChangesInfo(true);
            } else {
                setUnsavedChangesInfo(false);
            }
        }
    }, [props, name, bio, pfpURL, bgpURL]);

    const seeChanged = () => {
        if(true) {
            return true;
        }
        return false;
    }

    const history = useHistory();

    const updatePage = (e) => {
        e.preventDefault();

        setButtonDisable(true);

        let dataConstruct = {
            data: {
                biography: bio,
                name: name
            },
            images: {
                background: bgpURL,
                profile: pfpURL
            },
            socialsData: socials,
            websitesData: websites,
            options: {
                // classic: classicMode,
                // shadow: shadow,
                align: pageAlign,
                colour_bg: colourBackground,
                colour_container: colourContainer,
                colour_box: colourBox,
                colour_text: colourText
            },
        };

        database.collection("pages").doc(props.pageURL).update(dataConstruct)
        .then(function() {

            setButtonDisable(false);

            history.go(0);
            // TODO: graphically show
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);

            setButtonDisable(false);
        });
    }

    
    const addSocial = () => {
        let newSocials = socials;
        newSocials.push("");
        updateSocials(newSocials); 
        setTrigger(!trigger);
    }

    const setSocialUrl = (value, index) => {
        let newSocials = socials;
        newSocials[index] = value;
        updateSocials(newSocials);
        setTrigger(!trigger);
    }

    const moveSocial = (value, index) => {
        let newSocials = socials;
        let temp = newSocials[index];

        if(value === "up") {
            let pre = index - 1; // safe cuz checked
            newSocials[index] = newSocials[pre];
            newSocials[pre] = temp;
        } else if (value === "down") {
            // or just else lmao
            let post = index + 1;
            newSocials[index] = newSocials[post];
            newSocials[post] = temp;
        }

        updateSocials(newSocials);
        setTrigger(!trigger);
    }

    const deleteSocial = (index) => {
        let newSocials = socials;
        if (index > -1) {
            newSocials.splice(index, 1);
        }
        updateSocials(newSocials);
        setTrigger(!trigger);
    }



    const addWebsite = () => {
        let newWebsites = websites;
        newWebsites.push({
            title: '',
            url: '',
        });
        updateWebsites(newWebsites);
        setTrigger(!trigger);
    }

    const setWebsiteUrl = (value, index) => {
        let newWebsites = websites;
        newWebsites[index] = {
            title: newWebsites[index].title,
            url: value
        };
        updateWebsites(newWebsites);
        setTrigger(!trigger);
    }

    const setWebsiteTitle = (value, index) => {
        let newWebsites = websites;
        newWebsites[index] = {
            title: value,
            url: newWebsites[index].url
        };
        updateWebsites(newWebsites);
        setTrigger(!trigger);
    }

    const moveWebsite = (value, index) => {
        let newWebsites = websites;
        let temp = newWebsites[index];

        if(value === "up") {
            let pre = index - 1; // safe cuz checked
            deleteWebsite(index)
            newWebsites.splice(pre, 0, temp)
            
        } else if (value === "down") {
            // or just else lmao
            let post = index + 1;
            deleteWebsite(index)
            newWebsites.splice(post, 0, temp)
        }
        updateWebsites(newWebsites);
    }

    const deleteWebsite = (index) => {
        let newWebsites = websites;
        if (index > -1) {
            newWebsites.splice(index, 1);
        }
        updateWebsites(newWebsites);
        setTrigger(!trigger);
    }

    const getWebsiteTitle = (index) => {
        return websites[index].title;
    }
    const getWebsiteUrl = (index) => {
        return websites[index].url;
    }
    
    // display websites information
    useEffect(() => {
        let returnDataWebsite = []; // show links on editor
        let returnDisplayDataWebsite = []; // show links on preview

        let returnDataSocial = [];
        let returnDisplayDataSocial = [];

        for (let index = 0; index < websites.length; index++) {
            // editor
            returnDataWebsite.push(
                <WebsiteItem
                    key={index}
                    id={index}
                    title={getWebsiteTitle}
                    url={getWebsiteUrl}
                    
                    setTitle={setWebsiteTitle}
                    setUrl={setWebsiteUrl}
                    delete={deleteWebsite}
                    move={moveWebsite}
                    length={websites.length} />
            );
            
            // preview
            if(websites[index].url && websites[index].title) {
                returnDisplayDataWebsite.push(
                    <WebsiteLink
                        colour={colourBox}
                        key={index}
                        id={index}
                        url={websites[index].url}
                        title={websites[index].title} />
                );
            }
        }
        
        for (let index = 0; index < socials.length; index++) {
            // editor
            returnDataSocial.push(
                <SocialItem
                    key={index}
                    id={index}
                    url={socials[index]}
                    setUrl={setSocialUrl}
                    delete={deleteSocial}
                    move={moveSocial}
                    length={socials.length} />
            );

            // preview
            returnDisplayDataSocial.push(
                <SocialLink
                    key={index}
                    url={socials[index]} />
            )
        }

        setDisplayEditWebsites(returnDataWebsite);
        setDisplayWebsites(returnDisplayDataWebsite);

        setDisplayEditSocials(returnDataSocial);
        setDisplaySocials(returnDisplayDataSocial);
    }, [websites, socials, colourBox, trigger]);
    

    const [showActions, setShowActions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [pageDeleteError, setPageDeleteError] = useState('');

    function showDeleteConfirm() {
        setDisplayConfirm(true);
        setConfirming(true);
    }

    function hideDeleteConfirm() {
        setDisplayConfirm(false);
        setConfirming(false);
    }

    async function handleDeletePage() {
        setLoading(true);

        // check if there even is a page to delete & user to delete from
        if(pages.pages && currentUser) {

            // first: delete the page document under 'pages' collection
            // second: delete the profile URL (page's URL) under 'users' collection, under user id's collection

            database.collection("pages").doc(pages.pages[0]).delete()
            .then(function() {

                database.collection("users").doc(currentUser.uid).set({
                    pages: [],
                }).then(function() {
                    // both delete success - time to party

                    setLoading(false);
                    history.go(0);
                }).catch(function(err) {
                    setPageDeleteError('Error resetting pages array under users collection: ' + err);
        
                    setLoading(false);
                })
            })
            .catch(function(error) {
                setPageDeleteError('Error deleting page under pages collection: ' + error);
    
                setLoading(false);
            });
        }
    }

    return (
                <div className='demo-container'>

                    <div className='mock-background'>
                        <div 
                          className={`profile-container-wrapper ${pageAlign}`} 
                          style={{ backgroundColor: colourBackground }}>
                            <div 
                              className={`profile-container ${((bgpURL && !pfpURL) ? 'bg-alone' : '') || ((pfpURL && !bgpURL) ? 'pf-alone' : '') || ((!pfpURL && !bgpURL) ? 'none' : '')}`}
                              style={{
                                background: bgpURL ? colourContainer : 'transparent',
                                color: colourText
                              }}>
                                <div className='profile'>
                                    <div className='photos'>
                                        <img className='bgp' src={bgpURL} alt="background" />
                                        <img className='pfp' src={pfpURL} alt="profile" />
                                    </div>
                                    <div className='info'>
                                        <h3>{name}</h3>
                                        <p>{bio}</p>
                                    </div>
                                    <div className='socials'>
                                        {displaySocials}
                                    </div>
                                    <div className='links'>
                                        {displayWebsites}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='engage'>
                        <div className='profile-section'>
                            <div className='info'>
                                <h4>Your Internetspace</h4>
                                <div style={{ display:"flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ lineHeight:"160%" }}>
                                        You're signed in as {email} 👍<br />
                                        <a className='text-link' target="_blank" rel="noreferrer" href={`http://internetspace.co/${pages.pages}`}>
                                            internetspace.co/{pages.pages}
                                        </a> 🤩
                                    </div>
                                    <div className='more' onClick={() => setShowActions(!showActions)}>
                                        {showActions ? (
                                            <XIcon />
                                        ) : (
                                            <MoreIcon />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={`more-actions ${showActions}`}>
                                <div className='delete-tray'>
                                    <div className='delete-container'>
                                        <button disabled={loading} className={`button red deletepage dp${confirming}`} onClick={(confirming) ? hideDeleteConfirm : showDeleteConfirm}>
                                            {(confirming) ? 'No! Cancel!' : 'Delete Page'}
                                        </button>
                                        {(displayConfirm) && (
                                            <button disabled={loading} className='page-delete-confirm' onClick={handleDeletePage}>
                                                Confirm, Delete!
                                            </button>
                                        )}
                                        {(pageDeleteError) && (
                                            <div className='page-delete-error'>
                                                {pageDeleteError}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='input-section'>
                            <div className='input-row'>
                                <div className='input-box'>
                                    <h4>Background Photo</h4>
                                    <input type="text" value={bgpURL} onChange={e=>updateBgpURL(e.target.value)} />
                                </div>
                                <div className='input-box'>
                                    <h4>Profile Photo</h4>
                                    <input type="text" value={pfpURL} onChange={e=>updatePfpURL(e.target.value)} />
                                </div>
                            </div>
                            <div className='input-row'>
                                <div className='input-box'>
                                    <h4>Name</h4>
                                    <input type="text" value={name} onChange={e=>updateName(e.target.value)} />
                                </div>
                                <div className='input-box'>
                                    <h4>Biography</h4>
                                    <input type="text" value={bio} onChange={e=>updateBio(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='input-section'>
                            <h4>Socials</h4>
                            <p>
                                Make sure to write 'http://' in front of all links!
                            </p>
                            <div className='input-box social'>
                                {displayEditSocials}
                                <div onClick={addSocial}>
                                    Add Social Link
                                </div>
                            </div>
                        </div>
                        <div className='input-section'>
                            <h4>Websites</h4>
                            <div className='input-box websites'>
                                {displayEditWebsites ? displayEditWebsites : displayEditWebsites}
                                <div onClick={addWebsite}>
                                    Add Website
                                </div>
                            </div>
                        </div>
                        <div className='input-section options'>
                            <h4>Options</h4>
                            {/* 
                            <h5>Classic Mode</h5>
                            <div className={`toggle-container ${classicMode}`} onClick={e=>setClassicMode(classicMode ? false : true)}>
                                <div className='toggle-nob'></div>
                            </div>

                            <h5>Drop Shadow</h5>
                            <div className={`toggle-container ${shadow}`} onClick={e=>setShadow(shadow ? false : true)}>
                                <div className='toggle-nob'></div>
                            </div>
                             */}

                            <h5>Alignment</h5>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <div onClick={()=>setPageAlign("left")} style={{cursor:"pointer", fontWeight: (pageAlign === "left") ? "bold" : "normal"}}>Left</div>
                                <div onClick={()=>setPageAlign("centre")} style={{cursor:"pointer", fontWeight: (pageAlign === "centre") ? "bold" : "normal"}}>Centre</div>
                                <div onClick={()=>setPageAlign("right")} style={{cursor:"pointer", fontWeight: (pageAlign === "right") ? "bold" : "normal"}}>Right</div>
                            </div>

                            <h5>Background Colour</h5>
                            <input type="color" id="background" name="background" value={colourBackground} onChange={e=>setColourBackground(e.target.value)} />
                            {colourBackground}

                            <h5>Container Colour</h5>
                            <input type="color" id="secondary" name="secondary" value={colourContainer} onChange={e=>setColourContainer(e.target.value)} />
                            {colourContainer}
                            
                            <h5>Box Colour</h5>
                            <input type="color" id="primary" name="primary" value={colourBox} onChange={e=>setColourBox(e.target.value)} />
                            {colourBox}

                            <h5>Text Colour</h5>
                            <input type="color" id="secondary" name="secondary" value={colourText} onChange={e=>setColourText(e.target.value)} />
                            {colourText}
                        </div>
                        {(unsavedChangesInfo || seeChanged()) && (
                            <div className='save-change'>
                                <div className='save-change-reminder'>
                                    Save your changes!
                                </div>
                                <div className='save'>
                                    <button disabled={buttonDisable} onClick={updatePage} className='button green'>
                                        Publish
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
    );
}

export default Editor