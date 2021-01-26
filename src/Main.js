import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { database } from './firebase';

import './landing.css';

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

const socialOptions = [
    "instagram",
    "github",
    "email",
    "facebook",
    "twitter",
    "twitch",
    "codepen",
    "figma",
    "gitlab",
    "linkedin",
    "trello",
    "youtube"
];

const Main = (props) => {

    const { currentUser, loginUsingGoogle } = useAuth();

    const [demoName, updateDemoName] = useState('Elon Musk');
    const [demoBio, updateDemoBio] = useState('Martian');

    // Elon musk sample data lmao - we love papa elon
    const [websites, updateWebsites] = useState([]); // {img: 'img url', name: 'link name', link: '',}
    const [socials, updateSocials] = useState([]);

    const [pfpURL, updatePfpURL] = useState('https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1398%26cropX2%3D3908%26cropY1%3D594%26cropY2%3D3102');
    const [bgpURL, updateBgpURL] = useState('https://cimg3.ibsrv.net/ibimg/hgm/1024x576-1/100/669/2020-tesla-roadster-at-2018-grand-basel-show--image-via-bluewin_100669019.jpg');

    // const to manage adding social icons (messy... unoptimized.... :( )
    const [displaySocialOne, updateDisplaySocialOne] = useState(true);
    const [socialOne, updateSocialOne] = useState('http://twitter.com/elonmusk');
    const [socialOneH, updateSocialOneH] = useState(false);
    const [displaySocialTwo, updateDisplaySocialTwo] = useState(false);
    const [socialTwo, updateSocialTwo] = useState('http://instagram.com/elonmusk');
    const [socialTwoH, updateSocialTwoH] = useState(false);
    const [displaySocialThree, updateDisplaySocialThree] = useState(false);
    const [socialThree, updateSocialThree] = useState('');
    const [socialThreeH, updateSocialThreeH] = useState(false);
    const [displaySocialFour, updateDisplaySocialFour] = useState(false);
    const [socialFour, updateSocialFour] = useState('');
    const [socialFourH, updateSocialFourH] = useState(false);
    const [displaySocialFive, updateDisplaySocialFive] = useState(false);
    const [socialFive, updateSocialFive] = useState('');
    const [socialFiveH, updateSocialFiveH] = useState(false);

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
    const [websiteOneName, updateWebsiteOneName] = useState('Electric Toys');
    const [websiteOneLink, updateWebsiteOneLink] = useState('http://tesla.com');
    
    const [displayWebsiteTwo, updateDisplayWebsiteTwo] = useState(false);
    const [websiteTwoName, updateWebsiteTwoName] = useState('Mars Mission');
    const [websiteTwoLink, updateWebsiteTwoLink] = useState('http://spacex.com');
    
    const [displayWebsiteThree, updateDisplayWebsiteThree] = useState(false);
    const [websiteThreeName, updateWebsiteThreeName] = useState('Tunnels?');
    const [websiteThreeLink, updateWebsiteThreeLink] = useState('http://boringcompany.com');
    
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
        let img = ''
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
        let img = ''
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
        let img = ''
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
        let img = ''
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
        let img = ''
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

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleGoogleLogin(e) {
        e.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            const returnData = await loginUsingGoogle();

            database.collection('users').doc(returnData.user.uid).get().then((doc) => {
                // not the best method, but checking if they're a first time user (or effectively first time--but not effective to do this check every login)
                if(doc.exists) {
                    // is not a new user
                    history.push('/app/preview');
                    setLoading(false);
                } else if (!doc.exists) {
                    // is a new user
                    
                    database.collection("users").doc(returnData.user.uid).set({
                        pages: [],
                    })
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                        setError('Failed to create new record as first time registrant: ' + error);
                    });

                    setLoading(false);
                    history.push('/app/preview');
                }
            }).then(function() {

            }).catch(function(err) {
                setError('Failed to communicate with server: ' + err);
            });
        } catch {
            setError('Failed to log in');
        }

        setLoading(false);
    }

    return (
        <div className='container'>
            <header>
                <div className='inner-container'>
                    <h2>internetspace🌌co</h2>
                </div>
            </header>
            <div className='introduction'>
                <h1>Create your own space on the internet.</h1>
            </div>
            <div className='about'>
                <h2>It's fun to. Give it a try.</h2>
                <div className='demo-container'>
                    <div className={`profile-container ${((bgpURL && !pfpURL) ? 'bg-alone' : '') || ((pfpURL && !bgpURL) ? 'pf-alone' : '') || ((!pfpURL && !bgpURL) ? 'none' : '')}`}>
                        <div className='profile'>
                            <div className='photos'>
                                <img className='bgp' src={bgpURL} alt="background" />
                                <img className='pfp' src={pfpURL} alt="profile" />
                            </div>
                            <div className='info'>
                                <h3>{demoName}</h3>
                                <p>{demoBio}</p>
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
                                    <input type="text" value={demoName} onChange={e=>updateDemoName(e.target.value)} />
                                </div>
                                <div className='input-box'>
                                    <h4>Biography</h4>
                                    <input type="text" value={demoBio} onChange={e=>updateDemoBio(e.target.value)} />
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
                    </div>
                </div>
            </div>
            <div className='lightscamera'>
                {(!currentUser) ? (
                    <>
                        <h2>Ready? Get started!</h2>
                        <div className='button-tray'>
                            {/* <Link className='button green' to='/app/register'>
                                Create an Account
                            </Link>
                            <Link className='button' to='/app/login'>
                                Log In
                            </Link> */}
                        </div>
                        <button disabled={loading} onClick={handleGoogleLogin} className='button google'>
                            Log In Using Google
                        </button>
                        {(error) && (
                            <div className='homepage-error'>
                                {error}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <h2>Go to dashboard!</h2>
                        <Link className='button' to='/app/preview'>
                            Click Here
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Main