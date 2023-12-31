"use client"

import { getContactPageData, getEmployeeData, getHomeData, getMajorAchievementData, getPhasesData } from '@/sanity/sanity-utils';
import './globals.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faInstagram, faTiktok, faSnapchat, faLinkedin, faWhatsapp, faFacebookMessenger, faSquareSnapchat } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faChevronRight, faCopy, faEllipsisH, faEllipsisV, faEnvelope, faGlobe, faGlobe as faSolidGlobe, faTimes } from "@fortawesome/free-solid-svg-icons";;
import { Home } from '@/types/Home';
import Employee from '@/types/Employee';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/atoms/LanguageContext';
import QRCode from 'qrcode.react';
import { Contact } from '@/types/Contact';
import { motion, useAnimation } from 'framer-motion';
import { Language } from '@/components/atoms/LanguageContext';
import Link from 'next/link';
import copy from 'clipboard-copy';

export default function Home() {


  const [employees, setEmployees] = useState<Employee[]>([]);
  const [contacts, setContact] = useState<Contact[]>([]);

  // const { selectedLanguage } = useLanguage();

  const { selectedLanguage, switchLanguage } = useLanguage();

  // Initialize the dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isCopied, setIsCopied] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCopyClick = async () => {
    try {
      await copy('https://youtu.be/shZyg5VFI1Y?si=-wonQDEQ2dR8eGjU'); // Replace with your actual link
      setIsCopied(true);

      // Reset isCopied after a short delay (e.g., 3 seconds)
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);

    } catch (error) {
      console.error('Error copying to clipboard', error);
    }
  };

  const languageOptions = {
    en: 'English',
    jp: '日本語',
    zh: '中文',
    ko: '한국인',
    // Add other language options as needed
  } as { [key: string]: string };

  const controls = useAnimation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const translatedTexts = {
    en: {
      shareLink: 'Share this Link',
      shareSnapChat: 'Share on Snapchat',
      shareFacebook: 'Share on Facebook',
      shareLinkedIn: 'Share on LinkedIn',
      shareXTwitter: 'Share on X',
      shareWhatsApp: 'Share via WhatsApp',
      shareMessenger: 'Share via Messenger',
      shareEmail: 'Share via Email',
      copy: 'Copy',
      copied: 'Copied!',
      // Add other English 
    },
    jp: {
      shareLink: 'このリンクを共有',
      shareSnapChat: 'Snapchatで共有',
      shareFacebook: 'Facebook で共有',
      shareLinkedIn: 'LinkedIn で共有',
      shareXTwitter: 'Xで共有',
      shareWhatsApp: 'WhatsApp経由で共有',
      shareMessenger: 'Messenger経由で共有',
      shareEmail: '電子メールで共有',
      copy: 'コピー',
      copied: 'コピーされました!',
      // Add other Japanese 
    },
    zh: {
      shareLink: '分享此链接',
      shareSnapChat: '在 Snapchat 上分享',
      shareFacebook: '在 Facebook 上分享',
      shareLinkedIn: '在 LinkedIn 上分享',
      shareXTwitter: '在 X 上分享',
      shareWhatsApp: '通过 WhatsApp 分享',
      shareMessenger: '通过 Messenger 分享',
      shareEmail: '通过电子邮件分享',
      copy: '复制',
      copied: '已复制！',
      // Add other Chinese 
    },
    ko: {
      shareLink: '이 링크를 공유하세요',
      shareSnapChat: 'Snapchat에서 공유',
      shareFacebook: '페이스북에 공유',
      shareLinkedIn: 'LinkedIn에서 공유',
      shareXTwitter: 'X에서 공유',
      shareWhatsApp: 'WhatsApp을 통해 공유',
      shareMessenger: '메신저를 통해 공유',
      shareEmail: '이메일을 통해 공유',
      copy: '복사',
      copied: '복사됨!',
      // Add other Korea 
    },
  };

  // URL to link to
  const targetUrl = 'http://192.168.0.10:3000/';

  // Combine the URL and VCard data (assuming you have vCardString defined)
  const combinedData = `${targetUrl}`;

  function transformSanityImage(imageRef: string): string {
    if (imageRef !== undefined) {
      const refArray = imageRef.split('-');
      return `https://cdn.sanity.io/images/eitw7pjp/production/${refArray[1]}-${refArray[2]}.${refArray[3]}?auto=format`;
    }
    return '';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeData = await getHomeData();
        const contactData = await getContactPageData();
        const employeeData = await getEmployeeData();
        const phasesData = await getPhasesData();
        const majorAchievementData = await getMajorAchievementData();
        setContact(contactData);
        setEmployees(employeeData);

        // Check if we are in a browser environment (client side)
        if (typeof window !== 'undefined') {
          // Refresh AOS animations after data is fetched
          // AOS.refresh();
        }
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      rotateY: 0,
      transition: { duration: 1 },
    });
  }, [controls]);

  return (

    <motion.section
      initial={{ opacity: 0, rotateY: -180 }}
      animate={controls}
      exit={{ opacity: 0, rotateY: -180 }}
      className="relative"
      transition={{ duration: 1 }}
    >
      {employees.length > 0 && (
        <motion.div
          initial={{ opacity: 0, rotateY: -180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -180 }}
          transition={{ duration: 1 }}
          className="bg-transparent flex flex-wrap items-center justify-center"
          style={{ padding: '100px 10px 100px 10px' }}
        >
          <motion.div
            className="container lg:w-5/6 h-4/5 xl:w-5/6 sm:w-full md:w-2/3 border-black border-4 bg-transparent transform duration-200 easy-in-out"
            style={{
              backgroundImage: `url(${transformSanityImage(employees[0].employeeBgImage.asset._ref)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 1 }}


          >
            <div className="mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center border-white py-6 md:space-x-10">
                <div className="flex justify-start xl:w-0 xl:flex-1">
                  <div className="relative mt-1">
                    <div className="h-26 bg-transparent">
                      <button
                        className={`relative text-center h-10 w-20 transition-all duration-500
                      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-transparent before:transition-all
                      before:duration-300 before:opacity-10 before:hover:opacity-0 before:hover:scale-50
                      after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 after:transition-all after:duration-300
                      after:border after:border-white/50 after:scale-125 after:hover:opacity-100 after:hover:scale-100 after:hover:bg-transparent after:hover:border-2`}
                        onClick={toggleDropdown}
                      >
                        <span className="relative text-white font-thin">
                          {languageOptions[selectedLanguage]}
                        </span>
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-2 transform -translate-x-1/2 left-1/2 bg-transparent shadow-lg rounded-md overflow-hidden">
                          {Object.keys(languageOptions).map((langCode) => (
                            <button
                              key={langCode}
                              className={`block w-full text-left px-4 py-2 text-white hover:bg-gray-800 ${selectedLanguage === langCode ? 'bg-gray-800' : ''}`}
                              onClick={() => {
                                switchLanguage(langCode as Language);
                                toggleDropdown();
                              }}
                            >
                              {languageOptions[langCode]}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end xl:w-0 xl:flex-1">
                  <div className="relative mt-1">
                    <div className="h-26 bg-transparent">
                      <button
                        className={`relative text-center h-10 w-8 transition-all duration-500 text-white`}
                        aria-expanded={isMenuOpen ? 'true' : 'false'}
                        onClick={toggleMenu}
                      >
                        <FontAwesomeIcon icon={faEllipsisH} size="lg" />
                      </button>

                      {isMenuOpen && (
                        <div data-backdrop="static" id="Menus" className="fixed top-0 left-0 w-full h-full z-50 overflow-y-auto" onClick={closeMenu}>
                          <div className="h-full w-full" style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            transition: 'opacity 0.3s',
                          }}>
                          </div>
                          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div className="mt-20 fixed inset-0 z-10">
                              <div className="flex items-end justify-center p-4 text-center sm:p-0">
                                <div className="relative rounded-lg bg-transparent text-left transition-all max-h-[80vh] overflow-y-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
                                  <div className="w-full bg-gray-50 gap-2 px-6 py-6 sm:px-6">
                                    <div className="min-w-full min-h-full inline-flex w-full ml-0 justify-between rounded-md bg-gray-50 py-2 text-lg font-bold text-gray-700 sm:mt-0 sm:w-auto sm:text-lg md:mx-2 md:w-auto md:text-lg">
                                      <div
                                        className={`relative text-center w-8 transition-all duration-500 text-black`}
                                      >
                                      </div>
                                      <span>{translatedTexts[selectedLanguage].shareLink}</span>
                                      <button
                                        className={`relative text-center w-8 transition-all duration-500 text-black`}
                                        onClick={toggleMenu}
                                      >
                                        <FontAwesomeIcon icon={faTimes} size="lg" />
                                      </button>
                                    </div>

                                    <button
                                      type="button"
                                      className="min-w-full min-h-full inline-flex w-full ml-1 justify-between items-center rounded-md bg-gray-50 px-1 py-4 text-lg text-gray-700 hover:bg-gray-200 hover:text-black sm:mt-0 sm:w-auto sm:text-lg md:mx-2 md:w-auto md:text-lg"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faSquareSnapchat} className="mx-2 text-yellow-300" size="2x" />
                                        <span className="mx-1">{translatedTexts[selectedLanguage].shareSnapChat}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-gray-500" size="1x" />
                                      </div>
                                    </button>
                                    <button type="button" className="min-w-full min-h-full inline-flex w-full ml-1 justify-between items-center rounded-md bg-gray-50 px-1 py-4 text-lg text-gray-700 hover:bg-gray-200 hover:text-black sm:mt-0 sm:w-auto sm:text-lg md:mx-2 md:w-auto md:text-lg"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faFacebook} className="mx-2 text-blue-700" size="2x" />
                                        <span className="mx-1">{translatedTexts[selectedLanguage].shareFacebook}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-gray-500" size="1x" />
                                      </div>
                                    </button>
                                    <button type="button" className="min-w-full min-h-full inline-flex w-full ml-1 justify-between items-center rounded-md bg-gray-50 px-1 py-4 text-lg text-gray-700 hover:bg-gray-200 hover:text-black sm:mt-0 sm:w-auto sm:text-lg md:mx-2 md:w-auto md:text-lg"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faLinkedin} className="mx-2 text-blue-500" size="2x" />
                                        <span className="mx-1">{translatedTexts[selectedLanguage].shareLinkedIn}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-gray-500" size="1x" />
                                      </div>
                                    </button>
                                    <button type="button" className="min-w-full min-h-full inline-flex w-full ml-1 justify-between items-center rounded-md bg-gray-50 px-1 py-4 text-lg text-gray-700 hover:bg-gray-200 hover:text-black sm:mt-0 sm:w-auto sm:text-lg md:mx-2 md:w-auto md:text-lg"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faXTwitter} className="mx-2" size="2x" />
                                        <span className="mx-1">{translatedTexts[selectedLanguage].shareXTwitter}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-gray-500" size="1x" />
                                      </div>
                                    </button>
                                    <button type="button" className="min-w-full min-h-full inline-flex w-full ml-1 justify-between items-center rounded-md bg-gray-50 px-1 py-4 text-lg text-gray-700 hover:bg-gray-200 hover:text-black sm:mt-0 sm:w-auto sm:text-lg md:mx-2 md:w-auto md:text-lg"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faWhatsapp} className="mx-2 text-green-600" size="2x" />
                                        <span className="mx-1">{translatedTexts[selectedLanguage].shareWhatsApp}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-gray-500" size="1x" />
                                      </div>
                                    </button>
                                    <button type="button" className="min-w-full min-h-full inline-flex w-full ml-1 justify-between items-center rounded-md bg-gray-50 px-1 py-4 text-lg text-gray-700 hover:bg-gray-200 hover:text-black sm:mt-0 sm:w-auto sm:text-lg md:mx-2 md:w-auto md:text-lg"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faFacebookMessenger} className="mx-2" size="2x" style={{ color: '#0084FF' }} />
                                        <span className="mx-1">{translatedTexts[selectedLanguage].shareMessenger}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-gray-500" size="1x" />
                                      </div>
                                    </button>
                                    <button type="button" className="min-w-full min-h-full inline-flex w-full ml-1 justify-between items-center rounded-md bg-gray-50 px-1 py-4 text-lg text-gray-700 hover:bg-gray-200 hover:text-black sm:mt-0 sm:w-auto sm:text-lg md:mx-2 md:w-auto md:text-lg"
                                      onClick={(e) => {
                                        window.location.href = `mailto:${employees[0].email}`;
                                        e.stopPropagation();
                                      }}
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faEnvelope} className="mx-2 text-gray-700" size="2x" />
                                        <span className="mx-1">{translatedTexts[selectedLanguage].shareEmail}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-gray-500" size="1x" />
                                      </div>
                                    </button>
                                    <div className="flex justify-center">
                                      <button
                                        type="button"
                                        className={`min-h-full inline-flex justify-between items-center space-x-2 border-gray-300 border-2 rounded-xl bg-gray-50 py-4 text-xs text-gray-700 hover:bg-gray-200 hover:text-black sm:mt-0 sm:w-auto sm:text-xs md:mx-2 md:w-auto md:text-xs lg:w-auto ${isCopied ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        onClick={(e) => {
                                          handleCopyClick();
                                          e.stopPropagation();
                                        }}
                                        disabled={isCopied}
                                      >
                                        <p className="flex items-center">
                                          <FontAwesomeIcon icon={faCopy} className="mx-2 text-gray-600" size="xl" />
                                          <span className="mx-2">https://youtu.be/shZyg5VFI...</span>
                                        </p>
                                        <p className="flex items-center">
                                          <span className="text-gray-500 font-bold md:mx-12 lg:mx-12"></span>
                                        </p>
                                        <p className="flex items-center">
                                          <span className={`mx-2 text-gray-500 font-bold ${isCopied ? 'text-green-500' : ''}`}>{isCopied ? translatedTexts[selectedLanguage].copied : translatedTexts[selectedLanguage].copy}</span>
                                        </p>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-32 overflow-hidden">
            </div>
            <div className="flex justify-center px-5 py-2 -mt-12">
              <img className="object-cover h-32 w-32 bg-transparent rounded-full ring-4 ring-white" src={transformSanityImage(employees[0].employeeImage.asset._ref)} alt="" />
            </div>
            <div>
              <div className="text-center px-14">
                <h2 className="text-white text-3xl font-bold">
                  {employees[0].name.firstName} {employees[0].name.lastName}
                </h2>
                <h3 className="text-gray-600 font-bold">{employees[0].position2?.[selectedLanguage]}</h3>
                {employees[0].slug && (
                  <a
                    className="text-gray-400 mt-2 hover:text-blue-500"
                    href={`/employee/${employees[0].slug}`}
                    target="_blank"
                  >
                    {`@${employees[0].slug}`}
                  </a>
                )}
                <div className="flex justify-center pt-5 space-x-4 align-center">
                  {employees[0] && employees[0].socialMediaLinks && employees[0].socialMediaLinks.facebook && (
                    <a
                      rel="noopener noreferrer"
                      href={employees[0].socialMediaLinks.facebook}
                      aria-label="Facebook"
                      className="p-2 rounded-md text-white hover:dark:text-white-400 w-12"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                  )}
                  {employees[0] && employees[0].socialMediaLinks && employees[0].socialMediaLinks.twitter && (
                    <a
                      rel="noopener noreferrer"
                      href={employees[0].socialMediaLinks.twitter}
                      aria-label="Twitter"
                      className="p-2 rounded-md text-white w-12"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faXTwitter} size="2x" />
                    </a>
                  )}
                  {employees[0] && employees[0].socialMediaLinks && employees[0].socialMediaLinks.instagram && (
                    <a
                      rel="noopener noreferrer"
                      href={employees[0].socialMediaLinks.instagram}
                      aria-label="Instagram"
                      className="p-2 rounded-md text-white w-12"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                  )}
                  {employees[0] && employees[0].socialMediaLinks && employees[0].socialMediaLinks.website && (
                    <a
                      rel="noopener noreferrer"
                      href={employees[0].socialMediaLinks.website}
                      aria-label="Website"
                      className="p-2 rounded-md text-white w-12"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faGlobe} size="2x" />
                    </a>
                  )}
                  {employees[0] && employees[0].socialMediaLinks && employees[0].socialMediaLinks.tiktok && (
                    <a
                      rel="noopener noreferrer"
                      href={employees[0].socialMediaLinks.tiktok}
                      aria-label="Tiktok"
                      className="p-2 rounded-md text-white w-12"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faTiktok} size="2x" />
                    </a>
                  )}
                </div>
                <div className="py-4 grid justify-items-center">
                  <QRCode value={combinedData} />
                </div>
              </div>
              <section className="text-gray-600 body-font">
                {contacts.map((contact) => (
                  <div key={contact._id} className='py-4 flex justify-center min-w-full pb-12 bg-transparent px-12 xl:px-0'>
                    <div className='flex flex-col ' style={{ width: "1150px" }}>
                      <a href={contact.connectSection.socialMediaLinks.facebook} target="_blank">
                        <button type='button'
                          className='flex break-inside text-white border-2 border-white rounded-3xl px-6 py-3 mb-4 w-full bg-black hover:shadow-[inset_75rem_0_0_0] hover:text-black hover:shadow-white duration-700 transition-[color,box-shadow] '>
                          <div className='m-auto'>
                            <div className='flex items-center justify-start flex-1 space-x-4'>
                              <svg width='25' height='25' viewBox='0 0 24 24'>
                                <path fill='currentColor'
                                  d='M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z' />
                              </svg>
                              <span className='font-medium mb-[-2px]'>{contact.connectSection.buttonText[selectedLanguage]} Facebook</span>
                            </div>
                          </div>
                        </button>
                      </a>


                      <a href={contact.connectSection.socialMediaLinks.instagram} target="_blank">
                        <button type='button'
                          className='flex break-inside text-white border-2 border-white rounded-3xl px-6 py-3 mb-4 w-full bg-black hover:shadow-[inset_75rem_0_0_0] hover:text-black hover:shadow-white duration-700 transition-[color,box-shadow] '>
                          <div className='m-auto'>
                            <div className='flex items-center justify-start flex-1 space-x-4'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" /></svg>
                              <span className='font-medium mb-[-3px]'>{contact.connectSection.buttonText[selectedLanguage]} Instagram</span>
                            </div>
                          </div>
                        </button>
                      </a>


                      <a href={contact.connectSection.socialMediaLinks.twitter} target="_blank">
                        <button type='button'
                          className='flex break-inside text-white border-2 border-white rounded-3xl px-6 py-3 mb-4 w-full bg-black hover:shadow-[inset_75rem_0_0_0] hover:text-black hover:shadow-white duration-700 transition-[color,box-shadow] '>
                          <div className='m-auto'>
                            <div className='flex items-center justify-start flex-1 space-x-4'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                              <span className='font-medium mb-[-2px]'>{contact.connectSection.buttonText[selectedLanguage]} X Twitter</span>
                            </div>
                          </div>
                        </button>
                      </a>

                      <a href={contact.connectSection.socialMediaLinks.github} target="_blank">
                        <button type='button'
                          className='flex break-inside text-white border-2 border-white rounded-3xl px-6 py-3 mb-4 w-full bg-black hover:shadow-[inset_75rem_0_0_0] hover:text-black hover:shadow-white duration-700 transition-[color,box-shadow] '>
                          <div className='m-auto'>
                            <div className='flex items-center justify-start flex-1 space-x-4'>
                              <svg width='25' height='25' viewBox='0 0 24 24'>
                                <path fill='currentColor'
                                  d='M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z' />
                              </svg>
                              <span className='font-medium mb-[-2px]'>{contact.connectSection.buttonText[selectedLanguage]} Github</span>
                            </div>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                ))}
              </section>
              <hr className="mt-6" />
            </div>
          </motion.div>
        </motion.div>
      )
      }
    </motion.section >
  );


}
