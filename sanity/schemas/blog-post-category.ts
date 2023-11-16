export default {
    name: 'postCategory',
    type: 'document',
    title: 'Post Category',
    fields: [
        {
            name: 'category',
            title: 'Category',
            type: 'localeString',
        }
    ],
    preview: {
        select: {
            title: 'category.en',
        }
    }
}