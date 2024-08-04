import { CodeIcon, GithubIcon } from '@/components/icons'

import { GithubFormProps } from '@/interfaces/ui/props/form-github.interface'
import React from 'react'

export const GithubForm: React.FC<GithubFormProps> = ({
  onClick,
  onSubmit,
  isLoading,
  inputValue,
  onInputChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value)
  }
  const handleSubmit = () => {
    onSubmit(inputValue)
  }

  return (
    <div className='card relative my-auto h-full bg-neutral text-neutral-content lg:w-1/2'>
      <div className='card-body items-center justify-center gap-5 text-center'>
        <div
          className='tooltip tooltip-left absolute right-0 top-0'
          data-tip='Código Markdown'
        >
          <button
            className='btn btn-outline m-2'
            onClick={onClick}
            {...(isLoading ? { disabled: true } : {})}
          >
            <CodeIcon />
          </button>
        </div>
        <h2 className='card-title text-xl font-bold text-primary lg:text-3xl'>
          PerfiGit
        </h2>
        <span className='text-md max-w-md py-1 md:px-2'>
          Aplicación web enfocada en generar perfiles README de GitHub mediante
          IA.
        </span>
        <label className='input input-bordered flex w-11/12 items-center gap-2 md:w-7/12 lg:mb-3 lg:w-5/12'>
          <GithubIcon />
          <input
            type='text'
            className='grow'
            placeholder='Username'
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <div>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Generar
          </button>
        </div>
      </div>
    </div>
  )
}
