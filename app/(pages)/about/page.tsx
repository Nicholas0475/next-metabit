"use client"


import { getAboutData, getEmployeeData } from '@/sanity/sanity-utils';
import Employee from '@/types/Employee';
import { About } from '@/types/About';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/atoms/LanguageContext';


export function About() {

    const [abouts, setAbouts] = useState<About[]>([]);

    const [employees, setEmployees] = useState<Employee[]>([]);

    const { selectedLanguage } = useLanguage();

    const translatedTexts = {
        en: {
            compname: 'Company Name',
            add: "Address",
            manage: "Management",
            regnum: "Register Number",
            descbuss: "Description for Business",
            incoperated: "Incoperated",
            // Add other English 
        },
        jp: {
            compname: '会社名',
            add: "住所",
            manage: "管理",
            regnum: "登録番号",
            descbuss: "事業内容説明",
            incoperated: "法人化",
            // Add other Japanese 
        },
        zh: {
            compname: '会社名',
            add: "住所",
            manage: "管理",
            regnum: "登録番号",
            descbuss: "事業内容説明",
            incoperated: "法人化",
            // Add other Japanese 
        },
        ko: {
            compname: '会社名',
            add: "住所",
            manage: "管理",
            regnum: "登録番号",
            descbuss: "事業内容説明",
            incoperated: "法人化",
            // Add other Japanese 
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
                const aboutData = await getAboutData();
                const employeeData = await getEmployeeData();

                setAbouts(aboutData);
                setEmployees(employeeData);
            } catch (error) {
                // Handle errors here
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className='relative'>
            <div className="bg-transparent overflow-x-hidden sm:overflow-x-hidden md:overflow-x-hidden lg:overflow-x-hidden" style={{ height: "100%", width: "100%" }}>
                <section>
                    {abouts.map((about) => (
                        <div key={about._id} data-aos="fade-down" className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                            <div className="flex flex-col w-full mb-12 text-center">
                                <h1 className="max-w-5xl text-5xl font-bold leading-none tracking-tighter text-black md:text-5xl lg:text-8xl lg:max-w-7xl">
                                    {about.ourMissionTitle[selectedLanguage]}
                                </h1>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="early px-12 md:px-36 pb-32">
                    <article>
                        {abouts.map((about) => {
                            const content = about.ourMissionContent[selectedLanguage].content.map((block) => {
                                return block.children.map((child) => {
                                    if (child.text) {
                                        // Replace \n with <br /> tags
                                        const textWithLineBreaks = child.text.replace(/\n/g, '<br />');
                                        return textWithLineBreaks;
                                    } else {
                                        return null;
                                    }
                                }).join('');
                            }).join('<br />');
                            return (
                                <div key={about._id} className="text-center">
                                    <div
                                        className="text-black text-lg"
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    />
                                </div>
                            );
                        })}
                    </article>
                </section>


                <section className="pb-32">
                    {abouts.map((about) => (
                        <div key={about._id} className="px-4 pb-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:pt-24">
                            <div className="flex flex-wrap items-center mx-auto max-w-7xl">
                                <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                                    <div>
                                        <div className="relative w-full max-w-7lg px-5">
                                            <div className="absolute top-0 rounded-full -left-4 w-72 h-100 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                                            <div className="absolute rounded-full bg-transparent -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                                            {about.expertise.image && (
                                                <div className="relative">
                                                    <img className="object-cover object-center mx-auto rounded-lg shadow-2xl" src={transformSanityImage(about.expertise.image.asset._ref)} alt="hero" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start px-5 mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                                    <h1 data-aos="fade-left" className="mb-8 text-4xl font-bold leading-none tracking-tighter text-black md:text-7xl lg:text-5xl">{about.expertise.title[selectedLanguage]}</h1>
                                    <p data-aos="fade-left" className="mb-8 text-base leading-relaxed text-left text-black">{about.expertise.text[selectedLanguage]}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                <section className=" dark:text-gray-100 pb-32">
                    {abouts && abouts.length > 0 ? (
                        <div key={abouts[0]._id} className="container mx-auto flex flex-col p-6">
                            {abouts[0].expertise.businessValues && abouts[0].expertise.businessValues.length > 0 && (
                                <div className="divide-y divide-gray-700" >
                                    {abouts[0].expertise.businessValues.map((about, index) => (
                                        <div key={index} className="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                                            <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                                                <img src={transformSanityImage(about.icon.asset._ref)} alt={`About Business Logo ${index}`} width={60} height={60} />
                                            </div>
                                            <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">

                                                <span className="text-lg font-bold md:text-2xl" style={{ color: 'black' }}>{about.title[selectedLanguage]}</span>
                                                <span key={index} className="mt-4 dark:text-gray-300 text-lg" style={{ color: 'black' }}>{about.description[selectedLanguage]}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : null}
                </section>

                <section className="">
                    {abouts.map((about) => (
                        <div key={about._id} data-aos="fade-down" className="px-4 pt-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:pt-24">
                            <div className="flex flex-col w-full mb-12 text-center">
                                <h1 className="max-w-5xl text-5xl font-bold leading-none tracking-tighter text-black md:text-5xl lg:text-8xl lg:max-w-7xl">
                                    {about.ourTeamSectionTitle[selectedLanguage]}
                                </h1>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
                    {employees.map((employee) => (
                        <section className="bg-transparent" key={employee._id}>
                            <div className="container px-6 py-10 mx-auto h-full">
                                <Link href={`/employee/${employee.slug}`} key={employee._id}>
                                    <div data-aos="fade-right" className="flex flex-col items-center p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-gray-600 rounded-xl">
                                        <img className="object-cover w-34 h-34 rounded-full ring-4 ring-gray-300" src={transformSanityImage(employee.employeeImage.asset._ref)} alt="" />
                                        <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize group-hover:text-white">
                                            {employee.name.firstName} {employee.name.lastName}
                                        </h1>
                                        <p className="mt-2 text-gray-900 capitalize group-hover:text-gray-300 text-lg">
                                            {employee.position2?.[selectedLanguage]}
                                        </p>
                                        <p className="text-gray-500 capitalize group-hover:text-gray-300 text-lg">
                                            {employee.position1?.[selectedLanguage]}
                                        </p>
                                        <div className="flex mt-3 -mx-2">
                                            {employee && employee.socialMediaLinks && employee.socialMediaLinks.linkedin && (
                                                <div >
                                                    <a href={employee.socialMediaLinks.linkedin} className="text-gray-600 hover:text-gray-500 group-hover:text-white" aria-label="Linkedin">
                                                        <svg className="w-8 h-8 fill-current" viewBox="0 -2 20 20" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                            )}

                                            {employee && employee.socialMediaLinks && employee.socialMediaLinks.github && (
                                                <div >
                                                    <a href={employee.socialMediaLinks.github} className="text-gray-600 hover:text-gray-500 group-hover:text-white" aria-label="Github">
                                                        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
                                                            </path>
                                                        </svg>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </section>
                    ))}
                </div>

                {abouts.map((about) => (
                    <section className="">
                        <div data-aos="fade-down" className="px-4 pt-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:pt-24">
                            <div className="flex flex-col w-full mb-12 text-center">
                                <h1 className="max-w-5xl text-5xl font-bold leading-none tracking-tighter text-black md:text-5xl lg:text-8xl lg:max-w-7xl">
                                    {about.companyProfile.sectionTitle[selectedLanguage]}
                                </h1>
                            </div>
                        </div>
                    </section>
                ))}


                {abouts.map((about) => (
                    <section key={about._id} className="pb-32 ">
                        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                            <h2 className="text-black mb-4 px-3 text-2xl font-semibold leading-tight">{about.companyProfile.jpOffice.officeTitle[selectedLanguage]}</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full p-6 text-xs text-left whitespace-nowrap">
                                    <colgroup>
                                        <col className="w-1/3" />
                                        <col className="w-2/3" />
                                    </colgroup>
                                    <thead>
                                        <tr className="">
                                            <th className=""></th>
                                            <th className=""></th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-b  border-gray-400">
                                        <tr>
                                            <td className="px-3 py-2">
                                                <p className="text-black">{translatedTexts[selectedLanguage].compname}</p>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className="text-black">{about.companyProfile.jpOffice.companyName}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody className="border-b  border-gray-400">
                                        <tr>
                                            <td className="px-3 py-2">
                                                <p className="text-black">{translatedTexts[selectedLanguage].add}</p>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className="text-black">{about.companyProfile.jpOffice.companyAddress}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody className="border-b  border-gray-400">
                                        <tr>
                                            <td className="px-3 py-2">
                                                <p className="text-black">{translatedTexts[selectedLanguage].manage}</p>
                                            </td>

                                            <td className="px-3 py-2">
                                                {about.companyProfile.jpOffice.companyManagement[selectedLanguage].split('\n').map((line, index) =>
                                                    <p key={index} className="text-black">{line}</p>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody className="border-b  border-gray-400">
                                        <tr>
                                            <td className="px-3 py-2">
                                                <p className="text-black">{translatedTexts[selectedLanguage].descbuss}</p>
                                            </td>
                                            <td className="px-3 py-2">
                                                {about.companyProfile.jpOffice.companyBusinessDescription[selectedLanguage].split('\n').map((line, index) =>
                                                    <p key={index} className="text-black">{line}</p>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                ))}

                {abouts.map((about) => (
                    <section key={about._id} className="pb-32">
                        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                            <h2 className="text-black mb-4 px-3 text-2xl font-semibold leading-tight">{about.companyProfile.MYOffice.officeTitle[selectedLanguage]}</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full p-6 text-xs text-left whitespace-nowrap">
                                    <colgroup>
                                        <col className="w-1/3" />
                                        <col className="w-2/3" />
                                    </colgroup>
                                    <thead>
                                        <tr className="">
                                            <th className=""></th>
                                            <th className=""></th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-b  border-gray-400">
                                        <tr>
                                            <td className="px-3 py-2">
                                                <p className="text-black">{translatedTexts[selectedLanguage].compname}</p>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className="text-black">{about.companyProfile.MYOffice.companyName}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody className="border-b  border-gray-400">
                                        <tr>
                                            <td className="px-3 py-2">
                                                <p className="text-black">{translatedTexts[selectedLanguage].regnum}</p>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className="text-black">{about.companyProfile.MYOffice.companyRegisterNumber}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody className="border-b  border-gray-400">
                                        <tr>
                                            <td className="px-3 py-2">
                                                <p className="text-black">{translatedTexts[selectedLanguage].add}</p>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className="text-black">{about.companyProfile.MYOffice.companyAddress}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody className="border-b border-gray-400">
                                        <tr>
                                            <td className="px-3 py-2">
                                                <p className="text-black">{translatedTexts[selectedLanguage].manage}</p>
                                            </td>

                                            <td className="px-3 py-2">
                                                {about.companyProfile.MYOffice.companyManagement[selectedLanguage].split('\n').map((line, index) =>
                                                    <p key={index} className="text-black">{line}</p>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody className="border-b  border-gray-400">
                                        <tr>
                                            <td className="px-3 py-2">
                                                <p className="text-black">{translatedTexts[selectedLanguage].incoperated}</p>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className="text-black">{about.companyProfile.MYOffice.incorporationDate}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody className="border-b  border-gray-400">
                                        <tr>
                                            <td className="px-3 py-2">
                                                <p className="text-black">{translatedTexts[selectedLanguage].descbuss}</p>
                                            </td>
                                            <td className="px-3 py-2">
                                                {about.companyProfile.MYOffice.companyBusinessDescription[selectedLanguage].split('\n').map((line, index) =>
                                                    <p key={index} className="text-black">{line}</p>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                ))}
            </div >
        </section>
    );
};

export default About;