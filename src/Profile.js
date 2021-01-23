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

    const [pfpURL, setPfpURL] = useState('https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1398%26cropX2%3D3908%26cropY1%3D594%26cropY2%3D3102');
    const [bgpURL, setBgpURL] = useState('https://cimg3.ibsrv.net/ibimg/hgm/1024x576-1/100/669/2020-tesla-roadster-at-2018-grand-basel-show--image-via-bluewin_100669019.jpg');


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
                    <Link to={{pathname: `${item.link}`}}  className={`icon ${item.type}`}>
                        <img src={icon} alt={item.type} />
                    </Link>
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
                    <Link className='link-item' to={{pathname: `${item.link}`}}>
                        {/* <img className='link-image' src={} /> /* perhaps send opengraph req */}
                        <div className='link-img'>{item.img}</div>
                        <div className='link-content'>
                            <div className='link-text'>{item.name}</div>
                            <div className='link-url'>{item.link}</div>
                        </div>
                    </Link>
                );
            }
        })

        return returnData;
    }

    return (
        <div className='profile-container'>
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
                    {socials && displaySocials()}
                </div>
                <div className='links'>
                    {websites && displayWebsite()}
                </div>
            </div>
        </div>
    );
}