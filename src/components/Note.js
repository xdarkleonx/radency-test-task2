import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { InputLabel, Select, MenuItem } from '@mui/material';

const Note = (props) => {
  const [name, setName] = useState(props.initData?.name || '');
  const [category, setCategory] = useState(props.initData?.category || 'Task');
  const [content, setContent] = useState(props.initData?.content || '');

  const data = {
    name: name,
    category: category,
    content: content,
    archived: false,
    created: new Date()
  }
  
  return (
    <Box>
      <Typography variant='h3'>
        {props.title}
      </Typography>
      <Box mt={1}>
        <TextField
          fullWidth
          label='Name'
          variant='standard'
          sx={{ marginTop: 2 }}
          InputLabelProps={{ shrink: true }}
          placeholder='Write note name'
          defaultValue={name}
          onChange={(event) => setName(event.target.value)}
        />
        <InputLabel
          sx={{ marginTop: 2, fontSize: 13 }}
          labelId='category'>
          Category
        </InputLabel>
        <Select
          id='category'
          fullWidth
          label='Category'
          variant='standard'
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <MenuItem value='Task'>Task</MenuItem>
          <MenuItem value='Random Thought'>Random Thought</MenuItem>
          <MenuItem value='Idea'>Idea</MenuItem>
        </Select>
        <TextField
          fullWidth
          multiline
          maxRows={10}
          label='Content'
          variant='standard'
          sx={{ marginTop: 2 }}
          InputLabelProps={{ shrink: true }}
          placeholder='Describe note'
          defaultValue={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <Box mt={2} display='flex' justifyContent='end'>
          <Button
            variant='contained'
            onClick={() => props.onSave(data)}
          >
            Save note
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Note;