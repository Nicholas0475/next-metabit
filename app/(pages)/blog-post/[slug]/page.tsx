"use client";

import { getBlogPostsDetail } from "@/sanity/sanity-utils";
import React, { useState, useEffect } from 'react';
import { format} from 'date-fns';
import BlogPost from "@/types/Blog-Posts";
import { useLanguage } from '@/components/atoms/LanguageContext';

type Props = {
    params: { slug: string };
};

export default function BlogPostPage({ params }: Props) {
    const slug = params.slug;

    const [blogPostDetail, setBlogPosts] = useState<BlogPost>();

    const { selectedLanguage } = useLanguage();

    console.log("Slug:", slug);

    function transformSanityImage(imageRef: string): string {
        if (imageRef !== undefined) {
            const refArray = imageRef.split('-');
            return `https://cdn.sanity.io/images/eitw7pjp/production/${refArray[1]}-${refArray[2]}.${refArray[3]}?auto=format`;
        }
        return '';
    }

    try {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const slug = params.slug;
                    const blogPostsData = await getBlogPostsDetail(slug);

                    if (blogPostsData) {
                        setBlogPosts(blogPostsData);
                    } else {
                        setBlogPosts;
                    }
                } catch (error) {
                    console.error("Error fetching blog data:", error);
                    setBlogPosts;
                } finally {
                    
                }
            };

            fetchData();
        }, [params.slug]);

        // Check if employeeList is null or undefined
        if (!blogPostDetail) {
            // Handle the case when no employee data is found for the given slug
            return (
                <div>
                    <p>No blog data found for this slug.</p>
                </div>
            );
        }

        if (blogPostDetail && blogPostDetail.content && blogPostDetail.content[selectedLanguage] && blogPostDetail.content[selectedLanguage].content) {
            const contentHTML = blogPostDetail.content[selectedLanguage].content.map((block) => {
                if (block.children) {
                    const blockContent = block.children.map((child, index) => {
                        if (child.text) {
                            const textWithLineBreaks = child.text.replace(/\n/g, '<br />');
                            return (
                                <div key={`${block._key}-${index}-text`}>
                                    <p dangerouslySetInnerHTML={{ __html: textWithLineBreaks }} />
                                </div>
                            );
                        }
                        return null;
                    });

                    return (
                        <div key={block._key} className="">
                            <div className="text-black text-lg">{blockContent}</div>
                        </div>
                    );
                }

                return null;
            });
            return (
                <div className="flex justify-center mb-4 ">
                    <div className="bg-white shadow-md mx-5 rounded-md overflow-hidden w-full md:w-4/5 ">
                        <img className="h-24 md:h-40 w-full object-cover rounded-t-md" src={transformSanityImage(blogPostDetail.image.asset._ref)} />
                        <div className="p-4 md:p-8">
                            <div className="flex justify-between space-x-2">
                                <h1 className="font-bold text-2xl md:text-4xl mb-2 text-black">{blogPostDetail.title.en}</h1>
                            </div>
                            <div className="flex justify between my-2">
                                <p className="group-hover:text-white">
                                    {/* Date code here */}
                                </p>
                                <div className="font-semibold rounded-full py-1 px-4 bg-orange-200 text-sm text-gray-800 outline outline-orange-200 outline-offset-2 outline-2">{blogPostDetail.category?.category?.en || 'No Category'}</div>
                            </div>
                            <div className="mt-9 text-gray-700 text-base break-words" >
                                {contentHTML}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex justify-center mb-4 ">
                    <div className="bg-white shadow-md mx-5 rounded-md overflow-hidden w-full md:w-4/5 ">
                        <img className="h-24 md:h-40 w-full object-cover rounded-t-md" src={transformSanityImage(blogPostDetail.image.asset._ref)} />
                        <div className="p-4 md:p-8">

                            <div className="flex justify-between space-x-2">
                                <h1 className="font-bold text-2xl md:text-4xl mb-2 text-black">{blogPostDetail.title.en}</h1>
                            </div>

                            <div className="flex justify-between my-2">
                                <p className="group-hover:text-white">
                                    {blogPostDetail._createdAt
                                        ? format(new Date(Date.parse(blogPostDetail._createdAt)), 'MMMM dd, yyyy')
                                        : blogPostDetail._createdAt
                                            ? format(new Date(Date.parse(blogPostDetail._createdAt)), 'MMMM dd, yyyy')
                                            : 'Invalid Date'}
                                </p>
                                <div className="font-semibold rounded-full py-1 px-4 bg-orange-200 text-sm text-gray-800 outline outline-orange-200 outline-offset-2 outline-2">{blogPostDetail.category?.category?.en || 'No Category'}</div>
                            </div>

                            <div className="mt-9 text-gray-700 text-base break-words" >
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between m-5 border-t border-gray-400 pt-2">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }


    } catch (error) {
        console.error("Error fetching blog data:", error);
        // Handle the error gracefully, e.g., display an error message
        return (
            <div>
                <p>Error fetching blog data. Please try again later.</p>
            </div>
        );
    }

}