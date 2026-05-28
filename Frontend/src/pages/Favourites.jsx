import React from 'react'
import SnippetsGrid from '../components/SnippetsGrid'

const Favourites = () => {
    return (
        <SnippetsGrid pinnedSnippets={true}/>
    )
}

export default Favourites