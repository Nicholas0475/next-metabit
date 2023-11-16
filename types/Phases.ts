export type Phases = {
    _id: string;
    phaseName: LocaleString;
    phaseHeader: LocaleString;
    phaseSubHeader: LocaleString;
    phaseTextArea: LocaleTextArea;
  };
  
  type LocaleString = {
    [key: string]: string;
    // Add more properties for other languages if needed
  };
  
  type LocaleTextArea = {
    [key: string]: string;
    // Add more properties for other languages if needed
  };
  