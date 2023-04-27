import React from 'react'
import { Text } from 'react-native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ['getposts'],
    queryFn: async () => {
      await wait(1000)
      return posts
    }
  })

  const newPost = useMutation({
    mutationKey: 'newpost',
    mutationFn: async (title: string) => {
      await wait(1000).then(() => posts.push({
        id: posts.length + 1,
        title: title,
      }))
      onSuccess: () => {
        queryClient.invalidateQueries('getposts')
      }
    }
  })

  if(postsQuery.isLoading) return <Text>Loading</Text>
  if(postsQuery.isError) return <Text>{JSON.stringify(postsQuery.error)}</Text>

  return (
    <Text>{postsQuery.data}</Text>
  )
}

export default componentOne;