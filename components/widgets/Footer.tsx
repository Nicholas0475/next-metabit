"use client";

import Link from 'next/link';
import { useLanguage } from '../atoms/LanguageContext';


const Footer = () => {
    const nowyear = new Date().getFullYear();

    const { selectedLanguage, switchLanguage } = useLanguage();

    const translatedLinks = {
        en: {
            home: 'Home',
            about: 'About Us',
            services: 'Services',
            solutions: 'Solutions',
            project: 'Project',
            contact: 'Contact',
            blog: 'Blog',
            copyRight: 'ver3.0.230404 Copyright © 2020 -',
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
            copyRight: 'ver3.0.230404 著作権 © 2020 -',
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
            copyRight: 'ver3.0.230404 版权所有 © 2020 -',
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
            copyRight: 'ver3.0.230404 저작권 © 2020 -',
            // Add other Korea links
        },
    };

    return (
        <section className="relative">
            <footer className="bg-transparent min-w-screen overflow-x-hidden text-black" aria-labelledby="footer-heading">

                <div className="px-7 pb-8 pt-2 mx-auto sm:px-6 md:flex md:items-center md:justify-between lg:px-21 max-w-9xl">
                    <div className="flex justify-center items-center mb-4 space-x-1 md:order-last md:mb-0">
                        {/* <span className="max-w-5xl text-xl font-bold leading-none tracking-tighter text-black sm:text-xl md:text-2xl lg:text-xl lg:max-w-7xl">
                            Metabit
                        </span> */}
                        <img
                            className="h-12"
                            src="/logo2.png"
                            alt="Logo"
                        />
                    </div>


                    <div className="text-center lg:mt-3 md:mt-0 md:order-1">
                        <span className="mt-2 text-sm text-black">
                            {translatedLinks[selectedLanguage].copyRight} {nowyear} &nbsp;
                            <Link href="/home">
                                Metabit
                            </Link>
                        </span>
                    </div>
                </div>
            </footer>
        </section>

    );
};

export default Footer;
