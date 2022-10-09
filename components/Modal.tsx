import MuiModal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

type Props = {};

const Modal = (props: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);

  const closeHandler = () => {
    setShowModal(false);
  };

  return (
    <MuiModal open={showModal} onClose={closeHandler}>
      <>Modal</>
    </MuiModal>
  );
};

export default Modal;
