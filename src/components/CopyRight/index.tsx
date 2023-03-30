import dayjs from 'dayjs'
import React from 'react'
function CopyRight() {
  const year = dayjs().year()
  return (
    <span>
      {_siteTitle} &copy; {year} - present. Created by {_author}
    </span>
  )
}

export default CopyRight
