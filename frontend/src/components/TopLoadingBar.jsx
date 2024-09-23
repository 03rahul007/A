import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

const TopLoadingBar = () => {
     const [progress, setProgress] = useState(0)
  return (
     <div>
      <LoadingBar
        color='#50C878'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <br />
    </div>
  )
}

export default TopLoadingBar