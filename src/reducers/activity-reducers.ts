import type { Activity } from "../types"

export type ActivityActions =
    { type:'save-activity', payload: { newActivity: Activity } } | 
    { type: 'set_activeId' , payload: {id: Activity['id']} } | 
    { type: 'delete_activity', payload: {id: Activity['id']} } | 
    { type: 'restart_app'}

export type ActivityState = { //El estado de la aplicacion. 
    activities: Activity[]
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = { //El estado inicial de la aplicacion.
    activities: localStorageActivities(), 
    activeId: '' 
}

export const activityReducer = (state: ActivityState = initialState, action: ActivityActions) => {
    if(action.type === 'save-activity'){
        //Esta parte del codigo va a manejar la logica de guardar la actividad.
        let updatedActivities : Activity[] = []
        //Permite ver si hay un id activo, si lo hay, actualiza la actividad, si no, agrega una nueva.
        if(state.activeId){
            updatedActivities = state.activities.map( act => act.id === state.activeId ? action.payload.newActivity : act)
        }else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updatedActivities, 
            activeId: ''
        }
    }

    if (action.type === 'set_activeId') {
        return{
            ...state, 
            activeId: action.payload.id
        }
    }

    if (action.type === 'delete_activity') {
        return{
            ...state,
            activities: state.activities.filter( act => act.id !== action.payload.id)
        }
    }

    if (action.type === 'restart_app') {
        return{
            activities: [],
            activeId: ''
        }
    }

    return state
}