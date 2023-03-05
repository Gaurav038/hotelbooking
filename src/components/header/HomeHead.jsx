import React from 'react'
import head from "../../images/Sea.mp4"


function HomeHead() {
  return (
    <section className='homeHead'>
        <div className='overlay'>

        </div>
        <video style={{width:'100%'}} src={head} muted autoPlay loop type="video/mp4" />

        <div className='homeContent container'>
            <div className='textDiv' >
                <h1 className="homeTitle">
                    Search Your Hotels...
                </h1>
                <span className="smallText">
                    Our packages 
                </span>
            </div>
        </div>
    </section>   
  )
}

export default HomeHead