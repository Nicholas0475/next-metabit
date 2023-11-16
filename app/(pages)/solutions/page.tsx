"use client"

import {getSolutionsPageData } from "@/sanity/sanity-utils";
import { Solutions } from "@/types/Solutions";
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/components/atoms/LanguageContext';


export function Solutions() {

  const [solutions, setSoltions] = useState<Solutions[]>([]);

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
        const solutionData = await getSolutionsPageData();

        setSoltions(solutionData);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative">
      {solutions.map((solution) => (
        <section key={solution._id}>
          <div data-aos="fade-down" className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex flex-col w-full mb-12 text-center">
              <h1 className="max-w-5xl text-5xl font-bold leading-none tracking-tighter text-black md:text-5xl lg:text-8xl lg:max-w-7xl">
                {solution.solutionsPageHeader[selectedLanguage]}
              </h1>
            </div>
          </div>
        </section>
      ))}

      {solutions.map((solution) => (
        <div key={solution._id} className="min-h-full px-12 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-7xl md:mb-12">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                {solution.aboutCrypto.aboutCryptoName[selectedLanguage]}
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg viewBox="0 0 52 24" fill="currentColor" className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                  <defs>
                    <pattern id="2feffae2-9edf-414e-ab8c-f0e6396a0fc1" x="0" y="0" width=".135" height=".30">
                      <circle cx="1" cy="1" r=".7"></circle>
                    </pattern>
                  </defs>
                  <rect fill="url(#2feffae2-9edf-414e-ab8c-f0e6396a0fc1)" width="52" height="24"></rect>
                </svg>
                <span className="relative text-6xl">{solution.aboutCrypto.aboutCryptoTitle[selectedLanguage]}</span>
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              {solution.aboutCrypto.aboutCryptoText[selectedLanguage].split('\n')}
            </p>
          </div>
          <div className="relative flex items-center justify-center w-full dark:text-gray-50">
            <button aria-label="Slide back" type="button" className="absolute left-0 z-30 p-2 ml-10 focus:outline-none focus:dark:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
              <svg width="8" height="14" fill="none" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            {solutions && solutions.length > 0 ? (
              <div key={solutions[0]._id} className="flex items-center justify-start w-full h-full gap-6 py-4 mx-auto overflow-auto lg:gap-8">
                {solutions[0].aboutCrypto.aboutCryptoNFTImage.map((image, index) => (
                  <div className="relative flex flex-shrink-0 w-full sm:w-auto">
                    <div key={index}>
                      <img src={transformSanityImage(image.asset._ref)} alt={`CryptoNFTImage ${index}`} className="object-cover object-center rounded-md h-96 aspect-square dark:bg-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <button aria-label="Slide forward" id="next" className="absolute right-0 z-30 p-2 mr-10 focus:outline-none focus:dark:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
      ))}

      {solutions.map((solution) => (
        <section key={solution._id} className="py-32">
          <h1 className="text-3xl pb-8 text-black font-bold leading-none text-center sm:text-4xl">{solution.nftDataStructure.nftDsTitle[selectedLanguage]}</h1>
          <div className="bg-transparent px-4 md:px-12 pb-4 xl:px-0 text-white font-[poppins]">
            <div className="xl:flex xl:items-center justify-center">
              <div className="xl:my-10 border-2 border-black xl:w-72 bg-transparent p-5 rounded-md shadow-xl">
                <img src={transformSanityImage(solution.nftDataStructure.contentDataTable.uploadedContentData.image.asset._ref)} alt="cryptoBadge" />
                <h2 className="text-md text-black font-bold mt-3">{solution.nftDataStructure.nftExample.nftName[selectedLanguage]}</h2>
                <p className="text-gray-600 text-sm mb-2">{solution.nftDataStructure.nftExample.nftDescription[selectedLanguage]}</p>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-black font-bold">
                    <i className="fab fa-ethereum"></i>{solution.nftDataStructure.nftExample.nftPrice} ETH
                  </p>
                  <p className="text-black">
                    <i className="fas fa-clock">{solution.nftDataStructure.nftExample.nftRemTime[selectedLanguage]}</i>
                  </p>
                </div>
                <p className="bg-transparent h-[0.5px] xl:px-0 w-full my-2"></p>
                <div className="flex items-center">
                  <img src={transformSanityImage(solution.nftDataStructure.nftExample.nftCreatorBadge.asset._ref)} alt="BAYC" className="h-8 w-8 border border-black rounded-full mr-2" />
                  <p className="text-black text-[12px]">
                    {solution.nftDataStructure.nftExample.nftCreatedByText[selectedLanguage]} <a href="https://opensea.io/collection/boredapeyachtclub" target="_black" rel="no-opener" className="text-black font-bold">{solution.nftDataStructure.nftExample.nftCreator[selectedLanguage]}</a>
                  </p>
                </div>
              </div>

              <div className="md:flex md:flex-col md:px-12">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="pt-10 lg:py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full border text-center">
                        <thead className="border-b">
                          <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                              {solution.nftDataStructure.contentDataTable.contentData.key[selectedLanguage]}
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                              {solution.nftDataStructure.contentDataTable.contentData.value[selectedLanguage]}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                              {solution.nftDataStructure.contentDataTable.uploadedContentData.key[selectedLanguage]}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                              <img className="mx-auto" alt="BAYC Ape" src={transformSanityImage(solution.nftDataStructure.contentDataTable.uploadedContentData.image.asset._ref)} width="170" height="170" />
                              <p className="">{solution.nftDataStructure.contentDataTable.uploadedContentData.value[selectedLanguage]}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {solutions && solutions.length > 0 ? (
                  <div key={solutions[0]._id} className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    {solutions[0].nftDataStructure.metaDataTable && solutions[0].nftDataStructure.metaDataTable.length > 0 && (
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full border text-center">
                            <thead className="border-b">
                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                  {solutions[0].nftDataStructure.metaDataTable[0].key[selectedLanguage]}
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                  {solutions[0].nftDataStructure.metaDataTable[0].value[selectedLanguage]}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {solutions[0].nftDataStructure.metaDataTable.slice(1).map((data, index) => (
                                <tr key={index}>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                    {data.key[selectedLanguage]}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                    {data.value[selectedLanguage].split('\n').map((line, lineIndex) => (
                                      <div key={lineIndex}>{line}</div>
                                    ))}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}


                {solutions && solutions.length > 0 ? (
                  <div key={solutions[0]._id} className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    {solutions[0].nftDataStructure.IndexData && solutions[0].nftDataStructure.IndexData.length > 0 && (
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full border text-center">
                            <thead className="border-b">
                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                  {solutions[0].nftDataStructure.IndexData[0].key[selectedLanguage]}
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                  {solutions[0].nftDataStructure.IndexData[0].value[selectedLanguage]}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {solutions[0].nftDataStructure.IndexData.slice(1).map((data, index) => (
                                <tr key={index}>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                    {data.key[selectedLanguage]}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                    {data.value[selectedLanguage].split('\n').map((line, lineIndex) => (
                                      <div key={lineIndex}>{line}</div>
                                    ))}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <p className="mt-2 text-sm text-black">{solution.nftDataStructure.offChainText[selectedLanguage]}</p>
                          <p className="text-black text-sm">{solution.nftDataStructure.onChainText[selectedLanguage]}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>

          </div>
        </section>
      ))}

      {solutions.map((solution) => (
        <section className="bg-transparent">
          <div key={solution._id} className="container px-12 py-10 mx-auto">
            <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl">
              {solution.nftDataStructure.AboutCryptoAssetSection.sectionTitle[selectedLanguage]}
            </h1>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-2 md:grid-cols-2 xl:grid-cols-3">
              {solutions[0]?.nftDataStructure?.AboutCryptoAssetSection?.assetFeature?.map((feature, index) => (
                <section key={index} className="bg-transparent border-2 border-black p-6 rounded-xl">
                  <div className="flex flex-col items-center space-y-3 text-center bg-transparent">
                    {index === solutions[0]?.nftDataStructure?.AboutCryptoAssetSection?.assetFeature.length - 1 ? null : (
                      <span className="inline-block p-3 text-black bg-transparent border-2 border-black rounded-full dark-text-white">
                        {feature?.icon?.asset && (
                          <img src={transformSanityImage(feature.icon.asset._ref)} className="w-6 h-6" alt="" />
                        )}
                      </span>
                    )}
                    <h1 className="font-semibold text-xl text-gray-700 capitalize dark-text-white">
                      {feature.featureName[selectedLanguage]}
                    </h1>
                    {feature?.description[selectedLanguage].split('\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-500 text-base dark-text-gray-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-32">
        {solutions.map((solution) => (
          <div key={solution._id} className="px-12 xl:mx-auto xl:max-w-7xl py-8">
            <h1 className="text-3xl pb-8 text-black font-bold leading-none text-center sm:text-4xl">
              {solution.nftDataStructure.nftMarketSizeSection.sectionTitle[selectedLanguage]}
            </h1>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {solution.nftDataStructure.nftMarketSizeSection.sizeList.map((size, index) => (
                <section key={index} className="border-2 border-black rounded-lg bg-transparent p-8">
                  <div className="grid grid-cols-1 xl:gap-12 sm:grid-cols-3 sm:items-center">
                    <img
                      alt="Man"
                      src={transformSanityImage(size.sizeIcon.asset._ref)}
                      className="align-middle aspect-square w-12 xl:w-32 rounded-lg object-contain"
                    />
                    <blockquote className="sm:col-span-2">
                      <p className="text-xl font-regular sm:text-base text-black">
                        {size.text[selectedLanguage]}
                      </p>
                    </blockquote>
                  </div>
                </section>
              ))}
            </div>
            <p className="mt-4 text-base text-start text-gray-700 md:text-lg">
              {solution.nftDataStructure.nftMarketSizeSection.nftUsesText[selectedLanguage]}
            </p>
            <div className="mt-4 px-12 xl:mx-auto max-w-7xl px-4 py-1">
              {solution.nftDataStructure.nftMarketSizeSection.businessUseCase.map((items, index) => (
                <section key={index} className="rounded-md bg-gray-100 p-2 mb-4">
                  <div className="sm:items-center">
                    <blockquote className="sm:col-span-2">
                      <p className="text-xl text-center font-regular sm:text-base text-black">
                        {items[selectedLanguage]}
                      </p>
                    </blockquote>
                  </div>
                </section>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="px-12 text-black min-h-screen py-32">
        {solutions.map((solution) => (
          <div key={solution._id} className="container flex flex-col items-center p-4 mx-auto md:p-8">
            {solution.nftDataStructure && solution.nftDataStructure.worldOfNftSection ? (
              <h1 className="text-3xl pb-8 text-black font-bold leading-non text-center sm:text-4xl">
                {solution.nftDataStructure.worldOfNftSection.sectionTitle ? (
                  solution.nftDataStructure.worldOfNftSection.sectionTitle[selectedLanguage] || "Default Value or Error Handling"
                ) : "Default Value or Error Handling"}
              </h1>
            ) : (
              "Default Value or Error Handling"
            )}
            <div>
              {solutions.map((solutions) => {
                const content = solutions.nftDataStructure.worldOfNftSection.sectionText[selectedLanguage].content.map((block) => {
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
                  <div key={solutions._id}
                    className="text-base text-center text-gray-700 md:text-lg"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                );
              })}
            </div>
            <div className="relative mt-6 mb-12">
              <span className="absolute inset-y-0 flex items-center pl-2 mx-auto">
                <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
                </button>
              </span>
            </div>

            <div className="flex flex-col w-full h-full sm:flex-row sm:divide-y-0 sm:divide-x sm:px-8 md:w-auto xl:w-full lg:px-12 xl:px-32 divide-gray-700">
              {[0, 1, 2].map((i) => {
                // Declare typesArr inside the map function
                const typesArr = solution?.nftDataStructure?.worldOfNftSection?.nftTypes;
                // console.log('typesArr:', typesArr);
                return (
                  <div key={i} className="flex text-black text-xl flex-col w-full divide-x divide-gray-700 divide-y">
                    {typesArr && typesArr.length > 0 ? (
                      <div>
                        {typesArr.slice(i * 3, (i + 1) * 3).map((types) => (
                          <div key={types.name[selectedLanguage]} className="p-8 divide-y">
                            <a
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center p-4 sm:py-8 lg:py-12"
                            >
                              {types.name[selectedLanguage] ? (
                                types.name[selectedLanguage]
                              ) : (
                                "Fallback Name"
                              )}
                            </a>
                            {types.image.asset._ref ? (
                              <img
                                className="w-full"
                                src={transformSanityImage(types.image.asset._ref)}
                                data-aos={i === 0 ? 'fade-right' : i === 1 ? 'fade-down' : 'fade-left'}
                              />
                            ) : (
                              "Image not available"
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      "No NFT Types available"
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </section>

      <section className="pt-16">
        {solutions.map((solutions) => {
          const content = solutions.nftDataStructure.securityTokenSection.securityTokenText[selectedLanguage].content.map((block) => {
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
            <div key={solutions._id} className="min-h-full px-12 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <h1 className="text-3xl pb-8 text-black font-bold leading-none text-center sm:text-4xl">
                {solutions.nftDataStructure.securityTokenSection.title[selectedLanguage]}
              </h1>
              <div key={solutions._id} className="mt-2 text-base text-center text-gray-700 md:text-lg">
                <div className="text-black text-lg" dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          );
        })}
      </section>

      <section className="pb-16">
        <div className="flex flex-col pt-8 xl:pt-0 px-12 xl:px-40">
          {solutions && solutions.length > 0 ? (
            <div key={solutions[0]._id} className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              {solutions[0].nftDataStructure.securityTokenSection.securityTokenTable && solutions[0].nftDataStructure.securityTokenSection.securityTokenTable.length > 0 && (
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full border text-center">
                      <thead className="border-b">
                        <tr>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                            STO
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                            ICO
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {solutions[0].nftDataStructure.securityTokenSection.securityTokenTable.slice(0).map((data, index) => (
                          <tr key={index} className="bg-transparent border-b">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                              {data.key[selectedLanguage]}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                              {data.stoValue[selectedLanguage]}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {data.icoValue[selectedLanguage]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </section>
    </section>
  );
};

export default Solutions;