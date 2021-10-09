export const addNote = (note) => (dispatch, getState) => {
  try {
    const notes = getState().notes.notes;
    const newNotes = [...notes, note]

    dispatch({
      type: 'ADD_NOTE',
      payload: newNotes
    })
  }
  catch (error) {
    console.log(error);
  }
}

export const editNote = (index, data) => (dispatch, getState) => {
  try {
    const notes = getState().notes.notes;
    const newNotes = notes.map((note, i) => {
      return i === index
        ? { ...data, created: note.created }
        : note
    })

    dispatch({
      type: 'EDIT_NOTE',
      payload: newNotes
    })
  }
  catch (error) {
    console.log(error);
  }
}

export const archiveNote = (index) => (dispatch, getState) => {
  try {
    const notes = getState().notes.notes;
    const newNotes = notes.map((note, i) => ({
      ...note,
      archived: i === index ? true : note.archived
    }))

    dispatch({
      type: 'ARCHIVE_NOTE',
      payload: newNotes
    })
  }
  catch (error) {
    console.log(error);
  }
}

export const unarchiveNote = (created) => (dispatch, getState) => {
  try {
    const notes = getState().notes.notes;
    const newNotes = notes.map((item) => ({
      ...item,
      archived: item.created === created ? false : item.archived
    }))

    dispatch({
      type: 'UNARCHIVE_NOTE',
      payload: newNotes
    })
  }
  catch (error) {
    console.log(error);
  }
}

export const removeNote = (index) => (dispatch, getState) => {
  try {
    const notes = getState().notes.notes;
    const newNotes = notes.filter((_, i) => i !== index);

    dispatch({
      type: 'REMOVE_NOTE',
      payload: newNotes
    })
  }
  catch (error) {
    console.log(error);
  }
}