interface DownloadVCardProps {
  vCardData: string;
}

export default function DownloadVCard({ vCardData }: DownloadVCardProps) {
  const downloadVCard = () => {
    const vCardBlob = new Blob([vCardData], { type: 'text/vcard' });
    const vCardUrl = window.URL.createObjectURL(vCardBlob);
    const a = document.createElement('a');
    a.href = vCardUrl;
    a.download = 'employee.vcf';
    a.click();
    window.URL.revokeObjectURL(vCardUrl);
  };

  return (
    <button onClick={downloadVCard}></button>
  );
}
