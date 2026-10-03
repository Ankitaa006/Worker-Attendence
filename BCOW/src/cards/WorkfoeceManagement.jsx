import React from 'react'

const WorkfoeceManagement = ({icon, title, description, type1, type2, color}) => {
  return (
    <div className='w-full h-full bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition'>
        <span className={`w-10 h-10 rounded-xl bg-${color} text-amber-400 flex items-center justify-center font-bold text-base`}>
            {icon}
        </span>
        <h1 className='text-base font-bold text-slate-900'>{title}</h1>
        <p className='text-xs text-slate-600 leading-relaxed'>{description}</p>
        <ul className='text-[11px] text-slate-500 space-y-1 pt-1 font-medium'>
            <li>{type1}</li>
            <li>{type2}</li>
        </ul>
    </div>
  )
}

export default WorkfoeceManagement