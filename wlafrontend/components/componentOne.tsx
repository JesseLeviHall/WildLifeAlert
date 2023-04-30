import React from 'react'
import { Text, View } from 'react-native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPubData } from '../api/index';

//todo: typescript interface to represent the shape of alert objects

type Props = {}


const ComponentOne = (props: Props) => {
  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ['gePubData'],
    queryFn: getPubData,
    refetchInterval: 10000
  })

  if(postsQuery.isLoading) return <Text>Loading</Text>
  if(postsQuery.isError) return <Text>{JSON.stringify(postsQuery.error)}</Text>

  return (
  <View>
    {postsQuery.data?.map((post: any) => (
      <Text key={post.id}>
        {post.title}, {post.id}
      </Text>
    ))}
  </View>
);

}

export default ComponentOne;