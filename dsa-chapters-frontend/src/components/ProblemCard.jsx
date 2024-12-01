import React from 'react'
import { Youtube, FileText, ExternalLink, CheckCircle } from 'lucide-react';
import DifficultyBadge from './DifficultyBadge';

function ProblemCard({problem,checked, onToggleComplete}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-semibold text-gray-900">{problem.title}</h3>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>
          <p className="mt-2 text-gray-600">{problem.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-4">
            {problem.youtubeLink && (
              <a
                href={problem.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-600 hover:text-red-800"
              >
                <Youtube className="mr-2 h-4 w-4" />
                Tutorial
              </a>
            )}
            {problem.leetcodeLink && (
              <a
                href={problem.leetcodeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-yellow-600 hover:text-yellow-800"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                LeetCode
              </a>
            )}
            {problem.codeforcesLink && (
              <a
                href={problem.codeforcesLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                CodeForces
              </a>
            )}
            {problem.articleLink && (
              <a
                href={problem.articleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-600 hover:text-gray-800"
              >
                <FileText className="mr-2 h-4 w-4" />
                Article
              </a>
            )}
          </div>
        </div>
        <input
            type='checkbox'
          onClick={onToggleComplete}
          checked={checked}
          className={`ml-4 p-2 mx-2 w-9 h-5 rounded-full transition-colors ${
            problem.completed ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          {/* <CheckCircle className="h-6 w-6" /> */}
        </input>
      </div>
    </div>
  )
}

export default ProblemCard