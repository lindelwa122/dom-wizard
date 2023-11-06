import header from '../components/header';

const mainContent = () => {
  const heading = {
    tagName: 'p',
    text: 'Todo App Made With DOM Wizard',
    options: {
      style: {
        fontSize: '4rem',
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
      textContent: 'Get Started',
      style: {
        padding: '10px 20px',
        borderRadius: '17px',
        fontSize: '1.2rem',
        backgroundColor: 'purple',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
      },
    },
  };

  return {
    children: [heading, button],
    options: {
      style: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
  };
};

const landingPage = {
  children: [header, mainContent()],
};

export default landingPage;
