const initState = {
  notes: [{
    name: "Shoping list",
    created: new Date(2021, 3, 20),
    category: "Task",
    content: "Tomatos, bread",
    archived: false
  },
  {
    name: "The theory of evolution",
    created: new Date(2021, 3, 27),
    category: "Random Thought",
    content: "The evolution ...",
    archived: false
  },
  {
    name: "New Feature",
    created: new Date(2021, 4, 5),
    category: "Idea",
    content: "Implement new feature from 5/5/2021 to 3/5/2021",
    archived: false,
  },
  {
    name: "Free Guy",
    created: new Date(2021, 4, 6),
    category: "Random Thought",
    content: "Watch the movie",
    archived: false
  },
  {
    name: "Workout plan",
    created: new Date(2021, 4, 7),
    category: "Task",
    content: "Create a new training program",
    archived: false
  },
  {
    name: "Meal plan",
    created: new Date(2021, 4, 8),
    category: "Task",
    content: "Create a new meal program",
    archived: false
  },
  {
    name: "Pass the test tasks",
    created: new Date(2021, 4, 10),
    category: "Task",
    content: "Need to do all tasks",
    archived: true
  }]
}

const notesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      console.log(action);
      return {
        ...state,
        notes: action.payload
      };
    case 'EDIT_NOTE':
      console.log(action);
      return {
        ...state,
        notes: action.payload
      };
    case 'ARCHIVE_NOTE':
      console.log(action);
      return {
        ...state,
        notes: action.payload
      };
    case 'UNARCHIVE_NOTE':
      console.log(action);
      return {
        ...state,
        notes: action.payload
      };
    case 'REMOVE_NOTE':
      console.log(action);
      return {
        ...state,
        notes: action.payload
      };

    default:
      return state;
  }
}

export default notesReducer;