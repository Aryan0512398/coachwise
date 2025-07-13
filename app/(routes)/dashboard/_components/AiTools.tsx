import React from 'react'
import AitoolCard from './AitoolCard'

const aiTools=[
    {
        name:'AI Career Q&A Chat',
        desc:'Chat with AI Agent',
        icon:'/chatbot.png',
        button:"Let's Chat",
        path:'/ai-tools/ai-chat'
    },
      {
        name:'AI Resume Analyzer',
        desc:'Improve your resume with AI',
        icon:'/resume.png',
        button:"Analyze Now",
        path:'/ai-tools/ai-resume-analyzer'
    },
    {
        name:'Career RoadMap Generator',
        desc:'Generate a  career roadmap',
        icon:'/roadmap.png',
        button:"Generate Now",
        path:'/ai-tools/ai-roadmap-agent'
    },
    {
        name:'Cover Letter Generator',
        desc:'Write a  cover letter',
        icon:'/letter.png',
        button:"Create Now",
        path:'/ai-tools/cover-letter-generator'
    }
]
function AiTools() {
  return (
    <div id="ai" className='mt-7 p-5 bg-white rounded-lg border shadow-lg'>
      <h2 className='font-bold text-lg'>Available AI Tools</h2>
      <p>Start Building and shaping your career with these AI tools.</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5'>
        {aiTools.map((tool:any, index) => (
          <AitoolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  )
}

export default AiTools
