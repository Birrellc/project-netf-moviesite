import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import netflixLoginBg from '../assets/netflixLoginBg.jpg';
import netflixLogo from '../assets/netflixLogo.png';

interface Props {}

const login = (props: Props) => {
  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Netflix Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <Image
          src={netflixLoginBg}
          layout='fill'
          className='-z-10 !hidden opacity-50 sm:!inline'
          objectFit='cover'
        />
      </div>
      <div>
        <Image
          src={netflixLogo}
          alt='netflix logo'
          height='150'
          width='150'
          objectFit='contain'
          className='absolute left-6 top-6 cursor-pointer md:left-12 md:top-8'
        />
      </div>
    </div>
  );
};

export default login;
