export type Projects = {
    _id: string;
    title: LocaleString;
    projects: Project[];
    seeMore: LocaleString;
  };
  
  type LocaleString = {
    [key: string]: string;
    // You can add properties for other languages if needed
  };
  
  type Project = {
    projectName: string;
    projectDescription: LocaleTextArea;
    projectImg: Image;
    projectUrl: string;
  };
  
  type LocaleTextArea = {
    [key: string]: string;
    // You can add properties for other languages if needed
  };
  
  type Image = {
    _type: 'image';
    asset: {
      _ref: string;
    };
    // You can add more properties related to the image here if needed
  };
  