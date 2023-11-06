const leftDiv = {
  text: 'ToDo',
  options: {
    style: {
      fontSize: '1.2rem',
      fontWeight: 800,
    },
  },
};

const rightDiv = {
  text: 'DOM Wizard',
};

const header = {
  options: {
    id: 'header',
    style: {
      padding: '25px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'purple',
      color: 'white',
    },
  },
  children: [leftDiv, rightDiv],
};

export default header;
