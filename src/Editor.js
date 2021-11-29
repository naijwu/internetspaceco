import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { database, uploadImageToStorage } from './firebase';
import WebsiteItem from './components/WebsiteItem';
import WebsiteLink from './components/WebsiteLink';
import SocialItem from './components/SocialItem';
import SocialLink from './components/SocialLink';

const MoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
)

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
)

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
)

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
)


const Editor = (props) => {

    const { email, pages } = props;

    const { currentUser } = useAuth();

    // WYSIWYG
    const [name, updateName] = useState('');
    const [bio, updateBio] = useState('');
    const [pfpURL, updatePfpURL] = useState('');
    const [cpURL, updateCpURL] = useState(''); 
    const [bgpURL, updateBgpURL] = useState(''); // TODO: convert to some image thing, URL 

    // image BLOBs (for upload)
    const [selectedPfp, setSelectedPfp] = useState();
    const [selectedCp, setSelectedCp] = useState();
    const [selectedBgp, setSelectedBgp] = useState();

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
    const [pageAlign, setPageAlign] = useState('');
    const [outline, setOutline] = useState('');
    const [outlineSlider, setOutlineSlider] = useState('');
    const [cardOpacity, setCardOpacity] = useState(0);
    const [cardBlur, setCardBlur] = useState(0);
    const [colourBackground, setColourBackground] = useState('#FFFFFF');
    const [colourCard, setColourCard] = useState('#FFFFFF');
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
    const [forceAllowPublish, setForceAllowPublish] = useState(false); 
    const [buttonDisable, setButtonDisable] = useState(false);



    // load data

    const initializeoutlineSlider = (value) => {
        // CONSTRAINT: value is a valid chooser value ("shadow", "", or "#XXXXXX")

        if(value === "shadow") {
            return "centre";
        } else if(value === "") {
            return "left"
        } else {
            // if hex
            return "right"
        }
    }

    useEffect(() => {
        if(props.loaded) {
            setButtonDisable(false);

            updateName(props.recentState.data.name ? props.recentState.data.name : '');
            updateBio(props.recentState.data.biography ? props.recentState.data.biography : '');

            updateSocials(props.recentState.socialsData ? props.recentState.socialsData : []);
            updateWebsites(props.recentState.websitesData ? props.recentState.websitesData : []);

            updatePfpURL(props.recentState.images.profile ? props.recentState.images.profile : '');
            updateCpURL(props.recentState.images.cover ? props.recentState.images.cover : '');
            updateBgpURL(props.recentState.images.background ? props.recentState.images.background : '');

            setPageAlign(props.recentState.options.align ? props.recentState.options.align : '')
            setOutline(props.recentState.options.outline ? props.recentState.options.outline : '')
            setOutlineSlider(props.recentState.options.outline ? initializeoutlineSlider(props.recentState.options.outline) : 'left');
            setCardOpacity(props.recentState.options.card_opacity ? props.recentState.options.card_opacity : '')
            setCardBlur(props.recentState.options.card_blur ? props.recentState.options.card_blur : '')
            setColourBackground(props.recentState.options.colour_bg ? props.recentState.options.colour_bg : '')
            setColourCard(props.recentState.options.colour_card ? props.recentState.options.colour_card : '')
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
                (props.recentState.images.cover !== cpURL) ||
                (props.recentState.images.background !== bgpURL) ||
                (props.recentState.socialsData !== socials) ||
                (props.recentState.websitesData !== websites) ||
                (props.recentState.options.align !== pageAlign) ||
                (props.recentState.options.outline !== outline) ||
                (props.recentState.options.colour_bg !== colourBackground) ||
                (props.recentState.options.card_opacity !== cardOpacity) ||
                (props.recentState.options.card_blur !== cardBlur) ||
                (props.recentState.options.colour_bg !== colourBackground) ||
                (props.recentState.options.colour_card !== colourCard) ||
                (props.recentState.options.colour_box !== colourBox) ||
                (props.recentState.options.colour_text !== colourText) ||
                forceAllowPublish
            ) {
                setUnsavedChangesInfo(true);
            } else {
                setUnsavedChangesInfo(false);
            }
        }
    }, [props, forceAllowPublish, name, bio, pfpURL, cpURL, bgpURL, socials, websites, pageAlign, outline, cardOpacity, cardBlur, colourBackground, colourCard, colourBox, colourText]);


    const history = useHistory();

    function linkify(text) {
        if( !(text.includes("http:") || text.includes("https:"))) {
            return "https://" + text;
        } else {
            return text;
        }
    }

    function magic_arr(arr) {
        let validifiedArray = arr;
        for(let i = 0; i < validifiedArray.length; i++) {

            // if empty entry, delete
            if(validifiedArray[i] === "") {
                validifiedArray.splice(i, 1);
                i--;
            } else {
                validifiedArray[i] = validifiedArray[i].toLowerCase();

                if( !(validifiedArray[i].includes("http:") || validifiedArray[i].includes("https:"))) {
                    validifiedArray[i] = "https://" + validifiedArray[i];
                }
            }
        }
        return validifiedArray;
    }

    // ewww abstractable redundant code he said
    // did nothing he did
    function magic_obj(arr) {
        let validifiedArray = arr;
        for(let i = 0; i < validifiedArray.length; i++) {

            if(validifiedArray[i].title === "" && validifiedArray[i].url === "") {
                validifiedArray.splice(i, 1);
                i--;
            } else {
                validifiedArray[i].url = validifiedArray[i].url.toLowerCase();
    
                if( !(validifiedArray[i].url.includes("http:") || validifiedArray[i].url.includes("https:"))) {
                    validifiedArray[i].url = "https://" + validifiedArray[i].url;
                }
            }
        }
        return validifiedArray;
    }

    const updatePage = async (e) => {
        e.preventDefault();

        setButtonDisable(true);

        // upload code
        let pfpUploadURL = null;
        let cpUploadURL = null;
        let bgpUploadURL = null;
        
        if(selectedPfp) {
            pfpUploadURL = await uploadImageToStorage(currentUser.uid, selectedPfp, "profile");
        }
        if(selectedCp) {
            cpUploadURL = await uploadImageToStorage(currentUser.uid, selectedCp, "cover");
        }
        if(selectedBgp) {
            bgpUploadURL = await uploadImageToStorage(currentUser.uid, selectedBgp, "background");
        }
        

        let dataConstruct = {
            data: {
                biography: bio,
                name: name
            },
            images: {
                cover: cpUploadURL ? cpUploadURL : cpURL,
                profile: pfpUploadURL ? pfpUploadURL : pfpURL,
                background: bgpUploadURL ? bgpUploadURL : bgpURL
            },
            socialsData: magic_arr(socials),
            websitesData: magic_obj(websites),
            options: {
                align: pageAlign,
                outline: outline,
                card_opacity: cardOpacity,
                card_blur: cardBlur,
                colour_bg: colourBackground,
                colour_card: colourCard,
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
        setForceAllowPublish(true);
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
        setForceAllowPublish(true);
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
        setForceAllowPublish(true);
    }

    const setWebsiteTitle = (value, index) => {
        let newWebsites = websites;
        newWebsites[index] = {
            title: value,
            url: newWebsites[index].url
        };
        updateWebsites(newWebsites);
        setTrigger(!trigger);
        setForceAllowPublish(true);
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
        setForceAllowPublish(true);
    }

    const deleteWebsite = (index) => {
        let newWebsites = websites;
        if (index > -1) {
            newWebsites.splice(index, 1);
        }
        updateWebsites(newWebsites);
        setTrigger(!trigger);
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
                    title={websites[index].title}
                    url={websites[index].url}
                    
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
                        border={(outlineSlider === "right") ? outline : false}
                        shadow={(outlineSlider === "centre")}
                        colour={colourBox}
                        key={index}
                        id={index}
                        url={linkify(websites[index].url)}
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
                    border={(outlineSlider === "right") ? outline : false}
                    shadow={(outlineSlider === "centre")}
                    key={index}
                    url={linkify(socials[index])} />
            )
        }
        
        setDisplayEditWebsites(returnDataWebsite);
        setDisplayWebsites(returnDisplayDataWebsite);

        setDisplayEditSocials(returnDataSocial);
        setDisplaySocials(returnDisplayDataSocial);
    }, [ websites, socials, colourBox, trigger, outline ]);
    

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

    function handleSelectCp(e) {
        setSelectedCp(e.target.files[0]); 
        updateCpURL(URL.createObjectURL(e.target.files[0]))
    }

    function handleSelectBgp(e) {
        setSelectedBgp(e.target.files[0]);
        updateBgpURL(URL.createObjectURL(e.target.files[0]))
    }

    function handleSelectPfp(e) {
        setSelectedPfp(e.target.files[0]);
        updatePfpURL(URL.createObjectURL(e.target.files[0]))
    }

    const hexToBg = (hex, opacity) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity}%`;
    }

    return (
                <div className='demo-container'>

                    <div className='mock-background'>
                        <div
                          className={`profile-container-wrapper ${pageAlign}`} 
                          style={{ background: (bgpURL || selectedBgp) ? `center / cover no-repeat url("${selectedBgp ? URL.createObjectURL(selectedBgp) : bgpURL}")` : colourBackground }}>
                            <div 
                              className={`profile-container ${((cpURL && !pfpURL) ? 'bg-alone' : '') || ((pfpURL && !cpURL) ? 'pf-alone' : '') || ((!pfpURL && !cpURL) ? 'none' : '')}`}
                              style={{
                                color: colourText,
                                background: cpURL ? `${hexToBg(colourCard, cardOpacity)}` : 'transparent',
                                backdropFilter: cpURL ? `blur(${cardBlur}px)` : '',
                                boxShadow: (cpURL || selectedCp) ? (outlineSlider === "centre") ? '0 0 10px rgba(0,0,0,0.03)' : 'none' : 'none',
                                border: (cpURL || selectedCp) ? (outlineSlider === "right") ? `1px solid ${outline}` : 'none' : 'none'
                              }}>
                                <div className='profile'>
                                    <div className='photos'>
                                        <img className='bgp' src={cpURL} alt="cover" />
                                        <img 
                                          style={{
                                            boxShadow: (outlineSlider === "centre") ? '0 0 10px rgba(0,0,0,0.03)' : 'none',
                                            border: (outlineSlider === "right") ? `1px solid ${outline}` : 'none'
                                          }} className='pfp' src={pfpURL} alt="profile" />
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
                                        {(displayConfirm) && (
                                            <button disabled={loading} className='page-delete-confirm' onClick={handleDeletePage}>
                                                Confirm, Delete!
                                            </button>
                                        )}
                                        <button disabled={loading} className={`button red deletepage dp${confirming}`} onClick={(confirming) ? hideDeleteConfirm : showDeleteConfirm}>
                                            {(confirming) ? 'No! Cancel!' : 'Delete Page'}
                                        </button>
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
                                    <h4>Name</h4>
                                    <input type="text" value={name} onChange={e=>updateName(e.target.value)} />
                                </div>
                                <div className='input-box'>
                                    <h4>Biography</h4>
                                    <input type="text" value={bio} onChange={e=>updateBio(e.target.value)} />
                                </div>
                            </div>
                            <div className="image-row">
                                <h4>Profile Photo</h4>
                                <div className="current-image">
                                    {pfpURL ? (
                                        <>
                                            <a className="dl-link" href={pfpURL} target="_blank" rel="noreferrer">
                                                {pfpURL}
                                            </a>
                                            <div className='more' onClick={()=>{updatePfpURL(""); setSelectedPfp()}}>
                                                <DeleteIcon />
                                            </div>
                                        </>
                                    ) : (
                                        <label htmlFor="file-upload-2" className="upload-image">
                                            <input id="file-upload-2" type="file" name="file" onChange={handleSelectPfp} />
                                            <PlusIcon />
                                            <div style={{marginTop:-2}}>
                                                profile image
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className='image-row'>
                                <h4>Cover Photo</h4>
                                <div className="current-image">
                                    {cpURL ? (
                                        <>
                                            <a className="dl-link" href={cpURL} target="_blank" rel="noreferrer">
                                                {cpURL}
                                            </a>
                                            <div className='more' onClick={()=>{updateCpURL(""); setSelectedCp()}}>
                                                <DeleteIcon />
                                            </div>
                                        </>
                                    ) : (
                                        <label htmlFor="file-upload-1" className="upload-image">
                                            <input id="file-upload-1" type="file" name="file" onChange={handleSelectCp} />
                                            <PlusIcon />
                                            <div style={{marginTop:-2}}>
                                                cover image
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className='image-row'>
                                <h4>Background Photo</h4>
                                <div className="current-image">
                                    {bgpURL ? (
                                        <>
                                            <a className="dl-link" href={bgpURL} target="_blank" rel="noreferrer">
                                                {bgpURL}
                                            </a>
                                            <div className='more' onClick={()=>{updateBgpURL(""); setSelectedBgp()}}>
                                                <DeleteIcon />
                                            </div>
                                        </>
                                    ) : (
                                        <label htmlFor="file-upload" className="upload-image">
                                            <input id="file-upload" type="file" name="file" onChange={handleSelectBgp} />
                                            <PlusIcon />
                                            <div style={{marginTop:-2}}>
                                                background image
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='input-section'>
                            <h4>Socials</h4>
                            <div className='input-box social'>
                                {displayEditSocials}
                                <div className="add-item" onClick={addSocial}>
                                    <PlusIcon />
                                    <div style={{marginTop:-3}}>
                                        social
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='input-section'>
                            <h4>Websites</h4>
                            <div className='input-box websites'>
                                {displayEditWebsites ? displayEditWebsites : displayEditWebsites}
                                <div className="add-item" onClick={addWebsite}>
                                    <PlusIcon />
                                    <div style={{marginTop:-3}}>
                                        website
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='input-section options'>
                            <h4>Options</h4>
                            <div className="option">
                                <p>Alignment</p>
                                <div className="slider-container">
                                    <div className="slider">
                                        <div className={`slide-item ${(pageAlign === "left") ? "me" : ""}`} onClick={()=>setPageAlign("left")}>
                                            Left
                                        </div>
                                        <div className={`slide-item ${(pageAlign === "centre") ? "me" : ""}`} onClick={()=>setPageAlign("centre")}>
                                            Centre
                                        </div>
                                        <div className={`slide-item ${(pageAlign === "right") ? "me" : ""}`} onClick={()=>setPageAlign("right")}>
                                            Right
                                        </div>
                                    </div>
                                    <div className={`slider-faux ${pageAlign}`}>
                                        <div className="slide-slider">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                            <div className="option">
                                <p>Outline</p>
                                <div className="slider-container">
                                    <div className="slider">
                                        <div className={`slide-item ${(outlineSlider === "left") ? "me" : ""}`} onClick={()=>{setOutlineSlider("left"); setOutline('')}}>
                                            None
                                        </div>
                                        <div className={`slide-item ${(outlineSlider === "centre") ? "me" : ""}`} onClick={()=>{setOutlineSlider("centre"); setOutline('shadow')}}>
                                            Shadow
                                        </div>
                                        <div className={`slide-item ${(outlineSlider === "right") ? "me" : ""}`} onClick={()=>{setOutlineSlider("right"); setOutline('#000000')}}>
                                            Border
                                        </div>
                                    </div>
                                    <div className={`slider-faux ${outlineSlider}`}>
                                        <div className="slide-slider">&nbsp;</div>
                                    </div>
                                </div>
                                <div className={`option-colour outline ${outlineSlider === "right"}`}>
                                    <input type="color" id="background" name="background" value={outline} onChange={e=>setOutline(e.target.value)} />
                                    {outline}
                                </div>
                            </div>

                            {(cpURL || selectedCp) && (
                                <>
                                    <div className="option">
                                        <p>Card Opacity</p>
                                        <input type="range" min="1" max="100" value={cardOpacity} className="slider" onChange={e=>setCardOpacity(e.target.value)} />
                                    </div>
                                    <div className="option">
                                        <p>Card Blur</p>
                                        <input type="range" min="1" max="100" value={cardBlur} className="slider" onChange={e=>setCardBlur(e.target.value)} />
                                    </div>
                                    <div className="option">
                                        <p>Card Colour</p>
                                        <div className="option-colour">
                                            <input type="color" id="secondary" name="secondary" value={colourCard} onChange={e=>setColourCard(e.target.value)} />
                                            {colourCard}
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="option">
                                <p>Background Colour</p>
                                <div className="option-colour">
                                    <input type="color" id="background" name="background" value={colourBackground} onChange={e=>setColourBackground(e.target.value)} />
                                    {colourBackground}
                                </div>
                            </div>
                            <div className="option">
                                <p>Box Colour</p>
                                <div className="option-colour">
                                    <input type="color" id="primary" name="primary" value={colourBox} onChange={e=>setColourBox(e.target.value)} />
                                    {colourBox}
                                </div>
                            </div>
                            <div className="option">
                                <p>Text Colour</p>
                                <div className="option-colour">
                                    <input type="color" id="secondary" name="secondary" value={colourText} onChange={e=>setColourText(e.target.value)} />
                                    {colourText}
                                </div>
                            </div>

                        </div>
                        {unsavedChangesInfo && (
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