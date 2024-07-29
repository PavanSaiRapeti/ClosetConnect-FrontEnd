
import React from 'react'
import SearchBar from './common/SearchBar'
import IconView from './IconView';


const HeaderComponent = ({pathValue}) => {
 
  return (
    <>
      <div>
        <SearchBar pathValue={pathValue} />
      </div>
      <IconView />
    </>
  )
}

export default HeaderComponent;