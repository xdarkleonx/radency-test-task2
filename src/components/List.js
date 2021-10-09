import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, IconButton } from '@mui/material';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import { FaShoppingCart, FaHeadSideVirus, FaLightbulb } from 'react-icons/fa';
import { FaPencilAlt, FaFileArchive, FaTrash } from 'react-icons/fa';
import { MdOutlineRestorePage } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { removeNote, archiveNote, unarchiveNote } from '../redux/actions/notesActions';

const List = (props) => {
  const [items, setItems] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const initItems = props.items.sort((a, b) => a.created - b.created);
    setItems(initItems);
  }, [props.items])

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Task':
        return <FaShoppingCart size={20} color='white' />;
      case 'Random Thought':
        return <FaHeadSideVirus size={20} color='white' />;
      case 'Idea':
        return <FaLightbulb size={20} color='white' />;
      default:
        return <FaShoppingCart size={20} color='white' />;
    }
  }

  const getSummaryInfo = (items) => {
    return items.reduce((result, item) => {
      const activeTotal = result[item.category]?.active || 0;
      const activeCurrent = !item.archived ? 1 : 0;
      const archivedTotal = result[item.category]?.archived || 0;
      const archivedCurrent = item.archived ? 1 : 0;
      return {
        ...result,
        [item.category]: {
          active: activeTotal + activeCurrent,
          archived: archivedTotal + archivedCurrent
        }
      }
    }, {})
  }

  const renderListHead = () => {
    return (
      <TableRow>
        <TableCell className={classes.headCell}></TableCell>
        <TableCell className={classes.headCell}>Name</TableCell>
        <TableCell className={classes.headCell}>Created</TableCell>
        <TableCell className={classes.headCell}>Category</TableCell>
        <TableCell className={classes.headCell}>Content</TableCell>
        <TableCell className={classes.headCell}>Dates</TableCell>
        {props.isArchived
          ? <TableCell align='right' className={classes.headCell}>
            <MdOutlineRestorePage className={classes.icon} size={25} color='white' />
          </TableCell>
          : <TableCell align='right' className={classes.headCell}>
            <FaFileArchive className={classes.icon} size={20} color='white' />
            <FaTrash className={classes.icon} size={20} color='white' />
          </TableCell>
        }
      </TableRow>
    )
  }

  const renderListItems = () => {
    return items.map((item, i) => {
      const dates = item.content.match(/\d{0,31}(\D)\d{0,12}\1\d{4}/g) || [];
      return item.archived === props.isArchived && (
        <TableRow key={i} sx={{ boxShadow: 1 }}>
          <TableCell width={72} className={classes.boldCell}>
            <Box className={classes.iconBg}>
              {getCategoryIcon(item.category)}
            </Box>
          </TableCell>
          <TableCell className={classes.boldCell}>
            {item.name}
          </TableCell>
          <TableCell className={classes.cell}>
            {new Date(item.created).toLocaleString('en-CA', {
              month: 'long', day: 'numeric', year: 'numeric'
            })}
          </TableCell>
          <TableCell className={classes.cell}>
            {item.category}
          </TableCell>
          <TableCell className={classes.cell}>
            {item.content}
          </TableCell>
          <TableCell className={classes.cell}>
            {dates.length > 1 ? dates.toString().replaceAll(/,/g, ', ') : dates}
          </TableCell>
          {props.isArchived
            ? <TableCell width={50} className={classes.cell}>
              <IconButton onClick={() => dispatch(unarchiveNote(item.created))}>
                <MdOutlineRestorePage size={25} color='#434344' />
              </IconButton>
            </TableCell>
            : <TableCell width={140} className={classes.cell}>
              <IconButton onClick={() => props.onEdit({ ...item, index: i })}>
                <FaPencilAlt size={20} color='#434344' />
              </IconButton>
              <IconButton onClick={() => dispatch(archiveNote(i))}>
                <FaFileArchive size={20} color='#434344' />
              </IconButton>
              <IconButton onClick={() => dispatch(removeNote(i))}>
                <FaTrash size={20} color='#434344' />
              </IconButton>
            </TableCell>
          }
        </TableRow>
      )
    })
  }

  const renderSummaryHead = () => {
    return (
      <TableRow>
        <TableCell className={classes.headCell}></TableCell>
        <TableCell className={classes.headCell}>Note Category</TableCell>
        <TableCell className={classes.headCell}>Active</TableCell>
        <TableCell className={classes.headCell}>Archived</TableCell>
      </TableRow>
    )
  }

  const renderSummaryCategories = () => {
    const summary = getSummaryInfo(items);
    return Object.keys(summary).map((category, i) => {
      return (
        <TableRow key={i} sx={{ boxShadow: 1 }}>
          <TableCell width={72} className={classes.boldCell}>
            <Box className={classes.iconBg}>
              {getCategoryIcon(category)}
            </Box>
          </TableCell>
          <TableCell className={classes.boldCell}>
            {category}
          </TableCell>
          <TableCell className={classes.cell}>
            {summary[category].active}
          </TableCell>
          <TableCell className={classes.cell}>
            {summary[category].archived}
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <Table className={classes.table}>
      <TableHead className={classes.head}>
        {props.type === 'main'
          ? renderListHead()
          : renderSummaryHead()
        }
      </TableHead>
      <TableBody>
        {props.type === 'main'
          ? renderListItems()
          : renderSummaryCategories()
        }
      </TableBody>
    </Table>
  )
}

export default List;

const useStyles = makeStyles(() => ({
  box: {
    backgroundColor: '#ededed',
  },
  table: {
    borderCollapse: 'separate!important',
    borderSpacing: '0px 10px!important',
  },
  head: {
    backgroundColor: '#434344',
  },
  headCell: {
    color: 'white!important'
  },
  cell: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.6)!important'
  },
  boldCell: {
    backgroundColor: 'white',
    fontWeight: 'bold!important'
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#434344',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginInline: 8
  }
}))