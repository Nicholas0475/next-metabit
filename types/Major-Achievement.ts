export type MajorAchievement = {
    _id: string;
    majorAchievementTitle: LocaleString;
    majorAchievementImages: Image[];
  };
  
  type LocaleString = {
    [key: string]: string;
    // Add more properties for other languages if needed
  };
  
  type Image = {
    _type: 'image';
    asset: {
      _ref: string;
    };
    // You can add more properties related to the image here if needed
  };
  