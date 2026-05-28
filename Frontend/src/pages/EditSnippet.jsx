import React from 'react'
import SnippetForm from '../components/SnippetForm'

const EditSnippet = () => {
  return (
    <div>
      <SnippetForm 
      isEdit={true} 
      initialData={snippet}
      />
    </div>
  )
}

export default EditSnippet