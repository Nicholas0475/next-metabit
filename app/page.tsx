"use client"

import { getContactPageData, getEmployeeData, getHomeData, getMajorAchievementData, getPhasesData } from '@/sanity/sanity-utils';
import './globals.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faGlobe as faSolidGlobe } from "@fortawesome/free-solid-svg-icons";;
import { Home } from '@/types/Home';
import Employee from '@/types/Employee';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/atoms/LanguageContext';
import QRCode from 'qrcode.react';
import { Contact } from '@/types/Contact';
import { motion, useAnimation } from 'framer-motion';
import { Language } from '@/components/atoms/LanguageContext';

export default function Home() {


  const [employees, setEmployees] = useState<Employee[]>([]);
  const [contacts, setContact] = useState<Contact[]>([]);

  // const { selectedLanguage } = useLanguage();

  const { selectedLanguage, switchLanguage } = useLanguage();

  // Initialize the dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const languageOptions = {
    en: 'English',
    jp: 'Japanese',
    zh: 'Chinese',
    ko: 'Korean',
    // Add other language options as needed
  } as { [key: string]: string };

  const controls = useAnimation();

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
      <nav className="z-50">
        <div className="relative bg-transparent">
          <div className="mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-gray-100 py-6 md:space-x-10">
              <div className="flex justify-start xl:w-0 xl:flex-1">
                <div className="relative mt-1">
                  <div className="h-26 bg-transparent lg:hidden">
                    <button
                      className={`relative text-center h-10 w-16 transition-all duration-500
                      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-white before:transition-all
                      before:duration-300 before:opacity-10 before:hover:opacity-0 before:hover:scale-50
                      after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 after:transition-all after:duration-300
                      after:border after:border-white/50 after:scale-125 after:hover:opacity-100 after:hover:scale-100 after:hover:border-black after:hover:border-2`}
                      onClick={toggleDropdown}
                    >
                      <span className="relative text-black uppercase font-thin">
                        {selectedLanguage.toUpperCase()}
                      </span>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-2 transform -translate-x-1/2 left-1/2 bg-white shadow-lg rounded-md overflow-hidden">
                        {Object.keys(languageOptions).map((langCode) => (
                          <button
                            key={langCode}
                            className={`block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 ${selectedLanguage === langCode ? 'bg-gray-200' : ''}`}
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
              <div className="hidden lg:flex items-center justify-end md:flex-1 lg:w-0">
              </div>

              <div className="mb-responsive hidden lg:flex" id="a">
                <div className="relative">
                  <div className="place-content-end h-26 bg-transparent">
                    <button
                      className={`relative text-center h-10 w-20 transition-all duration-500
                            before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-white before:transition-all
                            before:duration-300 before:opacity-10 before:hover:opacity-0 before:hover:scale-50
                            after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 after:transition-all after:duration-300
                            after:border after:border-white/50 after:scale-125 after:hover:opacity-100 after:hover:scale-100 after:hover:border-black after:hover:border-2`}
                      onClick={toggleDropdown}
                    >
                      <span className="relative text-black font-thin">
                        {languageOptions[selectedLanguage]}
                      </span>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-2 transform -translate-x-1/2 left-1/2 bg-white shadow-lg rounded-md overflow-hidden">
                        {Object.keys(languageOptions).map((langCode) => (
                          <button
                            key={langCode}
                            className={`block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 ${selectedLanguage === langCode ? 'bg-gray-200' : ''}`}
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

            </div>
          </div>
        </div>
      </nav>
      {employees.length > 0 && (
        <motion.div
          initial={{ opacity: 0, rotateY: -180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -180 }}
          transition={{ duration: 1 }}
          className="bg-transparent flex flex-wrap items-center justify-center"
          style={{ padding: '100px 10px 100px 10px' }}>
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
                    </div>
                  </div>
                ))}
              </section>
              <hr className="mt-6" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section >
  );


}
