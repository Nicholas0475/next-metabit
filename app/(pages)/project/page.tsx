"use client"


import {getMajorAchievementData, getProjectsData } from '@/sanity/sanity-utils';
import { MajorAchievement } from '@/types/Major-Achievement';
import { Projects } from '@/types/Project';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/atoms/LanguageContext';


export function Projects() {

    const [projects, setProjects] = useState<Projects[]>([]);

    const [majorAchieve, setMajorAchieve] = useState<MajorAchievement[]>([]);

    const { selectedLanguage } = useLanguage();

    const translatedTexts = {
        en: {
            seeMore: 'See More',
            // Add other English 
        },
        jp: {
            seeMore: '続きを見る',
            // Add other Japanese 
        },
        zh: {
            seeMore: '查看更多',
            // Add other Chinese 
        },
        ko: {
            seeMore: '더보기',
            // Add other KOrean 
        },
    };

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
                const projectsData = await getProjectsData();
                const majorAchievementData = await getMajorAchievementData();

                setProjects(projectsData);
                setMajorAchieve(majorAchievementData);
            } catch (error) {
                // Handle errors here
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className='relative'>
            {projects.map((proj) => (
                <section key={proj._id}>
                    <div data-aos="fade-down" className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                        <div className="flex flex-col w-full mb-12 text-center">
                            <h1 className="max-w-5xl text-5xl font-bold leading-none tracking-tighter text-black md:text-5xl lg:text-8xl lg:max-w-7xl">
                                {proj.title[selectedLanguage]}
                            </h1>
                        </div>
                    </div>
                </section>
            ))}

            {projects.map((proj) => (
                <section className="bg-transparent w-full overflow-x-hidden">
                    <div className="space-y-10 px-10 pt-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                        {proj.projects.map((project, index) => (
                            <div key={proj._id} className="flex flex-wrap items-center mx-auto max-w-7xl">
                                <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                                    <div>
                                        <div className="relative w-full mx-auto max-w-7lg">
                                            <div className="relative">
                                                <img
                                                    key={index}
                                                    data-aos="fade-right"
                                                    data-aos-delay="500"
                                                    className="object-cover object-center mx-auto rounded-lg shadow-2xl"
                                                    alt={`Project Image ${index}`}
                                                    src={transformSanityImage(project.projectImg.asset._ref)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col mx-auto items-start mt-12 mb-10 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                                    <div key={index}>
                                        <h1
                                            data-aos="fade-left"
                                            data-aos-delay="550"
                                            className="mb-8 text-4xl font-bold leading-none tracking-tighter text-black md:text-7xl lg:text-5xl"
                                        >
                                            {project.projectName}
                                        </h1>
                                        <p
                                            data-aos="fade-left"
                                            data-aos-delay="600"
                                            className="mb-4 text-base leading-relaxed text-left text-black"
                                        >
                                            {project.projectDescription[selectedLanguage]}
                                        </p>
                                        <a
                                            data-aos="fade-left"
                                            data-aos-delay="600"
                                            type="button"
                                            className="text-black underline"
                                            style={{ fontSize: '18px' }}
                                            href={project.projectUrl}
                                            target="_blank"
                                        >
                                            {translatedTexts[selectedLanguage].seeMore}
                                        </a>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {majorAchieve.map((major) => (
                <div key={major._id} className="pt-16 bg-transparent pb-32">
                    <div className="container m-auto px-6 space-y-8 md:px-12 lg:px-56">
                        <div className="m-auto text-center lg:w-12/12">
                            <h2 className="text-2xl font-bold md:text-4xl">{major.majorAchievementTitle[selectedLanguage]}</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                            {major.majorAchievementImages.map((Image, index) => (
                                <div key={index} className="p-4">
                                    <img src={transformSanityImage(Image.asset._ref)} alt="Image Alt Text" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}


        </section>
    );
};

export default Projects;