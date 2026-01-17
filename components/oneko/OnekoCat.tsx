import Script from 'next/script';

export default function OnekoCat() {
    if(process.env.NODE_ENV === 'development') {
        return null;
    }
  return <Script src="./oneko/oneko.js" data-cat="./oneko/oneko.gif" />;
}