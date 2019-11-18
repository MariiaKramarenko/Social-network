import React from 'react';

const StoreContext = React.createContext(null);/*создаем контекст вызова*/

 export const Provider = (props) =>{/*мы просто инкапсулируем в этой переменной логику контекст-вызова*/
  return (
      <StoreContext.Provider value={props.store}> 
      {props.children}
      </StoreContext.Provider> 

  	)
}

export default StoreContext;