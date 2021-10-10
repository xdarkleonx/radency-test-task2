
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Button, Stack, Typography } from '@mui/material';
import List from '../components/List';
import Note from '../components/Note';
import ModalView from '../components/ModalView';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, editNote } from '../redux/actions/notesActions';

const Notes = () => {
  const [modalType, setModalType] = useState();
  const [editData, setEditData] = useState();

  const classes = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  const getArchivedView = () => {
    return (
      <>
        <Typography variant='h3'>Archived notes</Typography>
        <List items={notes} type='main' isArchived={true} />
      </>
    )
  }

  const getNewNoteView = () => {
    return (
      <Note
        title='Create new note'
        onSave={(data) => {
          dispatch(addNote(data));
          setModalType();
        }}
      />
    )
  }

  const getEditNoteView = () => {
    return (
      <Note
        title='Edit note'
        initData={editData}
        onSave={(data) => {
          dispatch(editNote(editData.index, data));
          setModalType();
        }}
      />
    )
  }

  const getModalView = () => {
    switch (modalType) {
      case 'archived':
        return getArchivedView();
      case 'new':
        return getNewNoteView();
      case 'edit':
        return getEditNoteView();
    }
  }

  return (
    <Grid px={4} py={1} bgcolor='#EAEEF3'>
      <List
        items={notes}
        type='main'
        isArchived={false}
        onEdit={(data) => {
          setEditData(data);
          setModalType('edit');
        }}
      />
      <Stack spacing={2} direction='row' className={classes.buttonsBox}>
        <Button
          variant='outlined'
          onClick={() => setModalType('archived')}
        >
          Show archived
        </Button>
        <Button
          variant='contained'
          onClick={() => setModalType('new')}
        >
          Create Note
        </Button>
      </Stack>
      <List items={notes} type='summary' />
      {modalType?.length &&
        <ModalView
          isOpen={true}
          content={getModalView()}
          onClose={() => setModalType()}
        />
      }
    </Grid>
  )
}

export default Notes;

const useStyles = makeStyles(() => ({
  buttonsBox: {
    marginBlock: 16,
    justifyContent: 'end'
  }
}))