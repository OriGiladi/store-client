import React, { useEffect } from 'react'
import { redirect } from 'react-router-dom'

export const  ProductPageError = () =>  {
  useEffect(() => {
    redirect("/")
  }, [])
  
  return (
    <>
    OOPS
    </>
  )
}


