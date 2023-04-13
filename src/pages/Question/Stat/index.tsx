import React from 'react'
import { useQuestionnaireDetail } from '../hooks/useQuestionnaire'
export default function Stat() {
  const { loading, data } =  useQuestionnaireDetail()
  return <div>
    <p>Stat Page</p>
    {
      loading ? <p>loading</p> : JSON.stringify(data)
    }
  </div>
}
