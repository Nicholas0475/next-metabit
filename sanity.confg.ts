import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schemas";
import { visionTool } from "@sanity/vision";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
// Every time new singleton document added, add the name here!
// Make sure to create one document first before adding it here
const singletonTypes = new Set(["home", "projectPage", "about", "services", "solutions", "contact", "majorAchievement"])

// Orderable documents
const orderableTypes = new Set(["phases", "employeeList"]);

// Hidden documents (as in shouldn't be shown directly)
const hiddenTypes = new Set(["postCategory"]);

// lang settings

const supportedLanguages = [
  {id: 'en', title: 'English', isDefault: true},
  {id: 'jp', title: 'Japanese'},
  {id: 'zh', title: 'Simplified Chinese'},
  {id: 'ko', title: 'Korean'}
];

const baseLanguage = supportedLanguages.find(l => l.isDefault);

// custom Locale String type

const localeString = {
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations'
  }))
}

// custom locale rich text / portable text type

const localeRichText = {
  name: 'localeRichText',
  type: 'object',
  title: 'Localized RIch Text',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    }
  ],
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    type: 'object',
    title: lang.title,
    fieldset: lang.isDefault ? null : 'translations',
    fields: [{
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
                type: 'text',
                name: 'alt',
                title: 'Alternative text',
                description: `Some of your visitors cannot see images, 
                  be they blind, color-blind, low-sighted; 
                  alternative text is of great help for those 
                  people that can rely on it to have a good idea of 
                  what's on your page.`,
            }
        ]
        }
      ]
    }]
  }))
}

// Custom locale text area

const localeTextArea = {
  title: 'Localized Text',
  name: 'localeTextArea',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'text',
    fieldset: lang.isDefault ? null : 'translations'
  }))
}

const config = defineConfig({

    projectId: "eitw7pjp",
    dataset: "production",
    title: "metabit-website",
    name: 'default',
    // apiVersion: "2023-10-12",
    // useCdn: false,
    //basePath: "/desk",

    plugins: [deskTool({
        // For singleton document only SHOW that document
        // Else show everything
        structure: (S, context) => S.list()
            .title("Content")
            .items(
                (schemaTypes.filter(each => !hiddenTypes.has(each.name)).map(each =>
                    singletonTypes.has(each.name) ?
                    S.listItem().title(each.title).id(each.name).child(
                        S.document().schemaType(each.name).documentId(each.name)
                    )
                    : orderableTypes.has(each.name) ?
                    orderableDocumentListDeskItem({type: each.name, title: each.title, id: `orderable-${each.name}`, S, context})
                    :  S.documentTypeListItem(each.name).title(each.title))
            )
        )
    }), visionTool()],

    //Filter out singleton types from the global “New document” menu options
    schema: {
        types: [...schemaTypes, localeString, localeTextArea, localeRichText],
        templates: (templates) => templates.filter(({schemaType}: {schemaType: string}) => !singletonTypes.has(schemaType)),
    },

    // For singleton types, filter out actions that are not explicitly included
  // in the `singletonActions` list defined above
    document: {
        actions: (input: any[], context: {schemaType: string}) => (
            singletonTypes.has(context.schemaType) ?
            input.filter(({action} : {action: string}) => action && singletonActions.has(action)) :
            input
      ) ,
    }
})


export default config;