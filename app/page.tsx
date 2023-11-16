"use client"

import { getContactPageData, getEmployeeData, getHomeData, getMajorAchievementData, getPhasesData } from '@/sanity/sanity-utils';
import './globals.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faGlobe as faSolidGlobe } from "@fortawesome/free-solid-svg-icons";;
import { Home } from '@/types/Home';
import Employee from '@/types/Employee';
import { Phases } from '@/types/Phases';
import { MajorAchievement } from '@/types/Major-Achievement';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/atoms/LanguageContext';
import QRCode from 'qrcode.react';
import { VCardFormatter, VCard } from "@/types/vCardFomatter";
import Link from 'next/link';
import styles from '../app/page.module.css'
import { Contact } from '@/types/Contact';

export default function Home() {

  const [homes, setHomes] = useState<Home[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [contacts, setContact] = useState<Contact[]>([]);
  const [phases, setPhases] = useState<Phases[]>([]);
  const [majorAchieve, setMajorAchieve] = useState<MajorAchievement[]>([]);
  const { selectedLanguage } = useLanguage();

  const translatedTexts = {
    en: {
      viewProfile: 'View Profile',
      // Add other English 
    },
    jp: {
      viewProfile: 'プロフィールを見る',
      // Add other Japanese 
    },
    zh: {
      viewProfile: '查看资料',
      // Add other Chinese 
    },
    ko: {
      viewProfile: '프로필보기',
      // Add other Korean 
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

        setHomes(homeData);
        setContact(contactData);
        setEmployees(employeeData);
        setPhases(phasesData);
        setMajorAchieve(majorAchievementData);

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

  return (
    <section className="relative">
      {employees.length > 0 && (
        <div className="bg-transparent flex flex-wrap items-center justify-center" style={{ padding: "100px 10px 100px 10px" }}>
          <div className="container lg:w-5/6 h-4/5 xl:w-5/6 sm:w-full md:w-2/3 border-black border-4 bg-transparent transform duration-200 easy-in-out">
            <div className="h-32 overflow-hidden">
              <img className="w-full" src={transformSanityImage(employees[0].employeeBgImage.asset._ref)} alt="" />
            </div>
            <div className="flex justify-center px-5 -mt-12">
              <img className="h-32 w-32 bg-transparent p-2 rounded-full" src={transformSanityImage(employees[0].employeeImage.asset._ref)} alt="" />
            </div>
            <div>
              <div className="text-center px-14">
                <h2 className="text-gray-800 text-3xl font-bold">
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
                <div className="lg:px-52 text-gray-500">
                  {/* Placeholder content or additional details */}
                </div>
                <div className="flex justify-center pt-5 space-x-4 align-center">
                  {employees[0].socialMediaLinks && employees[0].socialMediaLinks.facebook && (
                    <a
                      rel="noopener noreferrer"
                      href={employees[0].socialMediaLinks.facebook}
                      aria-label="Facebook"
                      className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                  )}
                  {employees[0].socialMediaLinks && employees[0].socialMediaLinks.twitter && (
                    <a
                      rel="noopener noreferrer"
                      href={employees[0].socialMediaLinks.twitter}
                      aria-label="Twitter"
                      className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                  )}
                  {employees[0].socialMediaLinks && employees[0].socialMediaLinks.instagram && (
                    <a
                      rel="noopener noreferrer"
                      href={employees[0].socialMediaLinks.instagram}
                      aria-label="Instagram"
                      className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                  )}
                  {employees[0].socialMediaLinks && employees[0].socialMediaLinks.website && (
                    <a
                      rel="noopener noreferrer"
                      href={employees[0].socialMediaLinks.website}
                      aria-label="Website"
                      className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faGlobe} size="2x" />
                    </a>
                  )}
                  {employees[0].socialMediaLinks && employees[0].socialMediaLinks.tiktok && (
                    <a
                      rel="noopener noreferrer"
                      href={employees[0].socialMediaLinks.tiktok}
                      aria-label="Tiktok"
                      className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faTiktok} size="2x" />
                    </a>
                  )}
                </div>
                <div className="py-4 grid justify-items-center">
                  <QRCode value={combinedData} /> {/* Replace with the actual combined data for the first employee */}
                </div>
              </div>
              {/* <section className="text-gray-600 body-font">
                {contacts.map((contact) => (
                  <div key={contact._id} className='flex items-center justify-center min-h-screen min-w-full pb-12 bg-transparent px-12 xl:px-0'>
                    <div className='flex flex-col ' style={{ width: "1150px" }}>
                      <a href={contact.connectSection.socialMediaLinks.facebook} target="_blank">
                        <button type='button'
                          className='flex break-inside text-white border-2 border-transparent rounded-3xl px-6 py-3 mb-4 w-full bg-black hover:shadow-[inset_75rem_0_0_0] hover:text-black hover:shadow-white duration-700 transition-[color,box-shadow] '>
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
                          className='flex break-inside text-white border-2 border-transparent rounded-3xl px-6 py-3 mb-4 w-full bg-black hover:shadow-[inset_75rem_0_0_0] hover:text-black hover:shadow-white duration-700 transition-[color,box-shadow] '>
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
                          className='flex break-inside text-white border-2 border-transparent rounded-3xl px-6 py-3 mb-4 w-full bg-black hover:shadow-[inset_75rem_0_0_0] hover:text-black hover:shadow-white duration-700 transition-[color,box-shadow] '>
                          <div className='m-auto'>
                            <div className='flex items-center justify-start flex-1 space-x-4'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                              <span className='font-medium mb-[-2px]'>{contact.connectSection.buttonText[selectedLanguage]} X Twitter</span>
                            </div>
                          </div>
                        </button>
                      </a>


                      <a href={contact.connectSection.socialMediaLinks.linkedin} target="_blank">
                        <button type='button'
                          className='flex break-inside text-white border-2 border-transparent rounded-3xl px-6 py-3 mb-4 w-full bg-black hover:shadow-[inset_75rem_0_0_0] hover:text-black hover:shadow-white duration-700 transition-[color,box-shadow] '>
                          <div className='m-auto'>
                            <div className='flex items-center justify-start flex-1 space-x-4'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" /></svg>
                              <span className='font-medium'>{contact.connectSection.buttonText[selectedLanguage]} Linkedin</span>
                            </div>
                          </div>
                        </button>
                      </a>


                      <a href={contact.connectSection.socialMediaLinks.tiktok} target="_blank">
                        <button type='button'
                          className='flex break-inside text-white border-2 border-transparent rounded-3xl px-6 py-3 mb-4 w-full bg-black hover:shadow-[inset_75rem_0_0_0] hover:text-black hover:shadow-white duration-700 transition-[color,box-shadow]  '>
                          <div className='m-auto'>
                            <div className='flex items-center justify-start flex-1 space-x-4'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 9.84202C20.4357 9.84696 18.4221 9.20321 16.7435 8.00171V16.3813C16.7429 17.9333 16.2685 19.4482 15.3838 20.7233C14.499 21.9984 13.246 22.973 11.7923 23.5168C10.3387 24.0606 8.75362 24.1477 7.24914 23.7664C5.74466 23.3851 4.39245 22.5536 3.37333 21.383C2.3542 20.2125 1.71674 18.7587 1.54617 17.2161C1.3756 15.6735 1.68007 14.1156 2.41884 12.7507C3.15762 11.3858 4.2955 10.279 5.68034 9.57823C7.06517 8.87746 8.63095 8.61616 10.1683 8.82927V13.0439C9.4648 12.8227 8.70938 12.8293 8.0099 13.063C7.31041 13.2966 6.70265 13.7453 6.2734 14.345C5.84415 14.9446 5.61536 15.6646 5.6197 16.402C5.62404 17.1395 5.8613 17.8567 6.29759 18.4512C6.73387 19.0458 7.34688 19.4873 8.04906 19.7127C8.75125 19.9381 9.5067 19.9359 10.2075 19.7063C10.9084 19.4768 11.5188 19.0316 11.9515 18.4345C12.3843 17.8374 12.6173 17.1188 12.6173 16.3813V0H16.7435C16.7406 0.348435 16.7698 0.696395 16.8307 1.03948V1.03948C16.9741 1.80537 17.2722 2.53396 17.7068 3.18068C18.1415 3.8274 18.7035 4.37867 19.3585 4.80075C20.2903 5.41688 21.3829 5.74528 22.5 5.74505V9.84202Z" /></svg>
                              <span className='font-medium'>{contact.connectSection.buttonText[selectedLanguage]} Tiktok</span>
                            </div>
                          </div>
                        </button>
                      </a>


                      <a href={contact.connectSection.socialMediaLinks.github} target="_blank">
                        <button type='button'
                          className='flex break-inside text-white border-2 border-transparent rounded-3xl px-6 py-3 mb-4 w-full bg-black hover:shadow-[inset_75rem_0_0_0] hover:text-black hover:shadow-white duration-700 transition-[color,box-shadow] '>
                          <div className='m-auto'>
                            <div className='flex items-center justify-start flex-1 space-x-4'>
                              <svg width='25' height='25' viewBox='0 0 24 24'>
                                <path fill='currentColor'
                                  d='M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z' />
                              </svg>
                              <span className='font-medium'>{contact.connectSection.buttonText[selectedLanguage]} Github</span>
                            </div>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                ))}
              </section> */}
              <hr className="mt-6" />
            </div>
          </div>
        </div>
      )}
    </section>
  );


}
