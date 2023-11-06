const emptyView = () => {
  const heading = {
    tagName: 'p',
    options: {
      textContent: 'No Todos Yet',
      style: {
        fontSize: '3rem',
        paddingTop: '100px',
        marginBottom: '30px',
      },
    },
  };

  const button = {
    tagName: 'button',
    link: {
      name: 'button',
      to: 'home',
    },
    options: {
      textContent: 'Create your first todo',
      style: {
        padding: '10px 20px',
        borderRadius: '17px',
        fontSize: '1.2rem',
        backgroundColor: 'purple',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
      },
      onclick: () => {
        const dialog = document.querySelector('dialog');
        dialog.showModal();
      },
    },
  };

  return {
    children: [heading, button],
    options: {
      className: 'empty-view',
      style: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
  };
};

export default emptyView();
