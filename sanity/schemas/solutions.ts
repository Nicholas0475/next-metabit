export default {
    name: 'solutions',
    type: 'document',
    title: 'Solutions',
    fields: [
        {
            name: 'solutionsPageHeader',
            type: 'localeString',
            title: 'Solutions Page Header',
        },
        {
            name: 'aboutCrypto',
            type: 'object',
            title: 'About Crypto',
            options: { collapsible: true },
            fields: [
                {
                    name: 'aboutCryptoName',
                    type: 'localeString',
                    title: 'About Crypto Asset Section Name',
                },
                {
                    name: 'aboutCryptoTitle',
                    type: 'localeString',
                    title: 'About Crypto Title',
                },
                {
                    name: 'aboutCryptoText',
                    type: 'localeTextArea',
                    title: 'About Crypto Text',
                },
                {
                    name: 'aboutCryptoNFTImage',
                    type: 'array',
                    title: 'NFT Images',
                    of: [{type: 'image'}],
                }
            ]
        },
        {
            name: 'nftDataStructure',
            type: 'object',
            title: 'NFT Data Structure Section',
            options: { collapsible: true },
            fields: [
                {
                    name: 'nftDsTitle',
                    type: 'localeString',
                    title: 'NFT Data Structure Section Title',
                },
                {
                    name: 'nftExample',
                    type: 'object',
                    title: 'NFT Example',
                    fields: [
                        {
                            name: 'nftName',
                            type: 'localeString',
                            title: 'NFT Name',
                        },
                        {
                            name: 'nftDescription',
                            type: 'localeTextArea',
                            title: 'NFT Description',
                        },
                        {
                            name: 'nftPrice',
                            type: 'number',
                            title: 'NFT Price',
                        },
                        {
                            name: 'nftRemTime',
                            type: 'localeString',
                            title: 'NFT Sale Remaining Time'
                        },
                        {
                            name: 'nftCreatorBadge',
                            type: 'image',
                            title: 'NFT Creator Badge Image',
                        },
                        {
                            name: 'nftCreatedByText',
                            type: 'localeString',
                            title: 'NFT Created By Text'
                        },
                        {
                            name: 'nftCreator',
                            type: 'localeString',
                            title: 'NFT Creator'
                        },
                    ]
                },
                {
                    name: 'contentDataTable',
                    type: 'object',
                    title: 'Content Data table',
                    options: { collapsible: true },
                    fields: [
                        {
                            name: 'contentData',
                            type: 'object',
                            title: 'Content Data',
                            options: { collapsible: true },
                            fields: [
                                {
                                    name: 'key',
                                    title: 'Key',
                                    type: 'localeString',
                                },
                                {
                                    name: 'value',
                                    title: 'Value',
                                    type: 'localeString',
                                }
                            ]
                        },
                        {
                            name: 'uploadedContentData',
                            type: 'object',
                            title: 'Uploaded Content Data',
                            options: { collapsible: true },
                            fields: [
                                {
                                    name: 'key',
                                    title: 'Key',
                                    type: 'localeString',
                                },
                                {
                                    name: 'value',
                                    title: 'Value',
                                    type: 'localeString',
                                },
                                {
                                    name: 'image',
                                    title: 'Example Image',
                                    type: 'image',
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'metaDataTable',
                    type: 'array',
                    title: 'Meta Data table',
                    options: { collapsible: true },
                    of: [
                        {
                            type: 'object',
                            name: 'keyValueStr',
                            title: 'Table Entry with Key and String',
                            fields: [
                                {
                                    name: 'key',
                                    title: 'Key',
                                    type: 'localeString',
                                },
                                {
                                    name: 'value',
                                    title: 'Value',
                                    type: 'localeString',
                                }
                            ],
                            preview: {
                                select: {
                                    title: 'key.en',
                                    subtitle: 'value.en',
                                },
                            }
                        },
                        {
                            type: 'object',
                            name: 'keyValueTextArea',
                            title: 'Table Entry with Key and Text Area',
                            fields: [
                                {
                                    name: 'key',
                                    title: 'Key',
                                    type: 'localeString',
                                },
                                {
                                    name: 'value',
                                    title: 'Value',
                                    type: 'localeTextArea',
                                }
                            ],
                            preview: {
                                select: {
                                    title: 'key.en',
                                    subtitle: 'value.en',
                                },
                            }
                        },
                    ]
                },
                {
                    name: 'IndexData',
                    type: 'array',
                    title: 'Index Data table',
                    options: { collapsible: true },
                    of: [
                        {
                            type: 'object',
                            name: 'keyValueStr',
                            title: 'Table Entry with Key and String',
                            fields: [
                                {
                                    name: 'key',
                                    title: 'Key',
                                    type: 'localeString',
                                },
                                {
                                    name: 'value',
                                    title: 'Value',
                                    type: 'localeString',
                                }
                            ],
                            preview: {
                                select: {
                                    title: 'key.en',
                                    subtitle: 'value.en',
                                },
                            }
                        },
                        {
                            type: 'object',
                            name: 'keyValueTextArea',
                            title: 'Table Entry with Key and Text Area',
                            fields: [
                                {
                                    name: 'key',
                                    title: 'Key',
                                    type: 'localeString',
                                },
                                {
                                    name: 'value',
                                    title: 'Value',
                                    type: 'localeTextArea',
                                }
                            ],
                            preview: {
                                select: {
                                    title: 'key.en',
                                    subtitle: 'value.en',
                                },
                            }
                        },
                    ]
                },
                {
                    name: 'offChainText',
                    type: 'localeString',
                    title: 'Off Chain Explanation Text',
                },
                {
                    name: 'onChainText',
                    type: 'localeString',
                    title: 'On Chain Explanation Text',
                },
                {
                    name: 'AboutCryptoAssetSection',
                    type: 'object',
                    title: 'About Crypto Asset Section',
                    options: { collapsible: true },
                    fields: [
                        {
                            name: 'sectionTitle',
                            type: 'localeString',
                            title: 'Section Title',
                        },
                        {
                            name: 'assetFeature',
                            type: 'array',
                            title: 'Feature of Crypto Assets',
                            of: [
                                {
                                    type: 'object',
                                    name: 'feature',
                                    title: 'Feature',
                                    fields: [
                                        {
                                            name: 'icon',
                                            type: 'image',
                                            title: 'Icon',
                                        },
                                        {
                                            name: 'featureName',
                                            type: 'localeString',
                                            title: 'Feature Name',
                                        },
                                        {
                                            name: 'description',
                                            type: 'localeTextArea',
                                            title: 'Description',
                                        },
                                    ],
                                    preview: {
                                        select: {
                                            title: 'featureName.en',
                                            media: 'icon',
                                        },
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'nftMarketSizeSection',
                    type: 'object',
                    title: 'NFT Market Size Section',
                    options: { collapsible: true },
                    fields: [
                        {
                            name: 'sectionTitle',
                            type: 'localeString',
                            title: 'Section Title'
                        },
                        {
                            name: 'sizeList',
                            type: 'array',
                            title: 'Size List',
                            of: [
                                {
                                    type: 'object',
                                    name: 'size',
                                    title: 'Size',
                                    fields: [
                                        {
                                            name: 'text',
                                            type: 'localeString',
                                            title: 'Text',
                                        },
                                        {
                                            name: 'sizeIcon',
                                            type: 'image',
                                            title: 'Market Size Icon'
                                        }
                                    ],
                                    preview: {
                                        select: {
                                            title: 'text.en',
                                            media: 'sizeIcon',
                                        },
                                    }
                                }
                            ],
                        },
                        {
                            name: 'nftUsesText',
                            title: 'NFT Uses Text',
                            type: 'localeString',
                        },
                        {
                            name: 'businessUseCase',
                            title: 'Business Use Cases',
                            type: 'array',
                            of: [{type: 'localeString'}]
                        },
                    ]
                },
                {
                    name: 'worldOfNftSection',
                    type: 'object',
                    title: 'World of NFT Section',
                    options: { collapsible: true },
                    fields: [
                        {
                            name: 'sectionTitle',
                            type: 'localeString',
                            title: 'Section Title',
                        },
                        {
                            name: 'sectionText',
                            type: 'localeRichText',
                            title: 'Section Text'
                        },
                        {
                            name: 'nftTypes',
                            type: 'array',
                            title: 'NFT Types',
                            of: [
                                {
                                    name: 'nftType',
                                    title: 'Type',
                                    type: 'object',
                                    fields: [
                                        {
                                            name: 'name',
                                            type: 'localeString',
                                            title: 'Name',
                                        },
                                        {
                                            name: 'image',
                                            type: 'image',
                                            title: 'Image',
                                        },
                                    ],
                                    preview: {
                                        select: {
                                            title: 'name.en',
                                            media: 'image',
                                        }
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'securityTokenSection',
                    type: 'object',
                    title: 'Security Token Section',
                    options: { collapsible: true },
                    fields: [
                        {
                            name: 'title',
                            type: 'localeString',
                            title: 'Title'
                        },
                        {
                            name: 'securityTokenText',
                            type: 'localeRichText',
                            title: 'Security Token Explanation'
                        },
                        {
                            name: 'securityTokenTable',
                            type: 'array',
                            title: 'Security Token Comparison Table',
                            of: [
                                {
                                    type: 'object',
                                    name: 'entry',
                                    title: 'Table Entry',
                                    fields: [
                                        {
                                            name: 'key',
                                            type: 'localeString',
                                            title: 'Key',
                                        },
                                        {
                                            name: 'stoValue',
                                            type: 'localeString',
                                            title: 'STO',
                                        },
                                        {
                                            name: 'icoValue',
                                            type: 'localeString',
                                            title: 'ICO',
                                        },
                                    ],
                                    preview: {
                                        select: {
                                            title: 'key.en',
                                        }
                                    }
                                }
                            ]
                        },
                    ]
                },
            ]
        }
    ],
    preview: {
        prepare: () => ({ title: 'Solutions Page' })
    }
}