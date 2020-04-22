///////TYPES/////////////////////
export type InitialStateType = typeof initialState;


///////END OF TYPES///////////////////

let initialState = {};

const sidebarReducer = (state = initialState, action:any):InitialStateType =>{
	return state;
}

export default sidebarReducer;