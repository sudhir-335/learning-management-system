"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CoursePlayer({ videoUrl, title }) {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: ""
  });

  useEffect(() => {
    axios.post("http://localhost:8000/api/v1/getVdoCipherOTP", { videoId: videoUrl }).then(res => {
      setVideoData(res.data)
    })
  }, [videoUrl])
  return (
    <div style={{ padding: "41%", position: "relative" }}>
      {
        videoData.otp && videoData.playbackInfo !== " " && (


          <iframe src={`https://player.vdociper.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=COiFfHbgurgvD5yf`} style={{
            border: 0,
            width: "80%",
            height: "80%",
            position: "absolute",
            top: 0,
            left: 0
          }} allowFullScreen="true" allow="encrypted-media"></iframe>

        )
      }
    </div >
  )
}

export default CoursePlayer