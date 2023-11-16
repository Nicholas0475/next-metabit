export type Services = {
    _id: string;
    servicesHeader: LocaleString;
    services: {
      sectionName: LocaleString;
      sectionTitle: LocaleString;
      exploreButtonText: LocaleString;
    };
    solutionSection: {
      sectionTitle: LocaleString;
      sectionDescription: LocaleString;
      solutions: Solution[];
    };
  };

  type LocaleString = {
    [key: string]: string;
    // Add properties for other languages if needed
  };
  
  type Image = {
    _type: 'image';
    asset: {
      _ref: string;
    };
    // Add more image properties if needed
  };

  type Solution = {
    solutionIcon: Image;
    solutionTitle: LocaleString;
    solutionDescription: LocaleString;
  };
  