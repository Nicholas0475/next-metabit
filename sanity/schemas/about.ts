export default {
    name: 'about',
    type: 'document',
    title: 'About Page',
    fields: [
        {
            name: 'ourMissionTitle',
            type: 'localeString',
            title: 'Our Mission Title',
        },
        {
            name: 'ourMissionContent',
            type: 'localeRichText',
            title: 'Our Mission Content',
        },
        {
            name: 'expertise',
            type: 'object',
            title: 'Expertise Section',
            fields: [
                {
                    name: 'image',
                    type: 'image',
                    title: 'Expertise Image'
                },
                {
                    name: 'title',
                    type: 'localeString',
                    title: 'Expertise Section Title',
                },
                {
                    name: 'text',
                    type: 'localeString',
                    title: 'Expertise Section Text'
                },
                {
                    name: 'businessValues',
                    type: 'array',
                    title: 'Business Values',
                    of: [
                        {
                            name: 'value',
                            type: 'object',
                            title: 'Value',
                            fields: [
                                {
                                    name: 'icon',
                                    type: 'image',
                                    title: 'Icon',
                                },
                                {
                                    name: 'title',
                                    type: 'localeString',
                                    title: 'Title',
                                },
                                {
                                    name: 'description',
                                    type: 'localeString',
                                    title: 'description',
                                }
                            ],
                            preview: {
                                select: {
                                    title: 'title.en',
                                    media: 'icon',
                                }
                            }
                        }
                    ],
                    
                    
                }
            ]
        },
        {
            name: 'ourTeamSectionTitle',
            title: 'Our Teams Section Title',
            type: 'localeString',
        },
        {
            name: 'companyProfile',
            type: 'object',
            title: 'Company Profile',
            fields: [
                {
                    name: 'sectionTitle',
                    title: 'Company Profile Section Title',
                    type: 'localeString'
                },
                {
                    name: 'jpOffice',
                    type: 'object',
                    title: 'JP Office Title',
                    fields: [
                        {
                            name: 'officeTitle',
                            type: 'localeString',
                            title: 'Office Title',
                        },
                        {
                            name: 'companyName',
                            type: 'string',
                            title: 'Company Name',
                        },
                        {
                            name: 'companyAddress',
                            type: 'string',
                            title: 'Address',
                        },
                        {
                            name: 'companyManagement',
                            type: 'localeTextArea',
                            title: 'Management',
                        },
                        {
                            name: 'companyBusinessDescription',
                            type: 'localeTextArea',
                            title: 'Description for Business',
                        },
                    ]
                },
                {
                    name: 'MYOffice',
                    type: 'object',
                    title: 'MY Office Title',
                    fields: [
                        {
                            name: 'officeTitle',
                            type: 'localeString',
                            title: 'Office Title',
                        },
                        {
                            name: 'companyName',
                            type: 'string',
                            title: 'Company Name',
                        },
                        {
                            name: 'companyRegisterNumber',
                            type: 'string',
                            title: 'Register Number',
                        },
                        {
                            name: 'companyAddress',
                            type: 'string',
                            title: 'Address',
                        },
                        {
                            name: 'companyManagement',
                            type: 'localeTextArea',
                            title: 'Management',
                        },
                        {
                            name: 'incorporationDate',
                            type: 'date',
                            title: 'Incorporation Date',
                        },
                        {
                            name: 'companyBusinessDescription',
                            type: 'localeTextArea',
                            title: 'Description for Business',
                        },
                    ]
                }
            ]
        }
    ],
    preview: {
        prepare: () => ({ title: 'About Page' })
    }
}