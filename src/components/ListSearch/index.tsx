import React, { ChangeEvent, useState } from 'react'
import { Input } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { SearchKey } from '@/constants'

const { Search } = Input

type ListSearchProp = {
  onSearch?: (value: string) => Maybe<Promise<void>>
}
export default function ListSearch(prop: ListSearchProp) {
  const [searchParameter, setSearchParameter] = useSearchParams()
  const [value, setValue] = useState<string>(searchParameter.get(SearchKey) || '')
  function handleSearch(value: string) {
    searchParameter.set(SearchKey, value)
    setSearchParameter(searchParameter)
    typeof prop.onSearch === 'function' && prop.onSearch(value)
  }
  function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }
  return (
    <Search
      placeholder="请输入关键字"
      onSearch={handleSearch}
      size="large"
      allowClear
      value={value}
      onChange={handleValueChange}
      style={{
        width: '260px'
      }}
    ></Search>
  )
}
