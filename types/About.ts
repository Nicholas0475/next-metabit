export type About = {
  _id: string;
  ourMissionTitle: LocaleString;
  ourMissionContent: LocaleRichText;
  expertise: ExpertiseSection;
  ourTeamSectionTitle: LocaleString;
  companyProfile: CompanyProfile;
};

type LocaleString = {
  [key: string]: string;
  // You can add more properties for other languages if needed
};

type LocaleRichText = {
  [key: string]: {
    content: LocaleRichTextContent[];
  };
  // You can add more properties for other languages if needed
};

type LocaleRichTextContent = {
  _type: string;
  style: string;
  _key: string;
  markDefs: Array<any>; // You might need to define the markDefs type
  children: Array<{ text: string }>;
};

type ExpertiseSection = {
  image: Image;
  title: LocaleString;
  text: LocaleString;
  businessValues: BusinessValue[];
};

type BusinessValue = {
  icon: Image;
  title: LocaleString;
  description: LocaleString;
};

type CompanyProfile = {
  sectionTitle: LocaleString;
  jpOffice: Office;
  MYOffice: Office;
};

type Office = {
  officeTitle: LocaleString;
  companyName: string;
  companyAddress: string;
  companyManagement: LocaleTextArea;
  companyBusinessDescription: LocaleTextArea;
  companyRegisterNumber?: string; // Optional field
  incorporationDate?: string; // Optional field (you can use a Date type if needed)
};

type LocaleTextArea = {
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
