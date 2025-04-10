import Link from 'next/link'
import React from 'react'

type Pros = {
  footerLable: string,
  footerHref: string
}

export const AuthFooter = ({footerHref,footerLable} : Pros) => {
  return (
    <div className='flex justify-between items-center w-full'>
      {footerLable}
      <Link className='bg-amber-100 border-2 rounded-sm px-1' href={footerHref}>{footerHref}</Link>
    </div>
  )
}
