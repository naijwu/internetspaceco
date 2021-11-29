import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { database } from './firebase';
import SocialLink from './components/SocialLink';
import WebsiteLink from './components/WebsiteLink';

// TODO: Fix the issue that Firebase doesn't recognize :user_name
// Immediate TODO: Fix up UI so I can actually navigate the site lol

export default function Profile() {

    const params = useParams();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const [websites, setWebsites] = useState([]); // {img: 'img url', name: 'link name', link: '',}
    const [socials, setSocials] = useState([]);

    // TODO: Add support for profile pictures (at EDITOR side)
    const [pfpURL, setPfpURL] = useState('');
    const [cpURL, setCpURL] = useState(''); 
    const [bgpURL, setBgpURL] = useState('');

    // OPTIONS baby
    const [pageAlign, setPageAlign] = useState('');
    const [outline, setOutline] = useState('');
    const [cardOpacity, setCardOpacity] = useState(0);
    const [cardBlur, setCardBlur] = useState(0);
    const [colourBackground, setColourBackground] = useState('#FFFFFF');
    const [colourCard, setColourCard] = useState('#FFFFFF');
    const [colourBox, setColourBox] = useState('#FFFFFF');
    const [colourText, setColourText] = useState('#000000');

    // print params to console
    console.log(params.user_name);

    useEffect(() => {
        database.collection('pages').doc(params.user_name).get().then((doc) => {
            let profileData = doc.data();

            if (!doc.exists) {
                console.log("Page doesn't exist G");
            } else if (doc.exists) {
                setName(profileData.data.name ? profileData.data.name : '');
                setBio(profileData.data.biography ? profileData.data.biography : '');

                setSocials(profileData.socialsData ? profileData.socialsData : {});
                setWebsites(profileData.websitesData ? profileData.websitesData : {});

                setPfpURL(profileData.images.profile ? profileData.images.profile : '');
                setCpURL(profileData.images.cover ? profileData.images.cover : '');
                setBgpURL(profileData.images.background ? profileData.images.background : '');
                
                setPageAlign(profileData.options.align ? profileData.options.align : '')
                setOutline(profileData.options.outline ? profileData.options.outline : '')
                setColourBackground(profileData.options.colour_bg ? profileData.options.colour_bg : '')
                setCardOpacity(profileData.options.card_opacity ? profileData.options.card_opacity : '')
                setCardBlur(profileData.options.card_blur ? profileData.options.card_blur : '')
                setColourCard(profileData.options.colour_card ? profileData.options.colour_card : '')
                setColourBox(profileData.options.colour_box ? profileData.options.colour_box : '')
                setColourText(profileData.options.colour_text ? profileData.options.colour_text : '')
            } else {
                console.log("Something went wrong"); // TODO: Graphically show the errors
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }, [params]);

    
    const displaySocials = () => {
        let returnData = [];

        for (let item in socials) {
            returnData.push(
                <SocialLink
                    border={(!(outline === "") && (!(outline === "shadow"))) ? outline : false}
                    shadow={(outline === "shadow")}
                    key={item}
                    url={socials[item]} />
            )
        }

        return returnData;
    }

    const displayWebsite = () => {
        let returnData = [];

        for (let item in websites) {
            if(websites[item].url && websites[item].title) {
                returnData.push(
                    <WebsiteLink
                        border={(!(outline === "") && (!(outline === "shadow"))) ? outline : false}
                        shadow={(outline === "shadow")}
                        colour={colourBox}
                        key={item}
                        id={item}
                        url={websites[item].url}
                        title={websites[item].title} />
                );

            }
        }

        return returnData;
    }

    const hexToBg = (hex, opacity) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity}%`;
    }

    // TODO: Check if user is signed in; if signed in, check if UID matches UID of doc, if does, show option to edit 

    return (
        <div 
          className={`profile-container-wrapper ${pageAlign} prod`} 
          style={{ background: bgpURL ? `center / cover no-repeat url("${bgpURL}")` : colourBackground }}>
            <div 
              className={`profile-container ${((cpURL && !pfpURL) ? 'bg-alone' : '') || ((pfpURL && !cpURL) ? 'pf-alone' : '') || ((!pfpURL && !cpURL) ? 'none' : '')}`}
              style={{
                color: colourText,
                background: cpURL ? `${hexToBg(colourCard, cardOpacity)}` : 'transparent',
                backdropFilter: cpURL ? `blur(${cardBlur}px)` : '',
                boxShadow: cpURL? (outline === "shadow") ? '0 0 10px rgba(0,0,0,0.03)' : 'none' : 'none',
                border: cpURL ? (!(outline === "") && (!(outline === "shadow"))) ? `1px solid ${outline}` : 'none' : 'none'
              }}>
                <div className='profile'>
                    <div className='photos'>
                        <img className='bgp' src={cpURL} alt="cover" />
                        <img style={{
                            boxShadow: (outline === "shadow") ? '0 0 10px rgba(0,0,0,0.03)' : 'none',
                            border: (!(outline === "") && (!(outline === "shadow"))) ? `1px solid ${outline}` : 'none'
                        }} className='pfp' src={pfpURL} alt="profile" />
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
        </div>
    );
}