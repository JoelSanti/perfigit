import { CodeIcon, GithubIcon } from '@/components/icons'
import { useMarkdown } from '@/hooks/useMarkdown.hooks'
import { useToast } from '@/hooks/useToast.hook'

export const GithubForm: React.FC = () => {
  const { generateMarkdownCode, isMarkdownLoading, toggleMarkdownPreview } =
    useMarkdown()
  const { showToast } = useToast()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const username = formData.get('username') as string

    if (!username) {
      return showToast('Por favor, ingrese un nombre de usuario.')
    }

    generateMarkdownCode(username)
  }

  return (
    <div className='card relative my-auto h-full bg-neutral text-neutral-content lg:w-1/2'>
      <form
        className='card-body items-center justify-center gap-4 text-center'
        onSubmit={handleSubmit}
      >
        <div
          className='tooltip tooltip-left absolute right-0 top-0'
          data-tip='Código Markdown'
        >
          <button
            className='btn btn-outline m-2'
            onClick={toggleMarkdownPreview}
            {...(isMarkdownLoading ? { disabled: true } : {})}
          >
            <CodeIcon />
          </button>
        </div>
        <h2 className='card-title text-xl font-bold text-primary lg:text-3xl'>
          PerfiGit
        </h2>
        <span className='text-md max-w-md text-pretty md:px-2'>
          Aplicación web enfocada en generar perfiles README de GitHub usando
          IA.
        </span>
        <label className='input input-bordered flex w-11/12 items-center gap-2 sm:w-auto'>
          <GithubIcon />
          <input
            type='text'
            className='grow'
            placeholder='Usuario'
            name='username'
          />
        </label>
        <div>
          <button
            className={`btn btn-primary ${isMarkdownLoading && 'btn-disabled'}`}
          >
            Generar
          </button>
        </div>
      </form>
    </div>
  )
}
