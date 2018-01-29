import ActionType from '../../actionType';

export const setCurrentTab = (index,routeName) => (dispatch) => {
    dispatch({
        type: ActionType.SET_CURRENT_TAB,
        index: index,
        routeName:routeName,
    })
}

export const setTabBadge = (number, routeName) => (dispatch) => {
    dispatch({
        type: ActionType.SET_TAB_BADGE,
        number: number,
        routeName: routeName,
    })
}
