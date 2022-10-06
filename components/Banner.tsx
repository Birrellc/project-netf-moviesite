import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Movie } from '../typings';
import { baseUrl } from '../constants/movie';

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  // display random movie on page refresh
  const [movie, setMovie] = useState<Movie | null>(null);
  console.log(netflixOriginals);

  useEffect(() => {
    setMovie(
      //generate a random index
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  console.log('movie', movie);

  return (
    <div>
      <div className='absolute top-0 left-0 h-[95vh] w-screen -z-10'>
        {/* movie backdrop image */}
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout='fill'
          objectFit='cover'
        />
      </div>
    </div>
  );
};

export default Banner;
