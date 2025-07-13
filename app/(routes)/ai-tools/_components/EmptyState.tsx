import React from 'react'

function EmptyState({selectedQuestion}: any) {
    const questionList = [
        "What skills should I learn to become a software engineer?",
        "How can I improve my resume for a data science job?",
    ]
  return (
    <div>
       <h2 className='font-bold text-xl text-center'>Ask Anything to AI Career Agent</h2>
       <div>
        {questionList.map((question, index) => (
          <div key={index} className="text-center  mt-2">
            <p className="p-4 border rounded-lg my-3 hover:border-primary cursor-pointer" onClick={()=>selectedQuestion(question)}>{question}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmptyState
