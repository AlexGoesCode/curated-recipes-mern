//* Footer from Flowbite
'use client';

import { Footer } from 'flowbite-react';

const FlowFooter = () => {
  return (
    <Footer
      container
      className='bg-gray-700 bg-opacity-50 rounded-none bg-transparent'
    >
      <Footer.Copyright
        href='#'
        className='text-gray-300 font-medium text-sm'
        by='Flavour:Dance!'
        year={2024}
      />
      <Footer.LinkGroup className='text-gray-300 font-medium text-sm'>
        <Footer.Link href='#'>About</Footer.Link>
        <Footer.Link href='#'>Privacy Policy</Footer.Link>
        <Footer.Link href='#'>Licensing</Footer.Link>
        <Footer.Link href='#'>Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};

export default FlowFooter;
