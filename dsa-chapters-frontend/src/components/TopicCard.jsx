import React from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import DifficultyBadge from './DifficultyBadge';

const TopicCard = ({topic, onClick}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
            <DifficultyBadge difficulty={topic.difficulty} />
          </div>
          <p className="mt-2 text-gray-600">{topic.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={onClick}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              View Problems <ChevronRight className="ml-1 h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // onToggleComplete();
              }}
              className={`flex items-center gap-2 ${
                topic.status? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <CheckCircle className="h-5 w-5" />
              {topic.status === true ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicCard