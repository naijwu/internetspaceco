import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { database } from './firebase';
import { v4 as uuidv4 } from 'uuid';

import InstagramIcon from './icons/instagram.svg';
import GithubIcon from './icons/github.svg';
import MailIcon from './icons/mail.svg';
import FacebookIcon from './icons/facebook.svg';
import TwitterIcon from './icons/twitter.svg';
import TwitchIcon from './icons/twitch.svg';
import CodepenIcon from './icons/codepen.svg';
import FigmaIcon from './icons/figma.svg';
import GitlabIcon from './icons/gitlab.svg';
import LinkedinIcon from './icons/linkedin.svg';
import TrelloIcon from './icons/trello.svg';
import YoutubeIcon from './icons/youtube.svg';
import WebsiteItem from './components/WebsiteItem';
import WebsiteLink from './components/WebsiteLink';

const Editor = (props) => {

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
    const [trigger, setTrigger] = useState(false);

    // For data payload
    const [websites, updateWebsites] = useState([]); 
    const [socials, updateSocials] = useState([]);

    // Only for input management purposes
    const [classicMode, setClassicMode] = useState('');
    const [textAlign, setTextAlign] = useState('');
    const [shadow, setShadow] = useState('');
    const [colourBackground, setColourBackground] = useState('#FFFFFF');
    const [colourPrimary, setColourPrimary] = useState('#FFFFFF');
    const [colourSecondary, setColourSecondary] = useState('#FFFFFF');


    /*
        Payload objects:

        websites = {
            [ID]: {
                title: string,
                url: string
            },
            ...
        }

        socials = {
            [ID]: {
                type: string,
                url: string
            },
            ...
        }

        (Created right before sending DB request)
        options = {
            classic: true/false,
            align: string (left/centre/right),
            shadow: true/false,
            colour_bg: string (#XXXXXX), // entire page background colour
            colour_primary: string (#XXXXXX), // text colour
            colour_secondary: string (#XXXXXX), // sub-text/link colour
        }
    */

    const [unsavedChangesInfo, setUnsavedChangesInfo] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);


    const returnSocialType = (link) => {
        if (link.indexOf('instagram') > -1) {
            return 'instagram';
        } else if (link.indexOf('github') > -1) {
            return 'github';
        } else if (link.indexOf('@') > -1) {
            return 'email';
        } else if (link.indexOf('facebook') > -1) {
            return 'facebook';
        } else if (link.indexOf('linkedin') > -1) {
            return 'linkedin';
        } else if (link.indexOf('twitter') > -1) {
            return 'twitter';
        } else if (link.indexOf('twitch') > -1) {
            return 'twitch';
        } else if (link.indexOf('codepen') > -1) {
            return 'codepen';
        } else if (link.indexOf('figma') > -1) {
            return 'figma';
        } else if (link.indexOf('gitlab') > -1) {
            return 'gitlab';
        } else if (link.indexOf('trello') > -1) {
            return 'trello';
        } else if (link.indexOf('youtube') > -1) {
            return 'youtube';
        } else {
            return 'default';
        }
    }

    useEffect(() => {

        let returnData = [];

        for (let item in socials) {
            let icon = '';

            switch(item.type) {
                case 'instagram':
                    icon = InstagramIcon;
                    break;
                case 'github':
                    icon = GithubIcon;
                    break;
                case 'email':
                    icon = MailIcon;
                    break;
                case 'facebook':
                    icon = FacebookIcon;
                    break;
                case 'twitter':
                    icon = TwitterIcon;
                    break;
                case 'twitch':
                    icon = TwitchIcon;
                    break;
                case 'codepen':
                    icon = CodepenIcon;
                    break;
                case 'figma':
                    icon = FigmaIcon;
                    break;
                case 'gitlab':
                    icon = GitlabIcon;
                    break;
                case 'linkedin':
                    icon = LinkedinIcon;
                    break;
                case 'trello':
                    icon = TrelloIcon;
                    break;
                case 'youtube':
                    icon = YoutubeIcon;
                    break;
                default:
                    break;
            }

            if (icon) {
                returnData.push(
                    <a target="_blank" rel="noreferrer" href={`${item.url}`} className={`icon ${item.type}`}>
                        <img src={icon} alt={item.type} />
                    </a>
                );
            }
        }

        setDisplaySocials(returnData);
    }, [ socials, trigger ]);


    // load data

    useEffect(() => {
        if(props.loaded) {
            setButtonDisable(false);
            updateName(props.recentState.data.name ? props.recentState.data.name : '');
            updateBio(props.recentState.data.biography ? props.recentState.data.biography : '');

            updateSocials(props.recentState.socialsData ? props.recentState.socialsData : {});
            updateWebsites(props.recentState.websitesData ? props.recentState.websitesData : {});

            updatePfpURL(props.recentState.images.profile ? props.recentState.images.profile : '');
            updateBgpURL(props.recentState.images.background ? props.recentState.images.background : '');
            
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
            socials: socials,
            websites: websites,
            options: {
                classic: classicMode,
                align: textAlign,
                shadow: shadow,
                colour_bg: colourBackground,
                colour_primary: colourPrimary,
                colour_secondary: colourSecondary
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



    const addWebsite = () => {
        let uuid = uuidv4();

        let newWebsites = ({
            ...websites,
            [uuid]: {
                title: '',
                url: '',
            }
        });
        updateWebsites(newWebsites);
        setTrigger(trigger ? false : true);
    }

    const getWebsiteTitle = (id) => {
        return websites[id].title;
    }

    const setWebsiteTitle = (value, id) => {
        let newWebsites = websites;
        newWebsites[id].title = value;

        updateWebsites(newWebsites);
        setTrigger(trigger ? false : true);
    }

    const getWebsiteUrl = (id) => {
        return websites[id].url;
    }

    const setWebsiteUrl = (value, id) => {
        let newWebsites = websites;
        newWebsites[id].url = value;

        updateWebsites(newWebsites);
        setTrigger(trigger ? false : true);
    }

    // display websites information
    useEffect(() => {
        let returnData = [];
        let returnDisplayData = [];

        for (let item in websites) {
            returnData.push(
                <WebsiteItem
                    key={item}
                    id={item}
                    title={getWebsiteTitle}
                    url={getWebsiteUrl}
                    setTitle={setWebsiteTitle}
                    setUrl={setWebsiteUrl} />
            );
            returnDisplayData.push(
                <WebsiteLink
                    key={item}
                    id={item}
                    url={getWebsiteUrl}
                    title={getWebsiteTitle} />
            );
        }

        setDisplayEditWebsites(returnData);
        setDisplayWebsites(returnDisplayData);
    }, [websites, trigger]);


    return (
                <div className='demo-container'>
                    <div className={`profile-container ${((bgpURL && !pfpURL) ? 'bg-alone' : '') || ((pfpURL && !bgpURL) ? 'pf-alone' : '') || ((!pfpURL && !bgpURL) ? 'none' : '')}`}>
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

                    <div className='engage'>
                        <div className='input-section'>
                            <div className='input-row'>
                                <div className='input-box'>
                                    <h4>BG Photo URL</h4>
                                    <input type="text" value={bgpURL} onChange={e=>updateBgpURL(e.target.value)} />
                                </div>
                                <div className='input-box'>
                                    <h4>Profile Photo URL</h4>
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
                                
                                
                                    <div className='add-social'>
                                        <h5>Link: </h5>
                                        <input type="text" /* value={} onChange={e=>} */ />
                                    </div>
                            </div>
                        </div>
                        <div className='input-section'>
                            <h4>Websites</h4>
                            <div className='input-box websites'>
                                {displayEditWebsites}
                                <div onClick={addWebsite}>
                                    Add Website
                                </div>
                            </div>
                        </div>
                        <div className='input-section options'>
                            <h4>Options</h4>
                            <h5>Classic Mode</h5>
                            <div className={`toggle-container ${classicMode}`} onClick={e=>setClassicMode(classicMode ? false : true)}>
                                <div className='toggle-nob'></div>
                            </div>

                            <h5>Drop Shadow</h5>
                            <div className={`toggle-container ${shadow}`} onClick={e=>setShadow(shadow ? false : true)}>
                                <div className='toggle-nob'></div>
                            </div>

                            <h5>Text Align</h5>
                            <div>

                            </div>

                            <h5>Background Colour</h5>
                            <input type="color" id="background" name="background" value={colourBackground} onChange={e=>setColourBackground(e.target.value)} />
                            {colourBackground}
                            
                            <h5>Primary Colour</h5>
                            <input type="color" id="primary" name="primary" value={colourPrimary} onChange={e=>setColourPrimary(e.target.value)} />
                            {colourPrimary}

                            <h5>Secondary Colour</h5>
                            <input type="color" id="secondary" name="secondary" value={colourSecondary} onChange={e=>setColourSecondary(e.target.value)} />
                            {colourSecondary}
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