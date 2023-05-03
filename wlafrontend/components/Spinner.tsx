import React from 'react'
import { HStack, Spinner } from 'native-base'

type Props = {}

const SpinnerComp = (props: Props) => {
  return (
   <HStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading Alerts" size="lg" />
    </HStack>
  )
  }

export default SpinnerComp