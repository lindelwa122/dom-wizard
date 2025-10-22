const buttonStyles = {  
  primary: {  
    padding: '20px',  
    borderRadius: '20px',  
    fontSize: '1.2rem',  
    backgroundColor: 'lightblue',  
    color: 'white',  
    cursor: 'pointer',  
    border: 'none',  
  },  
  secondary: {  
    padding: '20px',  
    borderRadius: '20px',  
    fontSize: '1.2rem',  
    backgroundColor: 'gray',  
    color: 'white',  
    cursor: 'pointer',  
    border: 'none',  
  },  
};  
  
export const createButton = (text, styleType = 'primary', additionalOptions = {}) => {  
  return {  
    tagName: 'button',  
    text: text,  
    options: {  
      style: buttonStyles[styleType],  
      ...additionalOptions,  
    },  
  };  
};