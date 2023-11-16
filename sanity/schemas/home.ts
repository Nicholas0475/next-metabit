const home = {
    name: 'home',
    type: 'document',
    title: 'Home',
    fields: [
        {
            name: 'homePageHead',
            type: 'object',
            title: 'Home Page Head',
            options: { collapsible: true },
            fields: [
                {
                    name: 'metabitLogo',
                    type: 'image',
                    title: 'Metabit Logo',
                },
                {
                    name: 'title1',
                    type: 'localeString',
                    title: 'Title 1',
                },
                {
                    name: 'title2',
                    type: 'localeString',
                    title: 'Title 2',
                },
                {
                    name: 'subtitle',
                    type: 'localeString',
                    title: 'Subtitle',
                }
            ]
        },
        {
            name: 'whoWeAre',
            type: 'object',
            title: 'Who we are',
            options: { collapsible: true },
            fields: [
                {
                    name: 'image',
                    type: 'image',
                    title: 'Who we are Image',
                },
                {
                    name: 'title',
                    type: 'localeString',
                    title: 'Title',
                },
                {
                    name: 'description',
                    type: 'localeString',
                    title: 'Who we are description',
                }
            ]
        },
        {
            name: 'mission',
            type: 'object',
            title: 'Our Mission',
            options: { collapsible: true },
            fields: [
                {
                    name: 'title',
                    type: 'localeString',
                    title: 'Title',
                },
                {
                    name: 'description',
                    type: 'localeString',
                    title: 'Description',
                }
                // Maybe add our ceo data here, or  that will be an entirely different
                // schema. to discuss.
            ]
        },
        {
            name: 'whatWeDo',
            type: 'object',
            title: 'What Do We Do',
            options: { collapsible: true },
            fields: [
                {
                    name: 'WhatWeDoTitle',
                    type: 'localeString',
                    title: 'What Do We Do Title',
                },
                {
                    name: 'technology',
                    type: 'object',
                    title: 'Technology',
                    options: { collapsible: true },
                    fields: [
                        {
                            name: 'technologyHeader',
                            type: 'localeString',
                            title: 'Technology Header',
                        },
                        {
                            name: 'backend',
                            type: 'localeString',
                            title: 'Backend title'
                        },
                        {
                            name: 'backendTechLogo',
                            type: 'array',
                            title: 'Backend Technology Logos',
                            of: [{type: 'image'}]
                        },
                        {
                            name: 'frontend',
                            type: 'localeString',
                            title: 'Frontend title'
                        },
                        {
                            name: 'FrontendTechLogo',
                            type: 'array',
                            title: 'Frontend Technology Logos',
                            of: [{type: 'image'}]
                        },
                        {
                            name: 'mobileDevelopment',
                            type: 'localeString',
                            title: 'Mobile Development Title'
                        },
                        {
                            name: 'mobileDevelopmentLogo',
                            type: 'array',
                            title: 'Mobile Development Logos',
                            of: [{type: 'image'}]
                        },
                    ]
                },
                {
                    name: 'roadmap',
                    type: 'object',
                    title: 'Roadmap',
                    options: { collapsible: true },
                    fields: [
                        {
                            name: 'roadmapHeader',
                            type: 'localeString',
                            title: 'Roadmap Header',
                        },
                    ]
                }
            ]
        }
    ],
    preview: {
        prepare: () => ({ title: 'Home Page' })
    }
}

export default home;