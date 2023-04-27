import React from 'react'
import { Text } from 'react-native'
import { useQuery, useMutation } from '@tanstack/react-query'

const posts = {
  1: { id: 1, title: 'First Post', content: 'Hello!' },
  2: { id: 2, title: 'Second Post', content: 'More text' },
}

type Props = {}

function wait(duration: number): unknown{
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

const componentOne = (props: Props) => {
  const postsQuery = useQuery({
    queryKey: ['getposts'],
    queryFn: async () => {
      await wait(1000)
      return posts
    }
  })

  if(postsQuery.isLoading) return <Text>Loading</Text>
  if(postsQuery.isError) return <Text>{JSON.stringify(postsQuery.error)}</Text>

  return (
    <Text>{postsQuery.data}</Text>
  )
}

export default componentOne;