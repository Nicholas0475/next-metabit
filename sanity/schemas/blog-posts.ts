export default {
    name: 'blogPosts',
    title: 'Blog Posts',
    type: 'document',
    fields: [
        {
            name: 'title',
            type: 'localeString',
            title: 'Post Title'
        },
        {
            name: 'category',
            type: 'reference',
            title: 'Post Category',
            to: [{type: 'postCategory'}]
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug (for use in link, max length 200, no spaces)',
            options: {
                source: 'title.en',
                maxLength: 200,
                slugify: (inputStr: string) => inputStr.toLowerCase().split(' ').join('-').slice(0, 200)
            }
        },
        {
            name: 'image',
            type: 'image',
            title: 'Post Image',
        },
        {
            name: 'content',
            type: 'localeRichText',
            title: 'Post Content',
        },
    ],
    preview: {
        select: {
            title: 'title.en',
            subtitle: 'category.category.en',
            media: 'image',
        }
    }
}