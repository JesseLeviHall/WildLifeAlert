import React from 'react'
import { Text } from 'react-native'

type Props = {}

function wait(duration: number): void{
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

const componentOne = (props: Props) => {
  return (
    <Text>componentOne</Text>
  )
}

export default componentOne;