import React from 'react'
import { Center, HStack, VStack, Text, Skeleton } from 'native-base'

type Props = {}

const SkeletonComp = (props: Props) => {
  return (
     <Center w="100%" h="100%">
      <HStack w="90%" h="90%" maxW="400" borderWidth="0" space={8} rounded="lg" >
        <VStack flex="3" space="4" marginTop={24}>
          <HStack space="2" alignItems="center">
            <Skeleton h="6" flex="2" rounded="full" startColor="#24008CFF"/>
            <Skeleton h="6" flex="1" rounded="full" startColor="#24008CFF" />
          </HStack>
              <Skeleton.Text  startColor="#FF00F5FF" speed={.5} endColor="#24008CFF" lines={4}  />
        </VStack>
      
      </HStack>
      </Center>
  )
}

export default SkeletonComp