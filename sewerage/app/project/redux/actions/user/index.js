import ActionType from "../../actionType";

export const saveUser = (user: Object) => (dispatch) => {
    console.log(user);
    dispatch({
        type: ActionType.SAVE_USERS,
        data: user
    })
};