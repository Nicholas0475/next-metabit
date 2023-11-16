export default {
    name: 'projectPage',
    type: 'document',
    title: 'Projects Page',
    fields: [
        {
            name: 'title',
            type: 'localeString',
            title: 'Title',
        },
        {
            name: 'projects',
            type: 'array',
            title: 'Projects',
            of: [{
                name: 'project',
                type: 'object',
                fields: [
                    {
                        name: 'projectName',
                        type: 'string',
                        title: 'Project Name',
                    },
                    {
                        name: 'projectDescription',
                        type: 'localeTextArea',
                        title: 'Project Description',
                    },
                    {
                        name: 'projectImg',
                        type: 'image',
                        title: 'Project Image',
                    },
                    {
                        name: 'projectUrl',
                        type: 'string',
                        title: 'Project URL',
                    }
                ],
                preview: {
                    select: {
                        title: 'projectName',
                        media: 'projectImg',
                    }
                }
                
                
            }]
        },
        {
            name: 'seeMore',
            type: 'localeString',
            title: 'See More'
        }
    ],
    preview: {
        prepare: () => ({ title: 'Projects Page' })
    }
}