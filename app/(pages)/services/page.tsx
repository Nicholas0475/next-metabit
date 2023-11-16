"use client"

import { getPhasesData, getServicesData } from "@/sanity/sanity-utils";
import { Phases } from "@/types/Phases";
import { Services } from "@/types/Service";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/atoms/LanguageContext';

export function Services() {

    const [services, setServices] = useState<Services[]>([]);

    const [phases, setPhases] = useState<Phases[]>([]);

    const { selectedLanguage } = useLanguage();

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
                const servicesData = await getServicesData();
                const phasesData = await getPhasesData();

                setServices(servicesData);
                setPhases(phasesData);
            } catch (error) {
                // Handle errors here
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="relative">
            {services.map((service) => (
                <section key={service._id}>
                    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                        <div className="flex flex-col w-full mb-12 text-center">
                            <h1 data-aos="fade-down" className="max-w-5xl text-5xl font-bold leading-none tracking-tighter text-black md:text-5xl lg:text-8xl lg:max-w-7xl">
                                {service.servicesHeader[selectedLanguage]}
                            </h1>
                        </div>
                    </div>
                </section>
            ))}

            {services.map((service) => (
                <section key={service._id}>
                    <div className="px-12 py-16 mx-auto xl:max-w-full xl:max-w-screen-xl xl:px-24 xl:px-8 xl:py-20">
                        <div className="mb-10 xl:mx-auto sm:text-center xl:max-w-2xl xl:mb-12">
                            <div>
                                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                                    {service.services.sectionName[selectedLanguage]}
                                </p>
                            </div>
                            <h2 className="max-w-6xl mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl xl:mx-auto">
                                <span className="relative inline-block w-full">
                                    <svg viewBox="0 0 52 24" fill="currentColor" className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 xl:w-32 xl:-ml-28 xl:-mt-10 sm:block">
                                        <defs>
                                            <pattern id="b902cd03-49cc-4166-a0ae-4ca1c31cedba" x="0" y="0" width=".135" height=".30">
                                                <circle cx="1" cy="1" r=".7"></circle>
                                            </pattern>
                                        </defs>
                                        <rect fill="url(#b902cd03-49cc-4166-a0ae-4ca1c31cedba)" width="52" height="24"></rect>
                                    </svg>
                                    <span className="relative">
                                        {service.services.sectionTitle[selectedLanguage]}
                                    </span>
                                </span>
                            </h2>
                        </div>

                        <div className="grid gap-10 lg:grid-cols-3 sm:grid-cols-2">
                            {phases.slice().map((phase) => (
                                <div key={phase._id}>
                                    <div className="flex items-center justify-between mb-6">
                                        <p className="text-2xl font-bold underline text-black">{phase.phaseHeader[selectedLanguage]}</p>
                                        <p className="py-px text-xs font-semibold tracking-wider uppercase text-black">
                                            {phase.phaseName[selectedLanguage]}
                                        </p>
                                        <svg
                                            className="w-6 text-gray-700 transform rotate-90 sm:rotate-0"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            viewBox="0 0 24 24"
                                        >
                                            <line fill="none" strokeMiterlimit="10" x1="2" y1="12" x2="22" y2="12"></line>
                                            <polyline fill="none" strokeMiterlimit="10" points="15,5 22,12 15,19"></polyline>
                                        </svg>
                                    </div>
                                    <div className="text-gray-600 text-lg">
                                        {phase.phaseTextArea[selectedLanguage].split('\n').map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="mt-4 text-center p-1 md:p-8">
                            <button className="bg-gray-600 rounded-xl px-12 py-4 text-base border-neutral-400 border-2 text-white hover:text-white hover:shadow-[inset_20rem_0_0_0] hover:shadow-black duration-[400ms,700ms] transition-[color,box-shadow]">
                                {service.services.exploreButtonText[selectedLanguage]}
                            </button>
                        </div>
                    </div>

                </section>
            ))}

            {services.map((service) => (
                <section key={service._id} className=" dark:text-gray-100 pb-32">
                    <div className="flex w-full mx-auto text-left">
                        <div className="relative inline-flex items-center mx-auto align-start max-w-6xl w-full">
                            <div className="text-left px-12 md:px-0">
                                <h1 data-aos="fade-left" className="mt-12 max-w-full w-full text-2xl font-bold leading-none tracking-tighter text-black md:px-12 md:text-5xl lg:text-6xl lg:max-w-7xl xl:px-0">
                                    {service.solutionSection.sectionTitle[selectedLanguage]}<br className="hidden lg:block" />
                                </h1>
                                <p data-aos="fade-left" data-aos-delay="200" className="max-w-7xl mx-auto mt-2 text-lg leading-relaxed text-black md:px-12 xl:px-0">
                                    {service.solutionSection.sectionDescription[selectedLanguage]}
                                </p>
                                <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            <section className=" dark:text-gray-100 pb-32">
                {services && services.length > 0 ? (
                    <div key={services[0]._id} className="container mx-auto flex flex-col p-6">
                        {services[0].solutionSection.solutions && services[0].solutionSection.solutions.length > 0 && (
                            <div className="divide-y divide-gray-700">
                                {services[0].solutionSection.solutions.map((solution, index) => (
                                    <div key={index} className="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                                        <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                                            <span className="text-xl font-bold md:text-2xl" style={{ color: 'black' }}>{solution.solutionTitle[selectedLanguage]}</span>
                                            <span key={index} className="mt-4 dark:text-gray-300 text-xl" style={{ color: 'black' }}>{solution.solutionDescription[selectedLanguage]}</span>
                                        </div>
                                        <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                                            <img className="" src={transformSanityImage(solution.solutionIcon.asset._ref)} alt={`Solutions Logo ${index}`} width={100} height={100} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : null}
            </section>

        </section>
    );
};

export default Services;