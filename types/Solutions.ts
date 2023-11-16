export type Solutions = {
  _type: 'document';
  _id: string;
  name: string;
  type: string;
  title: LocaleString;
  solutionsPageHeader: LocaleString;
  aboutCrypto: AboutCrypto;
  nftDataStructure: NFTDataStructure;
  // Define other fields as needed
};

type AboutCrypto = {
  aboutCryptoName: LocaleString;
  aboutCryptoTitle: LocaleString;
  aboutCryptoText: LocaleString;
  aboutCryptoNFTImage: Image[];
};

type NFTDataStructure = {
  nftDsTitle: LocaleString;
  nftExample: NFTExample;
  contentDataTable: ContentDataTable;
  metaDataTable: KeyValueEntry[];
  IndexData: KeyValueEntry[];
  offChainText: LocaleString;
  onChainText: LocaleString;
  AboutCryptoAssetSection: AboutCryptoAssetSection;
  nftMarketSizeSection: NFTMarketSizeSection;
  worldOfNftSection: WorldOfNFTSection;
  securityTokenSection: SecurityTokenSection;
};

type NFTExample = {
  nftName: LocaleString;
  nftDescription: LocaleString;
  nftPrice: number;
  nftRemTime: LocaleString;
  nftCreatorBadge: Image;
  nftCreatedByText: LocaleString;
  nftCreator: LocaleString;
};

type ContentDataTable = {
  contentData: KeyValueEntry;
  uploadedContentData: UploadedContentDataEntry;
};

type KeyValueEntry = {
  key: LocaleString;
  value: LocaleString;
};

type UploadedContentDataEntry = {
  key: LocaleString;
  value: LocaleString;
  image: Image;
};

type AboutCryptoAssetSection = {
  sectionTitle: LocaleString;
  assetFeature: Feature[];
};

type Feature = {
  icon: Image;
  featureName: LocaleString;
  description: LocaleString;
};

type NFTMarketSizeSection = {
  sectionTitle: LocaleString;
  sizeList: SizeEntry[];
  nftUsesText: LocaleString;
  businessUseCase: LocaleString[];
};

type SizeEntry = {
  text: LocaleString;
  sizeIcon: Image;
};

type WorldOfNFTSection = {
  sectionTitle: LocaleString;
  sectionText: LocaleRichText;
  nftTypes: NFTType[];
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


type NFTType = {
  name: LocaleString;
  image: Image;
};

type SecurityTokenSection = {
  title: LocaleString;
  securityTokenText: LocaleRichText;
  securityTokenTable: SecurityTokenEntry[];
};

type SecurityTokenEntry = {
  key: LocaleString;
  stoValue: LocaleString;
  icoValue: LocaleString;
};

type Image = {
  _type: 'image';
  asset: {
    _ref: string;
    // Add more properties related to the image if needed
  };
};

type LocaleString = {
  [key: string]: string;
  // Add properties for other languages if needed
};

