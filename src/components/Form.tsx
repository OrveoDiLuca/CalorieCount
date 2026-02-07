import { v4 as uuidv4 } from "uuid"
import { type ChangeEvent, type Dispatch, type FormEvent, useState, useEffect } from "react"
import type { Activity } from "../types"
import type { ActivityActions, ActivityState } from "../reducers/activity-reducers"
import { categories } from "../data/categories"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialST: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
}

function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialST)

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            if (selectedActivity) {
                setActivity(selectedActivity)
            }
        }
    }, [state.activeId]) //Este useEffect se ejecuta cada vez que el estado de activeId cambia y lo que hace es que captura el activeId y lo coloca en el formulario llenando asi los campos.   

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== "" && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: "save-activity", payload: { newActivity: activity } })

        setActivity({
            ...initialST,
            id: uuidv4()
        })

    }

    return (
        <>
            <form
                className="space-y-5 bg-white p-10 rounded-lg shadow"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="category" className="font-bold">Categorias:</label>
                    <select
                        className="border border-slate-300 p-2 rounded-lg bg-white"
                        name="category" id="category"
                        value={activity.category}
                        onChange={handleChange}
                    >
                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="name" className="font-bold">Actividad:</label>
                    <input
                        id="name"
                        type="text"
                        className="border border-slate-300 p-2 rounded-lg bg-white"
                        placeholder="Ejemplo: Comida, Ejercicio"
                        value={activity.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="calories" className="font-bold">Calorias:</label>
                    <input
                        id="calories"
                        type="number"
                        className="border border-slate-300 p-2 rounded-lg bg-white"
                        placeholder="Calorias. e.j: 300 o 500"
                        value={activity.calories}
                        onChange={handleChange}
                    />
                </div>
                <input
                    type="submit"
                    value={activity.category === 1 ? "Agregar Comida" : "Agregar Ejercicio"}
                    className="bg-gray-600 text-white rounded-lg hover:bg-gray-900 cursor-pointer w-full p-2 
                    uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isValidActivity()}
                />
            </form>
        </>
    )
}

export default Form