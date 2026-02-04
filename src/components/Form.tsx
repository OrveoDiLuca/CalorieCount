import { useState} from "react"
import type { ChangeEvent } from "react"
import { categories } from "../data/categories"

function Form() {

    const [activity, setActivity] = useState({
        category: 1,
        name: "",
        calories: 0
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        setActivity({
            ...activity,
            [e.target.id]: e.target.value
        })
    }
    return (
        <>
            <form className="space-y-5 bg-white p-10 rounded-lg shadow">
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
                    value="Agregar"
                    className="bg-gray-600 text-white rounded-lg hover:bg-gray-900 cursor-pointer w-full p-2 uppercase font-bold"
                />
            </form>
        </>
    )
}

export default Form