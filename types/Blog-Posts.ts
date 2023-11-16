import { BlogPostsCategory } from "./Blog-Posts-Category";

export type BlogPost = {
    _type: 'blogPosts'; // Type name
    _id: string; // ID field
    title: LocaleString; // Post Title
    category: BlogPostsCategory; // Post Category
    slug: string; // Slug (for use in links)
    image: Image; // Post Image
    content: LocaleRichText; // Post Content
    _createdAt: string; // Date created (optional)
    _updatedAt: string; // Date updated (optional)
};

// Define a LocaleString type explicitly
type LocaleString = {
    en: string; // Add the 'en' property for English content
    // You can add more properties for other languages if needed
};

// Define a Reference type for referencing other document types
type Reference = {
    _type: 'reference';
    _ref: string;
};

// Define a type for the image
type Image = {
    _type: 'image';
    asset: {
        _ref: string;
    };
    // You can add more properties related to the image here if needed
};

type LocaleRichText = {
    [key: string]: {
        content: LocaleRichTextContent[];
    };
    // You can add more properties for other languages if needed
};

type LocaleRichTextContent = {
    _type: string; // This can be 'image' for images
    style: string;
    _key: string;
    markDefs: Array<any>; // You might need to define the markDefs type
    children: Array<{
        text: string;
        image: Image;
    }>;
};

export default BlogPost;
