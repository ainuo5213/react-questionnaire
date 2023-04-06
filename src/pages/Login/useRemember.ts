import { useEffect, useState } from 'react'

type UseRememberOption<T> = {
  onLoaded?: (value: T) => void
}
export default function useRemember<T extends { remember: boolean }>(
  rememberKey: string,
  option?: UseRememberOption<T>
) {
  const [formData, setFormData] = useState<T>()
  useEffect(() => {
    const storage = localStorage.getItem(rememberKey)
    if (storage) {
      const data = JSON.parse(storage) as T
      setFormData(data)
      if (option?.onLoaded) {
        option.onLoaded(data)
      }
    }
  }, [])

  useEffect(() => {
    if (formData?.remember) {
      localStorage.setItem(rememberKey, JSON.stringify(formData))
    } else {
      localStorage.removeItem(rememberKey)
    }
  }, [formData])

  return { formData, setFormData }
}
