import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

// TODO: Fix the issue that Firebase doesn't recognize :user_name
// Immediate TODO: Fix up UI so I can actually navigate the site lol

export default function Profile() {

    const params = useParams();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [uid, setUid] = useState('');

    const [websites, setWebsites] = useState([]); // {img: 'img url', name: 'link name', link: '',}
    const [socials, setSocials] = useState([]);

    // TODO: Add support for profile pictures (at EDITOR side)
    const [pfpURL, setPfpURL] = useState('');
    const [bgpURL, setBgpURL] = useState('');

    // print params to console
    console.log(params.user_name);

    useEffect(() => {
        database.collection('pages').doc(params.user_name).get().then((doc) => {
            let profileData = doc.data();

            if (!doc.exists) {
                console.log("Page doesn't exist G");
            } else if (doc.exists) {
                setUid(profileData.user_id ? profileData.user_id : '');

                setName(profileData.data.name ? profileData.data.name : '');
                setBio(profileData.data.biography ? profileData.data.biography : '');

                setSocials(profileData.socials ? profileData.socials : []);
                setWebsites(profileData.websites ? profileData.websites : []);

                setPfpURL(profileData.images.profile ? profileData.images.profile : '');
                setBgpURL(profileData.images.background ? profileData.images.background : '');

                console.log(socials, websites)
            } else {
                console.log("Something went wrong"); // TODO: Graphically show the errors
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }, [params]);

    
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
                    <a href={`${item.link}`} className={`icon ${item.type}`}>
                        <img src={icon} alt={item.type} />
                    </a>
                );
            }
        });

        return returnData;
    }

    const displayWebsite = () => {
        let returnData = [];

        websites.forEach((item) => {
            if(item.name && item.link) {
                returnData.push(
                    <a className='link-item' href={`${item.link}`}>
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


    // TODO: Check if user is signed in; if signed in, check if UID matches UID of doc, if does, show option to edit 

    return (
        <>
            <div className={`profile-container ${((bgpURL && !pfpURL) ? 'bg-alone' : '') || ((pfpURL && !bgpURL) ? 'pf-alone' : '') || ((!pfpURL && !bgpURL) ? 'none' : '')}`}>
                <div className='profile'>
                    <div className='photos'>
                        {(bgpURL) && (
                            <img className='bgp' src={bgpURL} alt="background" />
                        )}
                        {(pfpURL) && (
                            <img className='pfp' src={pfpURL} alt="profile" />
                        )}
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
            <a className='profile-footer-link' href="http://internetspace.co/">
                internetspace🌌co
            </a>
        </>
    );
}