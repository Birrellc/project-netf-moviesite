import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { useEffect, useState } from 'react';
import MuiModal from '@mui/material/Modal';
import { XIcon, ThumbUpIcon, PlusIcon } from '@heroicons/react/solid';
import { Movie, Format, Genre } from '../typings';
import ReactPlayer from 'react-player/lazy';
import { FaPlay } from 'react-icons/fa';
import { VolumeOffIcon } from '@heroicons/react/solid';

type Props = {};

const Modal = (props: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState();
  // array of genres
  const [genre, setGenre] = useState<Genre[]>([]);

  useEffect(() => {
    // return out if no movie
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          // if type is tv then tv if type movie then movie
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
          //https://developers.themoviedb.org/3/getting-started/append-to-response
        }&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((error) => console.log(error.message));

      setTrailer(data);

      // if videos exist - find the index of the video
      // https://developers.themoviedb.org/3/movies/get-movie-videos
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (format: Format) => format.type === 'Trailer'
        );
        // setTrailer to the data returned at the index from the above query
        // target key to select and render a trailer(youtube)
        setTrailer(data.videos?.results[index]?.key);
      }
      //developers.themoviedb.org/3/genres/get-movie-list
      https: if (data?.genres) {
        setGenre(data.genres);
      }
    }
    //* Note: invoke function outside (always forget)
    fetchMovie();
  }, [movie]);
  console.log(trailer);

  const closeHandler = () => {
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={closeHandler}
      className='fixed !top-10 left-0 right-0 z-100 mx-auto w-full max-w-4xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'
    >
      <>
        <button
          onClick={closeHandler}
          className='modalBtn absolute right-6 top-6 !z-50 h-10 w-10 border-none bg-[#191919] hover:bg-[red]'
        >
          <XIcon className='h-7 w-7 ' />
        </button>

        <div className='relative pt-[60%]'>
          {/* responsive player - https://github.com/cookpete/react-player#responsive-player */}
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width='100%'
            height='100%'
            style={{ position: 'absolute', top: '0', left: '0' }}
            // playing
          />
          <div className='absolute bottom-8 flex w-full items-center justify-between px-12'>
            <div className='flex space-x-2'>
              <button className='flex items-center gap-x-2 rounded bg-white px-2 text-md font-semibold md:text-xl text-black transition hover:bg-[#e5e5e5]'>
                <FaPlay className='h-4 w-4 text-black ' />
                Play
              </button>

              <button className='modalBtn'>
                <PlusIcon />
              </button>

              <button className='modalBtn'>
                <ThumbUpIcon className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>

        <div className='flex space-x-14 rounded-b-md bg-[#191919] px-10 py-8'>
          <div className='space-y-4 text-lg'>
            <div className='flex items-center space-x-2 text-sm'>
              <p className='font-semibold text-green-400'>
                {movie!.vote_average * 10}% Match
              </p>
              <p className='font-light'>
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className='flex h-4 item-center justify-center rounded border border-white/50 px-2 text-xs'>
                HD
              </div>
            </div>

            <div className='flex flex-col gap-x-1- gap-y-5 font-light md:flex-row'>
              <p className='w-[80%]'>{movie?.overview}</p>
              <div className='flex flex-col space-y-3 text-sm'>
                <div>
                  <p className='text-[gray]'>Genres</p>
                  {genre.map((genre) => genre.name).join(', ')}
                </div>
                <div>
                  <span className='text-[gray]'>Language</span>
                  {movie?.original_language}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
