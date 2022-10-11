import { CheckIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import netflixLogo from '../assets/netflixLogo.png';
import useAuth from '../customHooks/useAuth';

type Props = {};

const SubPlans = (props: Props) => {
  //
  const { logout } = useAuth();

  return (
    <div>
      <Head>
        <title>Netflix Subscription Plans</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='border-b border-white/20 bg-[#181818]'>
        <Link href='/'>
          <Image
            src={netflixLogo}
            alt='netflix logo'
            height='50'
            width='50'
            objectFit='contain'
            className='cursor-pointer'
          />
        </Link>
        <button
          className='text-lg font-medium hover:underline'
          onClick={logout}
        >
          Sign Out
        </button>
      </header>
    </div>
  );
};

export default SubPlans;
