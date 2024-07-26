import { GithubIcon } from '@/components/icons'
import { GithubFormProps } from '@/interfaces/ui/props/form-github-.interface'
import React, { useState } from 'react'

export const GithubForm: React.FC<GithubFormProps> = ({
  onClick,
  onSubmit,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const handleSubmit = () => {
    onSubmit(inputValue)
  }

  return (
    <div className='card relative my-auto h-full bg-neutral text-neutral-content lg:w-1/2'>
      <div className='card-body items-center justify-center gap-5 text-center'>
        <button
          className='btn absolute right-0 top-0 m-2'
          onClick={onClick}
          {...(isLoading ? { disabled: true } : {})}
        >
          Código Markdown
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z'
            />
          </svg>
        </button>
        <h2 className='card-title text-primary'>PerfiGit</h2>
        <span>
          Aplicación web enfocada en generar perfiles README de GitHub mediante
          IA.
        </span>
        <label className='input input-bordered flex items-center gap-2'>
          <GithubIcon />
          <input
            type='text'
            className='grow'
            placeholder='Username'
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <div className='mt-4'>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
