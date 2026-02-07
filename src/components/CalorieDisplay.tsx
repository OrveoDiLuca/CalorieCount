
type CalorieDisplayProps = {
    calories: number,
    text: string
}


function CalorieDisplay({calories, text}: CalorieDisplayProps) {
  return (
    <p className="font-bold text-white rounded-full grid grid-cols-1 gap-3 text-center">
        <span className="font-black text-6xl text-orange-400">
            {calories}
        </span>
        {text}
    </p>
  )
}

export default CalorieDisplay