import Image from 'next/image';
import netflixLogo from '../assets/netflixLogo.png';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';

type Props = {};

const Header = (props: Props) => {
  return (
    <div>
      <header>
        {/* left side */}
        <nav className='flex items-center space-x-2 md:space-x-10'>
          <Image
            src={netflixLogo}
            alt='netflix logo'
            height='50'
            width='50'
            objectFit='contain'
          ></Image>

          <ul className='hidden space-x-4 md:flex'>
            <li className='nav-link'>Home</li>
            <li className='nav-link'>TV Shows</li>
            <li className='nav-link'>Movies</li>
            <li className='nav-link'>New & Popular</li>
            <li className='nav-link'>My List</li>
          </ul>
        </nav>

        {/* right side */}
        <div>
          <SearchIcon className='hidden sm:inline w-6 h-6' />
          <p className='hidden lg:inline'>Kids</p>
          <BellIcon className='h-6 w-6' />
        </div>
      </header>
    </div>
  );
};

export default Header;
