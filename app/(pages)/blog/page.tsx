'use client';

import { getBlogPostCategoryData } from '@/sanity/sanity-utils';
import { getBlogPostsData } from '@/sanity/sanity-utils';
import BlogPost from '@/types/Blog-Posts';
import { BlogPostsCategory } from '@/types/Blog-Posts-Category';
import React, { useEffect, useState } from 'react';
import { format} from 'date-fns';
import Link from 'next/link';
import { useLanguage } from '@/components/atoms/LanguageContext';

export function Blog() {

    const [selectedCategory, setSelectedCategory] = useState('--------');

    const [searchFilter, setSearchFilter] = useState('');

    const [blogData, setBlogData] = useState<BlogPost[]>([]);

    const [filteredData, setFilteredData] = useState<BlogPost[]>([]); // Provide the correct initial type

    const [category, setCategory] = useState<BlogPostsCategory[]>([]);

    const { selectedLanguage } = useLanguage();

    console.log(filteredData); // Log the entire "abouts" array

    useEffect(() => {
        // Fetch category data
        getBlogPostCategoryData().then((categoryData) => {
            setCategory(categoryData);
        });

        // Fetch BlogPost data
        getBlogPostsData().then((blogPostData) => {
            setBlogData(blogPostData);
            setFilteredData(blogPostData);
        });

        // Perform your data fetching here
        fetch('/api/blog-data') // Replace with the actual API endpoint for blog posts
            .then((response) => response.json() as Promise<BlogPost[]>)
            .then((blogPostData) => {
                setBlogData(blogPostData);
            })
            .catch((error) => {
                console.error('Error fetching blog post data:', error);
            });
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        console.log('Selected Category:', selectedValue); // Log the selected category
        setSelectedCategory(selectedValue);

        if (selectedValue === '--------') {
            // If "--------" is selected, show all data
            setFilteredData(blogData);
        } else {
            // Filter data based on the selected category
            const filtered = blogData.filter((item) => item.category?.category?.en === selectedValue);
            console.log('Filtered Data:', filtered); // Log the filtered data
            setFilteredData(filtered);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearchFilter(searchTerm);

        // Call the filtering function
        filterPost(searchTerm);
    };

    function filterPost(searchTerm: string) {
        // Filter based on category
        let filteredPostsByCategory = blogData; // Use blogData for category filtering
        if (selectedCategory !== '--------') {
            filteredPostsByCategory = blogData.filter((item) => item.category?.category?.en === selectedCategory);
        }

        // Filter based on search
        let filteredPostsBySearch = filteredPostsByCategory;
        if (searchTerm.trim() !== '') {
            filteredPostsBySearch = filteredPostsByCategory.filter((item) => {
                const title = item.title.en.toLowerCase();
                return title.includes(searchTerm.toLowerCase());
            });
        }

        setFilteredData(filteredPostsBySearch);
    }

    function transformSanityImage(imageRef: string): string {
        if (imageRef !== undefined) {
            const refArray = imageRef.split('-');
            return `https://cdn.sanity.io/images/eitw7pjp/production/${refArray[1]}-${refArray[2]}.${refArray[3]}?auto=format`;
        }
        return '';
    }

    function transform(html: string, words: number): string {
        const nonHtmlText = html.replace(/<[^>]*>/g, '');
        const text = nonHtmlText.split(' ').slice(0, words).join(' ');
        return text.length > words ? `${text}...` : text;
    }

    return (
        <div className="bg-transparent overflow-x-hidden sm:overflow-x-hidden md:overflow-x-hidden lg:overflow-x-hidden" style={{ height: "100%", width: "100%" }}>
            <section className='relative'>
                <div data-aos="fade-down" className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                    <div className="flex flex-col w-full mb-12 text-center">
                        <h1 className="max-w-5xl text-5xl font-bold leading-none tracking-tighter text-black md:text-5xl lg:text-8xl lg:max-w-7xl">
                            Blog
                        </h1>
                    </div>
                </div>
            </section>


            <section className='relative'>
                <div className="ml-14 mb-2">
                    <h5 className="font-semibold">Filter: </h5>
                </div>
            </section>


            <section className='relative'>
                <div className="flex space-y-2 md:space-y-0 flex-col md:flex-row md:justify-between mx-8 mb-8">
                    <div className="ml-5">
                        <select
                            className="text-black block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option>--------</option>
                            {category.map((item, index) => (
                                <option key={index} value={item.category.en}>
                                    {item.category.en}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>


                    <div className="mr-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-9 ml-2 absolute opacity-30 text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>


                        <input
                            type="search"
                            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-black outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-black focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-black dark:placeholder:text-black pl-10"
                            id="exampleSearch"
                            placeholder="Search"
                            value={searchFilter}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto px-8 py-4">
                    {filteredData.map((post) => (
                        <div key={post._id} className="animate-fadeIn">
                            <Link href={`/blog-post/${post.slug}`} key={post._id}>
                                <div className="bg-white shadow-md rounded-md mx-5 border border-gray-200 overflow-hidden group transform transition duration-500 hover:bg-black hover:scale-105 ease-in">
                                    <img className="w-full rounded-t-md max-h-48 object-cover" src={transformSanityImage(post.image.asset._ref)} alt={post.title.en} />
                                    <div className="p-4">
                                        <div className="flex mb-3">
                                            <div className="font-semibold rounded-full py-1 px-4 bg-orange-200 text-sm text-gray-800 outline outline-orange-200 outline-offset-2 outline-2">
                                                {post.category?.category?.en || 'No Category'}
                                            </div>
                                        </div>
                                        <h5 className="font-bold text-xl mt-7 group-hover:text-white text-black">{transform(post.title.en, 10)}</h5>
                                        <div className="mt-2 text-gray-700 text-base break-words group-hover:text-white">
                                            {post.content && post.content.en && post.content.en.content && Array.isArray(post.content.en.content) ? (
                                                post.content.en.content.map((block) => {
                                                    if (block.children) {
                                                        return block.children.map((child, index) => (
                                                            <p key={block._key || index}>{transform(child.text, 100)}</p>
                                                        ));
                                                    } else {
                                                        return null;
                                                    }
                                                })
                                            ) : (
                                                'No content available'
                                            )}
                                        </div>
                                        <div className="flex mt-8 justify-end">
                                            <p className="group-hover:text-white text-black">
                                                {post._createdAt
                                                    ? format(new Date(Date.parse(post._createdAt)), 'MMMM dd, yyyy')
                                                    : post._createdAt
                                                        ? format(new Date(Date.parse(post._createdAt)), 'MMMM dd, yyyy')
                                                        : 'Invalid Date'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div >
    );
};

export default Blog;