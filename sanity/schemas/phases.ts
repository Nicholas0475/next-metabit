import { orderRankField } from "@sanity/orderable-document-list";

export default {
    name: 'phases',
    title: 'Phases',
    type: 'document',
    fields: [
        orderRankField({ type: "phases" }),
        {
            name: 'phaseName',
            type: 'localeString',
            title: 'Phase Name',
        },
        {
            name: 'phaseHeader',
            type: 'localeString',
            title: 'Phase Header',
        },
        {
            name: 'phaseSubHeader',
            type: 'localeString',
            title: 'Phase Sub-header',
        },
        {
            name: 'phaseTextArea',
            type: 'localeTextArea',
            title: 'Phase Text',
        },
    ],
    preview: {
        select: {
            title: 'phaseName.en',
        },
    }

}