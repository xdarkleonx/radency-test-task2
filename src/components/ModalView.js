import { makeStyles } from '@mui/styles';
import { Modal, Box } from '@mui/material';

const ModalView = (props) => {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={props.isOpen}
      onClose={() => props.onClose()}
    >
      <Box boxShadow={24} className={classes.modalBox}>
        {props.content}
      </Box>
    </Modal>
  )
}

export default ModalView;

const useStyles = makeStyles(() => ({
  modal: {
    overflowY: 'hidden',
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    minWidth: 400,
    maxHeight: 'calc(100% - 60px)',
    overflowY: 'auto',
  },
}))