"use client";


import Link from 'next/link';
import { useLanguage } from '../atoms/LanguageContext';
import React, { useState } from 'react';
import { Language } from '../atoms/LanguageContext';
import { AOSInit } from '@/components/widgets/Aos';
import styles from '../widgets/header.module.css'

const Header = () => {

  const { selectedLanguage, switchLanguage } = useLanguage(); // Access selectedLanguage and switchLanguage

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Initialize the menu state

  // Initialize the dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

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

  const translatedLinks = {
    en: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      solutions: 'Solutions',
      project: 'Project',
      contact: 'Contact',
      blog: 'Blog',
      // Add other English links
    },
    jp: {
      home: 'メインページ',
      about: 'およそ',
      services: 'サービス',
      solutions: 'ソリューション',
      project: '事業',
      contact: 'コンタクト',
      blog: 'ブログ',
      // Add other Japanese links
    },
    zh: {
      home: '主页',
      about: '关于我们',
      services: '服务',
      solutions: '解决方案',
      project: '项目',
      contact: '联系方式',
      blog: '博客',
      // Add other Chinese links
    },
    ko: {
      home: '홈페이지',
      about: '회사 소개',
      services: '서비스',
      solutions: '솔루션',
      project: '프로젝트',
      contact: '연락하다',
      blog: '블로그',
      // Add other Korean links
    },
  };

  return (
    <><AOSInit /><nav className="z-50">
      <div className="relative bg-transparent">
        <div className="mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-gray-100 py-6 md:space-x-10">
            <div className="flex justify-start xl:w-0 xl:flex-1">
              <Link href="/">
                <img data-aos="fade-down" className="h-12 w-auto pl-6" src="/logo2.png" alt="Logo" />
              </Link>

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
                          } }
                        >
                          {languageOptions[langCode]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className=" -my-2 lg:hidden">
              <button data-bs-toggle="collapse" type="button" className="bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded={isMenuOpen ? 'true' : 'false'} onClick={toggleMenu}>
                <span className="sr-only">Open menu</span>
                <svg className="h-6 w-6" xmlns="assets/img/metabit-logo.png" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {isMenuOpen && (
                <div data-backdrop="static" id="Menus">
                  <div className="h-full w-full">
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                      <div className="mt-20 fixed inset-0 bg-transparent bg-opacity-100 transition-opacity"></div>
                      <div className="mt-20 fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex h-1/2 items-end justify-center p-4 text-center sm:p-0">
                          <div className="relative transform self-start overflow-hidden rounded-lg bg-white text-left transition-all w-full max-w-lg">
                            <div className="w-full bg-gray-50 gap-2 px-6 py-6 sm:px-6">
                              {/* <Link href="/" type="button"  onClick={() => { toggleMenu(); }} className="min-w-full min-h-full inline-flex w-full ml-0 justify-center rounded-md bg-gray-50 pr-6 py-2 text-base text-gray-700 hover:bg-black hover:text-white sm:mt-0 sm:w-auto sm:text-sm md:mx-2 md:w-auto md:text-sm">{translatedLinks[selectedLanguage].home}</Link>
                              <Link href="/about" type="button"  onClick={() => { toggleMenu(); }} className="min-w-full min-h-full inline-flex w-full ml-0 justify-center rounded-md bg-gray-50 pr-6 py-2 text-base text-gray-700 hover:bg-black hover:text-white sm:mt-0 sm:w-auto sm:text-sm md:mx-2 md:w-auto md:text-sm">{translatedLinks[selectedLanguage].about}</Link>
                              <Link href="/services" type="button"  onClick={() => { toggleMenu(); }} className="min-w-full min-h-full inline-flex w-full ml-0 justify-center rounded-md bg-gray-50 pr-6 py-2 text-base text-gray-700 hover:bg-black hover:text-white sm:mt-0 sm:w-auto sm:text-sm md:mx-2 md:w-auto md:text-sm">{translatedLinks[selectedLanguage].services}</Link>
                              <Link href="/solutions" type="button"  onClick={() => { toggleMenu(); }} className="min-w-full min-h-full inline-flex w-full ml-0 justify-center rounded-md bg-gray-50 pr-6 py-2 text-base text-gray-700 hover:bg-black hover:text-white sm:mt-0 sm:w-auto sm:text-sm md:mx-2 md:w-auto md:text-sm">{translatedLinks[selectedLanguage].solutions}</Link>
                              <Link href="/project" type="button"  onClick={() => { toggleMenu(); }} className="min-w-full min-h-full inline-flex w-full ml-0 justify-center rounded-md bg-gray-50 pr-5 py-2 text-base text-gray-700 hover:bg-black hover:text-white sm:mt-0 sm:w-auto sm:text-sm md:mx-2 md:w-auto md:text-sm">{translatedLinks[selectedLanguage].project}</Link>
                              <Link href="/contact" type="button"  onClick={() => { toggleMenu(); }} className="min-w-full min-h-full inline-flex w-full ml-0 justify-center rounded-md bg-gray-50 pr-5 py-2 text-base text-gray-700 hover:bg-black hover:text-white sm:mt-0 sm:w-auto sm:text-sm md:mx-2 md:w-auto md:text-sm">{translatedLinks[selectedLanguage].contact}</Link>
                              <Link href="/blog" type="button"  onClick={() => { toggleMenu(); }} className="min-w-full min-h-full inline-flex w-full ml-0 justify-center rounded-md bg-gray-50 pr-5 py-2 text-base text-gray-700 hover:bg-black hover:text-white sm:mt-0 sm:w-auto sm:text-sm md:mx-2 md:w-auto md:text-sm">{translatedLinks[selectedLanguage].blog}</Link> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <nav className="hidden lg:flex space-x-10 " style={{ margin: "0px 40px 0px 200px" }}>
              {/* <Link href="/" data-aos="fade-right" data-aos-delay="600" className="router-wrapper link linkUnderline linkUnderlineBlack text-base font-thin text-black ">{translatedLinks[selectedLanguage].home}</Link>
              <Link href="/about" data-aos="fade-right" data-aos-delay="500" className="link linkUnderline linkUnderlineBlack text-base font-thin text-black ">{translatedLinks[selectedLanguage].about}</Link>
              <Link href="/services" data-aos="fade-right" data-aos-delay="400" className="link linkUnderline linkUnderlineBlack text-base font-thin text-black ">{translatedLinks[selectedLanguage].services}</Link>
              <Link href="/solutions" data-aos="fade-right" data-aos-delay="400" className="link linkUnderline linkUnderlineBlack text-base font-thin text-black ">{translatedLinks[selectedLanguage].solutions}</Link>
              <Link href="/project" data-aos="fade-right" data-aos-delay="400" className="link linkUnderline linkUnderlineBlack text-base font-thin text-black ">{translatedLinks[selectedLanguage].project}</Link>
              <Link href="/contact" data-aos="fade-right" data-aos-delay="200" className="link linkUnderline linkUnderlineBlack text-base font-thin text-black ">{translatedLinks[selectedLanguage].contact}</Link>
              <Link href="/blog" data-aos="fade-right" data-aos-delay="200" className="link linkUnderline linkUnderlineBlack text-base font-thin text-black ">{translatedLinks[selectedLanguage].blog}</Link> */}
            </nav>

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
                          } }
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
    </nav></>




  );
};

export default Header;
