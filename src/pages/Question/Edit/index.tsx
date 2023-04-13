import React from 'react'
import { useQuestionnaireDetail } from '../hooks/useQuestionnaire'
export default function Edit() {
  const { loading, data } =  useQuestionnaireDetail()
  return <div>
    <p>Edit Page</p>
    {
      loading ? <p>loading</p> : JSON.stringify(data)
    }
  </div>
}
