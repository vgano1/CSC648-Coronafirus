const initState = () => ({
    name: '',
    isLoggedIn : false,
    userType : '',
});

const userReducer = (state = initState(), action) => {
    switch(action.type){
        case 'USER_NAME_SET':
            return {
                ...state, //copy old state
                name: action.name, //input the new user name
            };
        case 'USER_SET_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            };
        case 'USER_TYPE':
            return {
                ...state,
                userType: action.userType,
            };
        default:
            return state;
    }
};
export default userReducer;