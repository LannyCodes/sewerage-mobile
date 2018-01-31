import ActionType from "../../actionType";

export const deleteMessageListAtIndex = (index) => (dispatch) => {
    dispatch({
        type:ActionType.MESSAGE_DELETE_ROW,
        index:index
    })
}

export const changeMessageListAtIndex = (index) => (dispatch) => {
    dispatch({
        type:ActionType.MESSAGE_CHANGE_ROW,
        index:index
    })
}