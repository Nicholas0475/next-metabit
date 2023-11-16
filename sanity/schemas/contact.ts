export default {
    name: 'contact',
    type: 'document',
    title: 'Contact Page',
    fields: [
        {
            name: 'joinUsPage',
            title: 'Join Us Title',
            type: 'localeString',
        },
        {
            name: 'businessOpportunitySection',
            title: 'Business Opportunity Section',
            type: 'object',
            options: { collapsible: true },
            fields : [
                {
                    name: 'sectionTitle',
                    type: 'localeString',
                    title: 'Section Title',
                },
                {
                    name: 'sectionText',
                    type: 'localeString',
                    title: 'Section Text',
                },
                {
                    name: 'officeAddress',
                    type: 'string',
                    title: 'Address',
                },
                {
                    name: 'email',
                    type: 'string',
                    title: 'Email',
                },
                
            ]
        },
        {
            name: 'joinUsSection',
            type: 'object',
            title: 'Join Us Section',
            options: { collapsible: true },
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'localeString',
                },
                {
                    name: 'text',
                    title: 'Section Text',
                    type: 'localeString',
                },
                {
                    name: 'bgImage',
                    title: 'Section Image',
                    type: 'image',
                },
                {
                    name: 'positions',
                    title: 'Positions',
                    type: 'array',
                    of: [
                        {
                            name: 'position',
                            title: 'Position',
                            type: 'object',
                            fields: [
                                {
                                    name: 'positionTitle',
                                    type: 'localeString',
                                    title: 'Position Title',
                                },
                                {
                                    name: 'positionDescription',
                                    type: 'localeRichText',
                                    title: 'Position Description',
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'positionTitle.en',
                                }
                            }
                        }
                    ]
                },
            ]

        },
        {
            name: 'connectSection',
            title: 'Connect With Us Section',
            type: 'object',
            options: { collapsible: true },
            fields: [
                {
                    name: 'sectionHeader',
                    title: 'Section Header',
                    type: 'localeString',
                },
                {
                    name: 'sectionText',
                    title: 'Section Text',
                    type: 'localeString',
                },
                {
                    name: 'buttonText',
                    title: 'Social Media Button Text',
                    type: 'localeString',
                },
                {
                    name: 'socialMediaLinks',
                    title: "Social Media Links",
                    type: 'object',
                    options: { collapsible: true },
                    fields : [
                        {
                            name: 'facebook',
                            type: 'url',
                            title: 'Facebook',
                        },
                        {
                            name: 'instagram',
                            type: 'url',
                            title: 'Instagram',
                        },
                        {
                            name: 'twitter',
                            type: 'url',
                            title: 'Twitter',
                        },
                        {
                            name: 'linkedin',
                            type: 'url',
                            title: 'LinkedIn',
                        },
                        {
                            name: 'tiktok',
                            type: 'url',
                            title: 'Tiktok',
                        },
                        {
                            name: 'github',
                            type: 'url',
                            title: 'Github',
                        },
                    ]
                },
            ]
        },

    ],
    preview: {
        prepare: () => ({ title: 'Contact Page' })
    }
}