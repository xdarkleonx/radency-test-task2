import { combineReducers } from 'redux';
import notes from './reducers/notesReducer';

export default combineReducers({
  notes: notes,
})