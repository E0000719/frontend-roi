import React from 'react';

interface LogoProps extends React.SVGProps<HTMLImageElement> {
  src: string;
  alt: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt, ...props }) => {
  return <img src={src} alt={alt} {...props} />;
};

export default Logo;
