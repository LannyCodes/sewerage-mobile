import ActionType from '../../actionType';

export const workorderDetail = (data) => (dispatch) => {
    dispatch({
        type: ActionType.SET_WORKORDERDETAIL,
        data: data,
    })
}

export const changeWorkorderListAtIndex = (data) => (dispatch) => {
    dispatch({
        type: ActionType.CHANGE_WORKORDERLIST,
        data: data,
    })
}