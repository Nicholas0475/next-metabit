import Image from 'next/image';


const Logo = () => (
  
    <Image
      src="/logo2.png" // Adjust the path based on your file structure
      alt="Logo"
      width={50} // Set the width as needed
      height={50} // Set the height as needed
    />
  
);

export default Logo;