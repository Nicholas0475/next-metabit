export type Home = {
  _id: string;
  homePageHead: {
    metabitLogo: Image;
    title1: LocaleString;
    title2: LocaleString;
    subtitle: LocaleString;
  };
  whoWeAre: {
    image: Image; // Assuming image is a URL
    title: LocaleString;
    description: LocaleString;
  };
  mission: {
    title: LocaleString;
    description: LocaleString;
  };
  whatWeDo: {
    WhatWeDoTitle: LocaleString;
    technology: {
      technologyHeader: LocaleString;
      backend: LocaleString;
      backendTechLogo: Image[];
      frontend: LocaleString;
      FrontendTechLogo: Image[];
      mobileDevelopment: LocaleString;
      mobileDevelopmentLogo: Image[];
    };
    roadmap: {
      roadmapHeader: LocaleString;
    };
  };
};

type LocaleString = {
  [key: string]: string;
};


type Image = {
  _type: 'image';
  asset: {
    _ref: string;
  };
  // You can add more properties related to the image here if needed
};
