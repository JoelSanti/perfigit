import React from 'react'
import { CodeIcon, GithubIcon } from '@/components/icons'
import { GithubFormProps } from '@/interfaces/ui/props/github-form.interface'

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
      <div className='card-body items-center justify-center gap-4 text-center'>
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
        <span className='text-md max-w-md md:px-2'>
          Aplicación web enfocada en generar perfiles README de GitHub usando
          IA.
        </span>
        <label className='input input-bordered flex w-11/12 items-center gap-2 sm:w-auto'>
          <GithubIcon />
          <input
            type='text'
            className='grow'
            placeholder='Usuario'
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
