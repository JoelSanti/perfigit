function Toast({ message }: { message: string }) {
  return (
    <div className='toast'>
      <div className='alert alert-error'>
        <span> {message} </span>
      </div>
    </div>
  )
}

export default Toast
