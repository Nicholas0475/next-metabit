"use client";

import { getEmployeeList } from "@/sanity/sanity-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faGlobe as faSolidGlobe } from "@fortawesome/free-solid-svg-icons";;
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { VCardFormatter, VCard} from "@/types/vCardFomatter";
import { useLanguage } from '@/components/atoms/LanguageContext';
import Employee from "@/types/Employee";


type Props = {
  params: { slug: string };
};


export default function EmployeePage({ params }: Props) {

  const { selectedLanguage } = useLanguage();

  const [employeeList, setEmployeeList] = useState<Employee | null>(null);

  const [loading, setLoading] = useState(true);

  const translatedTexts = {
    en: {
      addContact: 'Add Contact',
      sendEmail: 'Send Email',
      // Add other English 
    },
    jp: {
      addContact: '連絡先を追加',
      sendEmail: 'メールを送る'
      // Add other Japanese 
    },
    zh: {
      addContact: '添加联系人',
      sendEmail: '发送电子邮件',
      // Add other Chinese 
    },
    ko: {
      addContact: '락처 추가',
      sendEmail: '이메일 보내기',
      // Add other Korea 
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = params.slug;
        const employeeData = await getEmployeeList(slug);

        if (employeeData) {
          setEmployeeList(employeeData);
        } else {
          setEmployeeList(null);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setEmployeeList(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  if (loading) {
    // Display a loading indicator while fetching data.
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const slug = params.slug;

  console.log("Slug:", slug);

  function transformSanityImage(imageRef: string): string {
    if (imageRef !== undefined) {
      const refArray = imageRef.split('-');
      return `https://cdn.sanity.io/images/eitw7pjp/production/${refArray[1]}-${refArray[2]}.${refArray[3]}?auto=format`;
    }
    return '';
  }

  try {

    // Check if employeeList is null or undefined
    if (!employeeList) {
      // Handle the case when no employee data is found for the given slug
      return (
        <div>
          <p>No employee data found for this slug.</p>
        </div>
      );
    }

    const downloadVCard = (vCardString: string, employeeName: string) => {
      const fileName = `${employeeName}_contact.vcf`; // Customize the filename
      const vCardBlob = new Blob([vCardString], { type: 'text/vcard' });
      const vCardUrl = window.URL.createObjectURL(vCardBlob);
      const a = document.createElement('a');
      a.href = vCardUrl;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(vCardUrl);
    };


    // Generate the VCard data
    const vCardData: VCard = {
      name: {
        firstNames: employeeList.name.firstName,
        lastNames: employeeList.name.lastName,
      },
      telephone: [{ value: employeeList?.phoneNumber, param: { type: "phone" } }],
      email: [{ value: employeeList.email, param: { type: "email" } }],
      // Add other VCard properties as needed
    };

    // Format the VCard data as a string
    const vCardString = VCardFormatter.getVCardAsString(vCardData);

    if (employeeList.description && employeeList.description[selectedLanguage]) {
      // Map over employeeList.description[selectedLanguage].content to generate HTML
      const contentHTML = employeeList.description[selectedLanguage].content.map((block) => {
        // Map over the children of the current block and replace \n with <br />
        const paragraphHTML = block.children.map((child) => {
          if (child.text) {
            // Replace \n with <br /> tags
            const textWithLineBreaks = child.text.replace(/\n/g, '<br />');
            return `<p>${textWithLineBreaks}</p>`;
          }
          return null;
        }).join('');
        return (
          <div key={block._key} className="text-center">
            <div
              className="text-black text-lg"
              dangerouslySetInnerHTML={{ __html: paragraphHTML }}
            />
          </div>
        );
      });
      return (
        <section className="relative">
          <div className=" bg-transparent flex flex-wrap items-center justify-center " style={{ padding: "100px 10px 100px 10px" }}>
            <div className="container lg:w-5/6 h-4/5 xl:w-5/6 sm:w-full md:w-2/3 border-black border-4 bg-transparent transform duration-200 easy-in-out">
              <div className=" h-32 overflow-hidden" >
                <img className="w-full" src={transformSanityImage(employeeList.employeeBgImage.asset._ref)} alt="" />
              </div>
              <div className="flex justify-center px-5  -mt-12">
                <img className="h-32 w-32 bg-transparent p-2 rounded-full" src={transformSanityImage(employeeList.employeeImage.asset._ref)} alt="" />
              </div>
              <div className="">
                <div className="text-center px-14">
                  <h2 className="text-gray-800 text-3xl font-bold">
                    {employeeList.name.firstName} {employeeList.name.lastName}
                  </h2>
                  <h3 className="text-gray-600 font-bold">{employeeList.position2?.[selectedLanguage]}</h3>
                  {employeeList.slug && (
                    <a
                      className="text-gray-400 mt-2 hover:text-blue-500"
                      href={`/employee/${employeeList.slug}`}
                      target="_blank"
                    >
                      {`@${employeeList.slug}`}
                    </a>
                  )}
                  <div className="lg:px-52 text-gray-500">
                    {contentHTML}
                  </div>
                  <div className="flex justify-center pt-5 space-x-4 align-center">
                    {employeeList && employeeList.socialMediaLinks && employeeList.socialMediaLinks.facebook && (
                      <a
                        rel="noopener noreferrer"
                        href={employeeList.socialMediaLinks.facebook}
                        aria-label="Facebook"
                        className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                      </a>
                    )}

                    {employeeList && employeeList.socialMediaLinks && employeeList.socialMediaLinks.twitter && (
                      <a
                        rel="noopener noreferrer"
                        href={employeeList.socialMediaLinks.twitter}
                        aria-label="Facebook"
                        className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                      </a>
                    )}

                    {employeeList && employeeList.socialMediaLinks && employeeList.socialMediaLinks.instagram && (
                      <a
                        rel="noopener noreferrer"
                        href={employeeList.socialMediaLinks.instagram}
                        aria-label="Facebook"
                        className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                      </a>
                    )}

                    {employeeList && employeeList.socialMediaLinks && employeeList.socialMediaLinks.website && (
                      <a
                        rel="noopener noreferrer"
                        href={employeeList.socialMediaLinks.website}
                        aria-label="Facebook"
                        className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faGlobe} size="2x" />
                      </a>
                    )}

                    {employeeList && employeeList.socialMediaLinks && employeeList.socialMediaLinks.tiktok && (
                      <a
                        rel="noopener noreferrer"
                        href={employeeList.socialMediaLinks.tiktok}
                        aria-label="Facebook"
                        className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faTiktok} size="2x" />
                      </a>
                    )}
                  </div>
                  <div className="py-4 grid justify-items-center">
                    <QRCode value={vCardString} />
                  </div>
                  <hr className="mt-6 " />
                </div>
                <section className="text-gray-600 body-font">
                  <div className="container px-5 pt-6 mx-auto">
                    <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                      <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                          </svg>
                          <span className="title-font font-medium text-base">{employeeList.position1?.[selectedLanguage]}</span>
                        </div>
                      </div>
                      <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          <span className="title-font font-medium text-base">{employeeList.workAddress}</span>
                        </div>
                      </div>
                      {employeeList.phoneNumber && (
                        <div className="p-2 sm:w-1/2 w-full">
                          <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            <span className="title-font font-medium text-base">{employeeList.phoneNumber}</span>
                          </div>
                        </div>
                      )}

                      {employeeList.email !== 'management@metabit.network' && (
                        <div className="p-2 sm:w-1/2 w-full">
                          <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                              <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                            </svg>
                            <span className="title-font font-medium text-base">{employeeList.email}</span>
                          </div>
                        </div>
                      )}
                      <div className="p-2 sm:w-1/2 w-full">
                      </div>
                    </div>
                  </div>
                </section>
                <hr className="mt-6 " />
              </div>
              <div className="flex items-end content-end bg-gray-50 border-t-4 border-black ">
                <div id="downloadButtonFunction" className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer border-r-4 border-black" onClick={() => downloadVCard(vCardString, `${employeeList.name.firstName}_${employeeList.name.lastName}`)}>
                  <p>
                    <i className="fa-solid fa-address-card"></i>
                    <span className="font-semibold pr-1">Add Contact</span>
                  </p>
                </div>

                <div className="border"></div>


                <a className="text-center w-1/2" href={`mailto:${employeeList.email}`}>
                  <div className="p-4 hover:bg-gray-100 cursor-pointer">
                    <p>
                      <i className="fa-solid fa-paper-plane"></i>
                      <span className="font-semibold pr-1">Send Email</span>
                    </p>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </section>
      );

    } else {
      return (
        <section className="relative">
          <div className=" bg-transparent flex flex-wrap items-center justify-center " style={{ padding: "100px 10px 100px 10px" }}>
            <div className="container lg:w-5/6 h-4/5 xl:w-5/6 sm:w-full md:w-2/3 border-black border-4 bg-transparent transform duration-200 easy-in-out">
              <div className=" h-32 overflow-hidden" >
                <img className="w-full" src={transformSanityImage(employeeList.employeeBgImage.asset._ref)} alt="" />
              </div>
              <div className="flex justify-center px-5  -mt-12">
                <img className="h-32 w-32 bg-transparent p-2 rounded-full" src={transformSanityImage(employeeList.employeeImage.asset._ref)} alt="" />
              </div>
              <div className="">
                <div className="text-center px-14">
                  <h2 className="text-gray-800 text-3xl font-bold">
                    {employeeList.name.firstName} {employeeList.name.lastName}
                  </h2>
                  <h3 className="text-gray-600 font-bold">{employeeList.position2?.[selectedLanguage]}</h3>
                  {employeeList.slug && (
                    <a
                      className="text-gray-400 mt-2 hover:text-blue-500"
                      href={`/employee-profile/${employeeList.slug}`}
                      target="_blank"
                    >
                      {`@${employeeList.slug}`}
                    </a>
                  )}
                  <div className="lg:px-52 text-gray-500">
                    {/* {contentHTML} */}
                  </div>
                  <div className="flex justify-center pt-5 space-x-4 align-center">
                    {employeeList && employeeList.socialMediaLinks && employeeList.socialMediaLinks.facebook && (
                      <a
                        rel="noopener noreferrer"
                        href={employeeList.socialMediaLinks.facebook}
                        aria-label="Facebook"
                        className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                      </a>
                    )}

                    {employeeList && employeeList.socialMediaLinks && employeeList.socialMediaLinks.twitter && (
                      <a
                        rel="noopener noreferrer"
                        href={employeeList.socialMediaLinks.twitter}
                        aria-label="Facebook"
                        className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                      </a>
                    )}

                    {employeeList && employeeList.socialMediaLinks && employeeList.socialMediaLinks.instagram && (
                      <a
                        rel="noopener noreferrer"
                        href={employeeList.socialMediaLinks.instagram}
                        aria-label="Facebook"
                        className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                      </a>
                    )}

                    {employeeList && employeeList.socialMediaLinks && employeeList.socialMediaLinks.website && (
                      <a
                        rel="noopener noreferrer"
                        href={employeeList.socialMediaLinks.website}
                        aria-label="Facebook"
                        className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faGlobe} size="2x" />
                      </a>
                    )}

                    {employeeList && employeeList.socialMediaLinks && employeeList.socialMediaLinks.tiktok && (
                      <a
                        rel="noopener noreferrer"
                        href={employeeList.socialMediaLinks.tiktok}
                        aria-label="Facebook"
                        className="p-2 rounded-md dark:text-black-100 hover:dark:text-white-400 w-12"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faTiktok} size="2x" />
                      </a>
                    )}
                  </div>
                  <div className="py-4 grid justify-items-center">
                    <QRCode value={vCardString} />
                  </div>
                  <hr className="mt-6 " />
                </div>
                <section className="text-gray-600 body-font">
                  <div className="container px-5 pt-6 mx-auto">
                    <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                      <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                          </svg>
                          <span className="title-font font-medium text-base">{employeeList.position1?.[selectedLanguage]}</span>
                        </div>
                      </div>
                      <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          <span className="title-font font-medium text-base">{employeeList.workAddress}</span>
                        </div>
                      </div>
                      {employeeList.phoneNumber && (
                        <div className="p-2 sm:w-1/2 w-full">
                          <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            <span className="title-font font-medium text-base">{employeeList.phoneNumber}</span>
                          </div>
                        </div>
                      )}
                      {employeeList.email !== 'management@metabit.network' && (
                        <div className="p-2 sm:w-1/2 w-full">
                          <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                              <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                            </svg>
                            <span className="title-font font-medium text-base">{employeeList.email}</span>
                          </div>
                        </div>
                      )}
                      <div className="p-2 sm:w-1/2 w-full">
                      </div>
                    </div>
                  </div>
                </section>
                <hr className="mt-6 " />
              </div>
              <div className="flex items-end content-end bg-gray-50 border-t-4 border-black ">
                <div id="downloadButtonFunction" className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer border-r-4 border-black" onClick={() => downloadVCard(vCardString, `${employeeList.name.firstName}_${employeeList.name.lastName}`)}>
                  <p>
                    <i className="fa-solid fa-address-card"></i>
                    <span className="font-semibold pr-1">{translatedTexts[selectedLanguage].addContact}</span>
                  </p>
                </div>

                <div className="border"></div>


                <a className="text-center w-1/2" href={`mailto:${employeeList.email}`}>
                  <div className="p-4 hover:bg-gray-100 cursor-pointer">
                    <p>
                      <i className="fa-solid fa-paper-plane"></i>
                      <span className="font-semibold pr-1">{translatedTexts[selectedLanguage].sendEmail}</span>
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      );
    }


  } catch (error) {
    console.error("Error fetching employee data:", error);
    // Handle the error gracefully, e.g., display an error message
    return (
      <div>
        <p>Error fetching employee data. Please try again later.</p>
      </div>
    );
  }

}


