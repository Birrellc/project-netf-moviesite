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
      <main className='mx-auto max-w-5xl px-5 pt-32 pb-12 transition-all md:px-10'>
        <h1 className='mb-4 text-3xl font-semibold'>
          Choose your subscription plan
        </h1>
        <ul>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Ad-free viewing.
          </li>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Personalized
            recommendations.
          </li>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        <div className='mt-4 flex flex-col space-y-4'>
          <div className='flex w-full items-center justify-end self-end'>
            {/* plan */}
            <div className='planContainer'>Standard</div>
            <div className='planContainer'>Standard</div>
            <div className='planContainer'>Standard</div>
          </div>

          {/* Table */}
          <button>Subscribe</button>
        </div>
      </main>
    </div>
  );
};

export default SubPlans;
