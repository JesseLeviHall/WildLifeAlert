import React from 'react'
import { Text, View } from 'react-native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPubData } from '../api/index.js';


type Props = {}


const componentOne = (props: Props) => {
  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ['gePubData'],
    queryFn: getPubData
  })

  if(postsQuery.isLoading) return <Text>Loading</Text>
  if(postsQuery.isError) return <Text>{JSON.stringify(postsQuery.error)}</Text>

  return (
    <View>
    <Text>{postsQuery.data.map(post => (
      <Text>{post.title},{post.id}</Text>
    ))}</Text>
    </View>
  )
}

export default componentOne;