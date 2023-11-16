export default {
    name: 'majorAchievement',
    type: 'document',
    title: 'Major Achievement',
    fields: [
        {
            name: 'majorAchievementTitle',
            type: 'localeString',
            title: 'Major Achievement Title',
        },
        {
            name: 'majorAchievementImages',
            type: 'array',
            title: 'Major Achievement Images',
            of: [{type: 'image'}],
        },
    ],
    preview: {
        prepare: () => ({ title: 'Major Achievements' })
    }
}