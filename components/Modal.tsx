import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { useEffect, useState } from 'react';
import MuiModal from '@mui/material/Modal';
import { XIcon } from '@heroicons/react/solid';
import { Movie, Format, Genre } from '../typings';
import ReactPlayer from 'react-player/lazy';

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
    <MuiModal open={showModal} onClose={closeHandler}>
      <>
        <button
          onClick={closeHandler}
          className='modalBtn absolute right-6 top-6 !z-50 h-10 w-10 border-none bg-[#191919] hover:bg-[red]'
        >
          <XIcon className='h-7 w-7 ' />
        </button>

        <div>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width='100%'
            height='100%'
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
          />
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
