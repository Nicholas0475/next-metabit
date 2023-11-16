export type BlogPostsCategory = {
    _id: string;
    category: LocaleString;
    _createdAt?: string;
}

type LocaleString = {
    en: string;
    // You can add more properties for other languages if needed
};