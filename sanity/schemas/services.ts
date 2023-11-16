export default {
    name: 'services',
    title: 'Services',
    type: 'document',
    fields: [
        {
            name: 'servicesHeader',
            title: 'Services Page Header',
            type: 'localeString',
        },
        {
            name: 'services',
            title: 'Services Section',
            type: 'object',
            options: { collapsible: true },
            fields: [
                {
                    name: 'sectionName',
                    title: 'Section Name',
                    type: 'localeString',
                },
                {
                    name: 'sectionTitle',
                    title: 'Section Title',
                    type: 'localeString'
                },
                {
                    name: 'exploreButtonText',
                    title: 'Explore Button Text',
                    type: 'localeString',
                }
            ]
        },
        {
            name: 'solutionSection',
            title: 'Solutions Section',
            type: 'object',
            options: { collapsible: true },
            fields: [
                {
                    name: 'sectionTitle',
                    title: 'Section Title',
                    type: 'localeString',
                },
                {
                    name: 'sectionDescription',
                    title: 'Section Description',
                    type: 'localeString'
                },
                {
                    name: 'solutions',
                    title: 'Solutions',
                    type: 'array',
                    of: [
                        {
                            name: 'solution',
                            title: 'Solution',
                            type: 'object',
                            fields: [
                                {
                                    name: 'solutionIcon',
                                    title: 'Solution Icon',
                                    type: 'image',
                                },
                                {
                                    name: 'solutionTitle',
                                    title: 'Solution Title',
                                    type: 'localeString',
                                },
                                {
                                    name: 'solutionDescription',
                                    title: 'Solution Description',
                                    type: 'localeTextArea',
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'solutionTitle.en',
                                    media: 'solutionIcon',
                                }
                            }
                        }
                    ],
                }
            ]
        },
    ],
    preview: {
        prepare: () => ({ title: 'Services Page' })
    }
    
}