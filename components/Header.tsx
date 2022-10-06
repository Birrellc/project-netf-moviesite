import { useState, useEffect } from 'react';

import Image from 'next/image';
import netflixLogo from '../assets/netflixLogo.png';
import accountImage from '../assets/accountImage.png';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';

type Props = {};

const Header = (props: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // single mount
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // listen for scroll event
      window.addEventListener('scroll', handleScroll);
      // cleanup function
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };
  }, []);

  return (
    <div>
      <header className={`${isScrolled && 'bg-[#141414'}`}>
        {/* left side */}
        <nav className='flex items-center space-x-2 md:space-x-10'>
          <div>
            <Image
              src={netflixLogo}
              alt='netflix logo'
              height='50'
              width='50'
              objectFit='contain'
            />
          </div>

          <ul className='hidden space-x-4 md:flex'>
            <li className='nav-link'>Home</li>
            <li className='nav-link'>TV Shows</li>
            <li className='nav-link'>Movies</li>
            <li className='nav-link'>New & Popular</li>
            <li className='nav-link'>My List</li>
          </ul>
        </nav>

        {/* right side */}
        <div className='flex items-center space-x-4 text-sm font-light'>
          <SearchIcon className='hidden sm:inline w-6 h-6' />
          <p className='hidden lg:inline'>Kids</p>
          <BellIcon className='h-6 w-6' />
          <Link href='/account'>
            <div>
              <Image
                src={accountImage}
                className='cursor-pointer rounded space-x-4'
              />
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
