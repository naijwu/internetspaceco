import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { database } from './firebase';

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

const Editor = (props) => {

    const { currentUser } = useAuth();

    const [name, updateName] = useState('');
    const [bio, updateBio] = useState('');

    const [websites, updateWebsites] = useState([]); // {img: 'img url', name: 'link name', link: '',}
    const [socials, updateSocials] = useState([]);

    const [pfpURL, updatePfpURL] = useState('');
    const [bgpURL, updateBgpURL] = useState('');

    const [unsavedChangesInfo, setUnsavedChangesInfo] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

    // const to manage adding social icons (messy... unoptimized.... :( )
    const [displaySocialOne, updateDisplaySocialOne] = useState(true);
    const [socialOne, updateSocialOne] = useState('');
    const [displaySocialTwo, updateDisplaySocialTwo] = useState(false);
    const [socialTwo, updateSocialTwo] = useState('');
    const [displaySocialThree, updateDisplaySocialThree] = useState(false);
    const [socialThree, updateSocialThree] = useState('');
    const [displaySocialFour, updateDisplaySocialFour] = useState(false);
    const [socialFour, updateSocialFour] = useState('');
    const [displaySocialFive, updateDisplaySocialFive] = useState(false);
    const [socialFive, updateSocialFive] = useState('');

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
        if(socialOne) {
            updateDisplaySocialOne(true);
        }
        if((socialOne) || (socialTwo)) {
            updateDisplaySocialTwo(true);
        } else if (!(socialOne)) {
            updateDisplaySocialTwo(false);
        }
        if((socialTwo) || (socialThree)) {
            updateDisplaySocialThree(true);
        } else if (!(socialTwo)) {
            updateDisplaySocialThree(false);
        }
        if((socialThree) || socialFour) {
            updateDisplaySocialFour(true);
        } else if (!(socialThree)) {
            updateDisplaySocialFour(false);
        }
        if((socialFour) || socialFive) {
            updateDisplaySocialFive(true);
        } else if (!(socialFour)) {
            updateDisplaySocialFive(false);
        }
    }, [socialOne, socialTwo, socialThree, socialFour, socialFive]);

    useEffect(() => {
        let type = returnSocialType(socialOne);
        let link = socialOne;
        let array = socials;
        array[0] = {
            type: type,
            link: link,
            // actualLink for emails
        }
        updateSocials(array);
    }, [socialOne, socials]);
    
    useEffect(() => {
        let type = returnSocialType(socialTwo);
        let link = socialTwo;
        let array = socials;
        array[1] = {
            type: type,
            link: link,
        }
        updateSocials(array);
    }, [socialTwo, socials])
    
    useEffect(() => {
        let type = returnSocialType(socialThree);
        let link = socialThree;
        let array = socials;
        array[2] = {
            type: type,
            link: link,
        }
        updateSocials(array);
    }, [socialThree, socials])
    
    useEffect(() => {
        let type = returnSocialType(socialFour);
        let link = socialFour;
        let array = socials;
        array[3] = {
            type: type,
            link: link,
        }
        updateSocials(array);
    }, [socialFour, socials])
    
    useEffect(() => {
        let type = returnSocialType(socialFive);
        let link = socialFive;
        let array = socials;
        array[4] = {
            type: type,
            link: link,
        }
        updateSocials(array);
    }, [socialFive, socials])


    const displaySocials = () => {
        let returnData = [];

        socials.forEach((item) => {
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
                    <a target="_blank" rel="noreferrer" href={`${item.link}`} className={`icon ${item.type}`}>
                        <img src={icon} alt={item.type} />
                    </a>
                );
            }
        });

        return returnData;
    }

    const [displayWebsiteOne, updateDisplayWebsiteOne] = useState(true);
    const [websiteOneName, updateWebsiteOneName] = useState('');
    const [websiteOneLink, updateWebsiteOneLink] = useState('');
    
    const [displayWebsiteTwo, updateDisplayWebsiteTwo] = useState(false);
    const [websiteTwoName, updateWebsiteTwoName] = useState('');
    const [websiteTwoLink, updateWebsiteTwoLink] = useState('');
    
    const [displayWebsiteThree, updateDisplayWebsiteThree] = useState(false);
    const [websiteThreeName, updateWebsiteThreeName] = useState('');
    const [websiteThreeLink, updateWebsiteThreeLink] = useState('');
    
    const [displayWebsiteFour, updateDisplayWebsiteFour] = useState(false);
    const [websiteFourName, updateWebsiteFourName] = useState('');
    const [websiteFourLink, updateWebsiteFourLink] = useState('');
    
    const [displayWebsiteFive, updateDisplayWebsiteFive] = useState(false);
    const [websiteFiveName, updateWebsiteFiveName] = useState('');
    const [websiteFiveLink, updateWebsiteFiveLink] = useState('');

    useEffect(() => {
        if((websiteOneLink && websiteOneName) || (websiteTwoName) || (websiteTwoLink)) {
            updateDisplayWebsiteTwo(true);
        } else if (!(websiteTwoLink || websiteTwoName)) {
            updateDisplayWebsiteTwo(false);
        }
        if((websiteTwoLink && websiteTwoName) || websiteThreeName || websiteThreeLink) {
            updateDisplayWebsiteThree(true);
        } else if (!(websiteThreeLink || websiteThreeName)) {
            updateDisplayWebsiteThree(false);
        }
        if((websiteThreeLink && websiteThreeName) || websiteFourName || websiteFourLink) {
            updateDisplayWebsiteFour(true);
        } else if (!(websiteFourLink || websiteFourName)) {
            updateDisplayWebsiteFour(false);
        }
        if((websiteFourLink && websiteFourName) || websiteFiveName || websiteFiveLink) {
            updateDisplayWebsiteFive(true);
        } else if (!(websiteFiveLink || websiteFiveName)) {
            updateDisplayWebsiteFive(false);
        }
    }, [websiteOneName, websiteOneLink, websiteTwoName, websiteTwoLink, websiteThreeName, websiteThreeLink, websiteFourName, websiteFourLink, websiteFiveName, websiteFiveLink]);

    useEffect(() => {
        let name = websiteOneName;
        let link = websiteOneLink;
        let array = websites;
        array[0] = {
            img: '',
            name: name,
            link: link,
        }
        updateWebsites(array);
    }, [websiteOneName, websiteOneLink, websites]);
    
    useEffect(() => {
        let name = websiteTwoName;
        let link = websiteTwoLink;
        let array = websites;
        array[1] = {
            img: '',
            name: name,
            link: link,
        }
        updateWebsites(array);
    }, [websiteTwoName, websiteTwoLink, websites])
    
    useEffect(() => {
        let name = websiteThreeName;
        let link = websiteThreeLink;
        let array = websites;
        array[2] = {
            img: '',
            name: name,
            link: link,
        }
        updateWebsites(array);
    }, [websiteThreeName, websiteThreeLink, websites])
    
    useEffect(() => {
        let name = websiteFourName;
        let link = websiteFourLink;
        let array = websites;
        array[3] = {
            img: '',
            name: name,
            link: link,
        }
        updateWebsites(array);
    }, [websiteFourName, websiteFourLink, websites])
    
    useEffect(() => {
        let name = websiteFiveName;
        let link = websiteFiveLink;
        let array = websites;
        array[4] = {
            img: '',
            name: name,
            link: link,
        }
        updateWebsites(array);
    }, [websiteFiveLink, websiteFiveName, websites])

    const displayWebsite = () => {
        let returnData = [];

        websites.forEach((item) => {
            if(item.name && item.link) {
                returnData.push(
                    <a target="_blank" rel="noreferrer" className='link-item' href={`${item.link}`}>
                        {/* <img className='link-image' src={} /> /* perhaps send opengraph req */}
                        {/* <div className='link-img'>{item.img}</div> */}
                        <div className='link-content'>
                            <div className='link-text'>{item.name}</div>
                            <div className='link-url'>{item.link}</div>
                        </div>
                    </a>
                );
            }
        })

        return returnData;
    }

    // loadin everything, setting initials

    const [initialWebOneName, setInitialWebOneName] = useState('');
    const [initialWebOneLink, setInitialWebOneLink] = useState('');
    const [initialWebTwoName, setInitialWebTwoName] = useState('');
    const [initialWebTwoLink, setInitialWebTwoLink] = useState('');
    const [initialWebThreeName, setInitialWebThreeName] = useState('');
    const [initialWebThreeLink, setInitialWebThreeLink] = useState('');
    const [initialWebFourName, setInitialWebFourName] = useState('');
    const [initialWebFourLink, setInitialWebFourLink] = useState('');
    const [initialWebFiveName, setInitialWebFiveName] = useState('');
    const [initialWebFiveLink, setInitialWebFiveLink] = useState('');

    const [initialSocialOne, setInitialSocialOne] = useState('');
    const [initialSocialTwo, setInitialSocialTwo] = useState('');
    const [initialSocialThree, setInitialSocialThree] = useState('');
    const [initialSocialFour, setInitialSocialFour] = useState('');
    const [initialSocialFive, setInitialSocialFive] = useState('');

    useEffect(() => {
        if(props.loaded) {
            setButtonDisable(false);
            updateName(props.recentState.data.name ? props.recentState.data.name : '');
            updateBio(props.recentState.data.biography ? props.recentState.data.biography : '');

            updateSocials(props.recentState.socials ? props.recentState.socials : []);
            updateWebsites(props.recentState.websites ? props.recentState.websites : []);


            updatePfpURL(props.recentState.images.profile ? props.recentState.images.profile : '');
            updateBgpURL(props.recentState.images.background ? props.recentState.images.background : '');


            updateSocialOne(props.recentState.socials[0] ? props.recentState.socials[0].link : '');
            setInitialSocialOne(props.recentState.socials[0] ? props.recentState.socials[0].link : '');
            updateSocialTwo(props.recentState.socials[1] ? props.recentState.socials[1].link : '');
            setInitialSocialTwo(props.recentState.socials[1] ? props.recentState.socials[1].link : '');
            updateSocialThree(props.recentState.socials[2] ? props.recentState.socials[2].link : '');
            setInitialSocialThree(props.recentState.socials[2] ? props.recentState.socials[2].link : '');
            updateSocialFour(props.recentState.socials[3] ? props.recentState.socials[3].link : '');
            setInitialSocialFour(props.recentState.socials[3] ? props.recentState.socials[3].link : '');
            updateSocialFive(props.recentState.socials[4] ? props.recentState.socials[4].link : '');
            setInitialSocialFive(props.recentState.socials[4] ? props.recentState.socials[4].link : '');
            

            updateWebsiteOneName(props.recentState.websites[0] ? props.recentState.websites[0].name : '');
            updateWebsiteOneLink(props.recentState.websites[0] ? props.recentState.websites[0].link : '');
            setInitialWebOneName(props.recentState.websites[0] ? props.recentState.websites[0].name : '');
            setInitialWebOneLink(props.recentState.websites[0] ? props.recentState.websites[0].link : '');

            updateWebsiteTwoName(props.recentState.websites[1] ? props.recentState.websites[1].name : '');
            updateWebsiteTwoLink(props.recentState.websites[1] ? props.recentState.websites[1].link : '');
            setInitialWebTwoName(props.recentState.websites[1] ? props.recentState.websites[1].name : '');
            setInitialWebTwoLink(props.recentState.websites[1] ? props.recentState.websites[1].link : '');

            updateWebsiteThreeName(props.recentState.websites[2] ? props.recentState.websites[2].name : '');
            updateWebsiteThreeLink(props.recentState.websites[2] ? props.recentState.websites[2].link : '');
            setInitialWebThreeName(props.recentState.websites[2] ? props.recentState.websites[2].name : '');
            setInitialWebThreeLink(props.recentState.websites[2] ? props.recentState.websites[2].link : '');

            updateWebsiteFourName(props.recentState.websites[3] ? props.recentState.websites[3].name : '');
            updateWebsiteFourLink(props.recentState.websites[3] ? props.recentState.websites[3].link : '');
            setInitialWebFourName(props.recentState.websites[3] ? props.recentState.websites[3].name : '');
            setInitialWebFourLink(props.recentState.websites[3] ? props.recentState.websites[3].link : '');

            updateWebsiteFiveName(props.recentState.websites[4] ? props.recentState.websites[4].name : '');
            updateWebsiteFiveLink(props.recentState.websites[4] ? props.recentState.websites[4].link : '');
            setInitialWebFiveName(props.recentState.websites[4] ? props.recentState.websites[4].name : '');
            setInitialWebFiveLink(props.recentState.websites[4] ? props.recentState.websites[4].link : '');
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
        if(props.loaded) {
            if(
                (initialWebOneName !== websiteOneName) ||
                (initialWebOneLink !== websiteOneLink) ||
                (initialWebTwoName !== websiteTwoName) ||
                (initialWebTwoLink !== websiteTwoLink) ||
                (initialWebThreeName !== websiteThreeName) ||
                (initialWebThreeLink !== websiteThreeLink) ||
                (initialWebFourName !== websiteFourName) ||
                (initialWebFourLink !== websiteFourLink) ||
                (initialWebFiveName !== websiteFiveName) ||
                (initialWebFiveLink !== websiteFiveLink) ||
                (initialSocialOne !== socialOne) ||
                (initialSocialTwo !== socialTwo) ||
                (initialSocialThree !== socialThree) ||
                (initialSocialFour !== socialFour) ||
                (initialSocialFive !== socialFive)
            ) {
                 return true;
            }
            return false;
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
            websites: websites
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

    return (
                <div className='demo-container'>
                    <div className='demo'>
                        <div className='profile'>
                            <div className={`photos ${((bgpURL && !pfpURL) ? 'bg-alone' : '') || ((pfpURL && !bgpURL) ? 'pf-alone' : '') || ((!pfpURL && !bgpURL) ? 'none' : '')}`}>
                                <img className='bgp' src={bgpURL} alt="background" />
                                <img className='pfp' src={pfpURL} alt="profile" />
                            </div>
                            <div className='info'>
                                <h3>{name}</h3>
                                <p>{bio}</p>
                            </div>
                            <div className='socials'>
                                {socials && displaySocials()}
                            </div>
                            <div className='links'>
                                {websites && displayWebsite()}
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
                                {displaySocialOne && (
                                    <div className='add-social'>
                                        <h5>Link: </h5>
                                        <input type="text" value={socialOne} onChange={e=>updateSocialOne(e.target.value)} />
                                    </div>
                                )}
                                {displaySocialTwo && (
                                    <div className='add-social'>
                                        <h5>Link: </h5>
                                        <input type="text" value={socialTwo} onChange={e=>updateSocialTwo(e.target.value)} />
                                    </div>
                                )}
                                {displaySocialThree && (
                                    <div className='add-social'>
                                        <h5>Link: </h5>
                                        <input type="text" value={socialThree} onChange={e=>updateSocialThree(e.target.value)} />
                                    </div>
                                )}
                                {displaySocialFour && (
                                    <div className='add-social'>
                                        <h5>Link: </h5>
                                        <input type="text" value={socialFour} onChange={e=>updateSocialFour(e.target.value)} />
                                    </div>
                                )}
                                {displaySocialFive && (
                                    <div className='add-social'>
                                        <h5>Link: </h5>
                                        <input type="text" value={socialFive} onChange={e=>updateSocialFive(e.target.value)} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='input-section'>
                            <h4>Websites</h4>
                            <div className='input-box websites'>
                                {displayWebsiteOne && (
                                    <div className='input-row'>
                                        <div className='website-name'>
                                            Title: 
                                            <input type="text" value={websiteOneName} onChange={e=>updateWebsiteOneName(e.target.value)} />
                                        </div>
                                        <div className='website-link'>
                                            Link: 
                                            <input type="text" value={websiteOneLink} onChange={e=>updateWebsiteOneLink(e.target.value)} />
                                        </div>
                                    </div>
                                )}
                                {displayWebsiteTwo && (
                                    <div className='input-row'>
                                        <div className='website-name'>
                                            Title: 
                                            <input type="text" value={websiteTwoName} onChange={e=>updateWebsiteTwoName(e.target.value)} />
                                        </div>
                                        <div className='website-link'>
                                            Link: 
                                            <input type="text" value={websiteTwoLink} onChange={e=>updateWebsiteTwoLink(e.target.value)} />
                                        </div>
                                    </div>
                                )}
                                {displayWebsiteThree && (
                                    <div className='input-row'>
                                        <div className='website-name'>
                                            Title: 
                                            <input type="text" value={websiteThreeName} onChange={e=>updateWebsiteThreeName(e.target.value)} />
                                        </div>
                                        <div className='website-link'>
                                            Link: 
                                            <input type="text" value={websiteThreeLink} onChange={e=>updateWebsiteThreeLink(e.target.value)} />
                                        </div>
                                    </div>
                                )}
                                {displayWebsiteFour && (
                                    <div className='input-row'>
                                        <div className='website-name'>
                                            Title: 
                                            <input type="text" value={websiteFourName} onChange={e=>updateWebsiteFourName(e.target.value)} />
                                        </div>
                                        <div className='website-link'>
                                            Link: 
                                            <input type="text" value={websiteFourLink} onChange={e=>updateWebsiteFourLink(e.target.value)} />
                                        </div>
                                    </div>
                                )}
                                {displayWebsiteFive && (
                                    <div className='input-row'>
                                        <div className='website-name'>
                                            Title: 
                                            <input type="text" value={websiteFiveName} onChange={e=>updateWebsiteFiveName(e.target.value)} />
                                        </div>
                                        <div className='website-link'>
                                            Link: 
                                            <input type="text" value={websiteFiveLink} onChange={e=>updateWebsiteFiveLink(e.target.value)} />
                                        </div>
                                    </div>
                                )}
                            </div>
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