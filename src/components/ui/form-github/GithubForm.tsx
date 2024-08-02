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
            className='btn btn-outline m-2 p-3'
            onClick={onClick}
            {...(isLoading ? { disabled: true } : {})}
          >
            <CodeIcon />
          </button>
        </div>
        <h2 className='card-title text-3xl font-bold text-primary lg:text-5xl'>
          PerfiGit
        </h2>
        <span className='max-w-md py-2 lg:py-3'>
          Aplicación web enfocada en generar perfiles README de GitHub mediante
          IA.
        </span>
        <label className='input input-bordered mb-2 flex w-11/12 items-center gap-2 md:w-7/12 lg:mb-3 lg:w-5/12'>
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
