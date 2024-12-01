import React from 'react'

function DifficultyBadge({difficulty}) {
    const colors = {
        Easy: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Hard: 'bg-red-100 text-red-800',
      };
  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${colors[difficulty]}`}>
      {difficulty}
    </span>
  )
}

export default DifficultyBadge