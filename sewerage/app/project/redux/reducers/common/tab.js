import ActionType from "../../actionType";

export const currentTabIndex = (state,action)=>{
    state = state || {
        index:0,
        routeName:''
    }
    if(action.type === ActionType.SET_CURRENT_TAB){
        return {
            ...state,
            index:action.index,
            routeName:action.routeName
        }
    }
    return state;
}

export const tabBadge = (state,action) => {
    state=state || {}
    if(action.type === ActionType.SET_TAB_BADGE){
        return {
            ...state,
            [action.routeName]:action.number,
        }
    }
    return state;
}