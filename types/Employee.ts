export type Employee = {
  _type: "employeeList"; // Type name
  _id: string; // ID field
  employeeBgImage: Image; // URL to the employee's background image
  employeeImage: Image; // URL to the employee's profile image
  name: {
    firstName: string; // First name
    lastName: string; // Last name
  };
  slug: string
  position1: LocaleString; // Position 1
  position2: LocaleString; // Position 2
  description: LocaleRichText; // Description
  phoneNumber: string; // Phone number
  email: string; // Email address
  workAddress: string; // Work address
  socialMediaLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    website: string;
    tiktok: string;
    linkedin: string;
    github: string;
  };
  _createdAt: string; // Date created (optional)
  _updatedAt: string; // Date updated (optional)
};

// Define a LocaleString type explicitly
type LocaleString = {
  [key: string]: string; // Add the 'en' property for English content
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

type Image = {
  _type: 'image';
  asset: {
    _ref: string;
  };
  // You can add more properties related to the image here if needed
};


export default Employee;
