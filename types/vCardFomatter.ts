// vCardFormatter.ts

export interface VCard {
    // Define the structure of the VCard
    name: {
      firstNames: string;
      lastNames: string;
    };
    telephone: {
      value: string;
      param: {
        type: string;
      };
    }[];
    email: {
      value: string;
      param: {
        type: string;
      };
    }[];
    // Add other VCard properties as needed
  }
  
  export enum VCardEncoding {
    // Define possible encodings if needed
    UTF8 = 'utf8',
    // Add other encodings as needed
  }
  
  export class VCardFormatter {
    static getVCardAsBlob(vCard: VCard, encoding?: VCardEncoding): Blob {
      // Example: Generate a Blob from the VCard data
      const vCardString = JSON.stringify(vCard); // Convert VCard to a JSON string
      const blob = new Blob([vCardString], { type: 'application/vcard' }); // Create a Blob
  
      return blob; // Return the Blob
    }
  
    static getVCardAsString(vCard: VCard, encodingPrefix?: VCardEncoding): string {
      // Example: Generate a VCard string from the VCard data
      const vCardString = `BEGIN:VCARD\nVERSION:3.0\nFN:${vCard.name.firstNames} ${vCard.name.lastNames}\nTEL;TYPE=WORK:${vCard.telephone[0].value}\nEMAIL;TYPE=HOME:${vCard.email[0].value}\nEND:VCARD`;
  
      return vCardString; // Return the VCard string
    }
  }
  
  