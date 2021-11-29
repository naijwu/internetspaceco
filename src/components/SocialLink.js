import React from 'react';

import InstagramIcon from '../icons/instagram.svg';
import GithubIcon from '../icons/github.svg';
import MailIcon from '../icons/mail.svg';
import FacebookIcon from '../icons/facebook.svg';
import TwitterIcon from '../icons/twitter.svg';
import TwitchIcon from '../icons/twitch.svg';
import CodepenIcon from '../icons/codepen.svg';
import FigmaIcon from '../icons/figma.svg';
import GitlabIcon from '../icons/gitlab.svg';
import LinkedinIcon from '../icons/linkedin.svg';
import TrelloIcon from '../icons/trello.svg';
import YoutubeIcon from '../icons/youtube.svg';
import MediumIcon from '../icons/medium.svg';
import SpotifyIcon from '../icons/spotify.svg';
import VscoIcon from '../icons/vsco.svg';
import SnapchatIcon from '../icons/snapchat.svg';

const SocialLink = (props) => {
    
    const returnSocialType = (link) => {
        if(typeof link === "string") {
            if (link.indexOf('instagram') > -1) {
                return "instagram";
            } else if (link.indexOf('github') > -1) {
                return "github"
            } else if (link.indexOf('@') > -1) {
                return "email"
            } else if (link.indexOf('facebook') > -1) {
                return "facebook"
            } else if (link.indexOf('linkedin') > -1) {
                return "linkedin"
            } else if (link.indexOf('twitter') > -1) {
                return "twitter"
            } else if (link.indexOf('twitch') > -1) {
                return "twitch"
            } else if (link.indexOf('codepen') > -1) {
                return "codepen"
            } else if (link.indexOf('figma') > -1) {
                return "figma"
            } else if (link.indexOf('gitlab') > -1) {
                return "gitlab"
            } else if (link.indexOf('trello') > -1) {
                return "trello"
            } else if (link.indexOf('youtube') > -1) {
                return "youtube"
            } else if (link.indexOf('medium') > -1) {
                return "medium"
            } else if (link.indexOf('spotify') > -1) {
                return "spotify"
            } else if (link.indexOf('vsco') > -1) {
                return "vsco"
            } else if (link.indexOf('snapchat') > -1) {
                return "snapchat"
            } else {
                return "default"
            }
        }
    }

    const returnSocialIcon = (type) => {
        switch(type) {
            case 'instagram':
                return InstagramIcon
            case 'github':
                return GithubIcon
            case 'email':
                return MailIcon;
            case 'facebook':
                return FacebookIcon;
            case 'twitter':
                return TwitterIcon;
            case 'twitch':
                return TwitchIcon;
            case 'codepen':
                return CodepenIcon;
            case 'figma':
                return FigmaIcon;
            case 'gitlab':
                return GitlabIcon;
            case 'linkedin':
                return LinkedinIcon;
            case 'trello':
                return TrelloIcon;
            case 'youtube':
                return YoutubeIcon;
            case 'medium':
                return MediumIcon;
            case 'spotify':
                return SpotifyIcon;
            case 'vsco':
                return VscoIcon;
            case 'snapchat':
                return SnapchatIcon;
            default:
                break;
        }
    }

    return !(returnSocialType(props.url) === "default") && (
        <a 
        target="_blank" 
        rel="noreferrer" 
        href={`${props.url}`} 
        className={`icon ${returnSocialType(props.url)}`}
        style={{
            boxShadow: props.shadow ? '0 0 10px rgba(0,0,0,0.05)' : 'none',
            border: props.border ? `1px solid ${props.border}` : 'none'
        }} >
            <img src={returnSocialIcon(returnSocialType(props.url))} alt={returnSocialType(props.url)} />
        </a>
    );
}

export default SocialLink;