import React from 'react';
import {FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaPhoneAlt} from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import './Components.css'

const Footer = ()=>{
    return (
        <div className='footer'>
            <div className='footer-div'>
                <h1 className='site-heading'>COLLEGE FORUM.</h1>
                <p className='footer-desc'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, 
                    or randomised words which don’t look even slightly believable.</p>
                <ul>
                    <p><FaFacebook className='footer-social-icons facebook-background'/></p>
                    <p><FaInstagram className='footer-social-icons instagram-background'/></p>
                    <p><FaTwitter className='footer-social-icons twitter-background'/></p>
                    <p><FaPinterest className='footer-social-icons pinterest-background'/></p>
                </ul>
            </div>
            <div className='footer-div'></div>
            <div className='footer-div'>
                <h1 className='footer-heading'>Contact</h1>
                <ul>
                    <li><ImLocation className='footer-contact-icons'/> 622 Dixie Path, South Tobinchester 98336</li>
                    <li><FaPhoneAlt className='footer-contact-icons'/> +1 234 56 78</li>
                    <li><MdEmail className='footer-contact-icons'/> collegeforum@gmail.com</li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;