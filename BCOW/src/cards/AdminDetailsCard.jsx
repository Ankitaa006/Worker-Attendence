import React from 'react'

const AdminDetailsCard = ({title, data, desc, dataCol, descCol}) => {
  return (
    <div className="flex flex-col p-4.5 items-start justify-center m-1 bg-slate-50 border border-gray-200 rounded-lg shadow-xl gap-1.5">
        <p className='uppercse text-sm text-gray-600 font-semibold'>{title}</p>
        <h1 className={`text-3xl font-bold text-${dataCol}`}>{data}</h1>
        <p className={`text-xs font-medium text-${descCol}`}>{desc}</p>
    </div>
  )
}

export default AdminDetailsCard