import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-40 gap-4'>
      <h1 className='text-4xl font-bold '>404</h1>
      <p>this page is found</p>
      <Link href="/" className='text-red-400'>⬅ Back Home</Link>
    </div>
  )
}

export default NotFoundPage