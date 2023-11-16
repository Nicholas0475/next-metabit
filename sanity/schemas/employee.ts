import { orderRankField } from "@sanity/orderable-document-list";

export default {
    name: 'employeeList',
    title: 'Employee List',
    type: 'document',
    fields: [
        orderRankField({ type: "employeeList" }),
        {
            name: 'employeeBgImage',
            type: 'image',
            title: 'Employee\'s Background Image',
        },
        {
            name: 'employeeImage',
            type: 'image',
            title: 'Employee\'s Profile Image',
        },
        {
            name: 'name',
            type: 'object',
            title: 'Employee\'s name',
            fields: [
                {
                    name: 'firstName',
                    type: 'string',
                    title: 'First Name',
                },
                {
                    name: 'lastName',
                    type: 'string',
                    title: 'Last Name',
                },
            ]
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug (for use in link, max length 200, no spaces)',
            options: {
                source: 'name',
                maxLength: 200,
                slugify: (inputStr: string) => inputStr.toLowerCase().replace(' ', '-').slice(0, 200)
            }
        },
        {
            name: 'position1',
            type: 'localeString',
            title: 'Position 1',
        },
        {
            name: 'position2',
            type: 'localeString',
            title: 'Position 2',
        },
        {
            name: 'description',
            type: 'localeRichText',
            title: 'Description',
        },
        {
            name: 'phoneNumber',
            type: 'string',
            title: 'Phone Number',
        },
        {
            name: 'email',
            type: 'string',
            title: 'Email address',
        },
        {
            name: 'workAddress',
            type: 'string',
            title: 'Work Address',
        },
        {
            name: 'socialMediaLinks',
            type: 'object',
            title: 'Social Media Links',
            options: { collapsible: true },
            fields: [
                {
                    name: 'facebook',
                    type: 'string',
                    title: 'Facebook',
                },
                {
                    name: 'twitter',
                    type: 'string',
                    title: 'Twitter',
                },
                {
                    name: 'instagram',
                    type: 'string',
                    title: 'Instagram',
                },
                {
                    name: 'website',
                    type: 'string',
                    title: 'Website',
                },
                {
                    name: 'tiktok',
                    type: 'string',
                    title: 'Tiktok',
                },
                {
                    name: 'linkedin',
                    type: 'string',
                    title: 'LinkedIn',
                },
                {
                    name: 'github',
                    type: 'string',
                    title: 'Github',
                },
            ]
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'position1.en',
            media: 'employeeImage'
        },
        prepare(selection: any) {
            const {title, subtitle, media} = selection
            return {
              title: [title.firstName, title.lastName].join(' '),
              subtitle: subtitle,
              media: media
            }
          }
    }

}