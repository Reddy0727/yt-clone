import React from 'react'
import { useParams } from 'react-router-dom'

const WatchPage = () => {
  const {id} = useParams()
  return (
    <div>
      <iframe
                    width="800"
                    height="502"
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
    </div>
  )
}

export default WatchPage
