import Link from 'next/link'
import React from 'react'

type Pros = {
  footerLable: string,
  footerHref: string
}

export const AuthFooter = ({footerHref,footerLable} : Pros) => {
  return (
    <div className='flex justify-end items-center w-full'>
      <Link className='rounded-sm px-1' href={footerHref}>{footerLable}</Link>
    </div>
  )
}
