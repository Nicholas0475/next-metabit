export type Contact = {
  _id: string;
  joinUsPage: LocaleString;
  businessOpportunitySection: {
    sectionTitle: LocaleString;
    sectionText: LocaleString;
    officeAddress: string;
    email: string;
  };
  joinUsSection: {
    title: LocaleString;
    text: LocaleString;
    bgImage: Image;
    positions: Position[];
  };
  connectSection: {
    sectionHeader: LocaleString;
    sectionText: LocaleString;
    buttonText: LocaleString;
    socialMediaLinks: {
      facebook: string;
      instagram: string;
      twitter: string;
      linkedin: string;
      tiktok: string;
      github: string;
    };
  };
};

type Position = {
  positionTitle: LocaleString;
  positionDescription: LocaleRichText; // Define LocaleRichText as needed
};

type LocaleString = {
  [key: string]: string;
  // You can add more properties for other languages if needed
};

type Image = {
  _type: 'image';
  asset: {
    _ref: string;
  };
  // You can add more properties related to the image here if needed
};

type LocaleRichText = {
  [key: string]: {
    content: LocaleRichTextContent[];
  };
  // You can add more properties for other languages if needed
};

type LocaleRichTextContent = {
  _type: string;
  style: string; // You can define styles as needed, e.g., 'bold', 'italic', etc.
  _key: string;
  markDefs: Array<MarkDef>; // Define the markDefs type
  children: Array<{
    marks: string[]; // Use an array to allow multiple marks
    text: string;
  }>;
};

type MarkDef = {
  _type: string;
  someOtherProperty: string; // You can add other properties as needed
};
