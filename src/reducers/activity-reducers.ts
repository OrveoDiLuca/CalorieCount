import type { Activity } from "../types"

export type ActivityActions =
    { type:'save-activity', payload: { newActivity: Activity } } | 
    { type: 'set_activeId' , payload: {id: Activity['id']} }

export type ActivityState = { //El estado de la aplicacion. 
    activities: Activity[]
    activeId: Activity['id']
}

export const initialState: ActivityState = { //El estado inicial de la aplicacion.
    activities: [], 
    activeId: '' 
}

export const activityReducer = (state: ActivityState = initialState, action: ActivityActions) => {
    if(action.type === 'save-activity'){
        //Esta parte del codigo va a manejar la logica de guardar la actividad.
        return {
            ...state,
            activities: [...state.activities,action.payload.newActivity]
        }
    }

    if (action.type === 'set_activeId') {
        return{
            ...state, 
            activeId: action.payload.id
        }
    }

    return state
}