import React from 'react'
import { Text } from 'react-native';
import { getAlertDetails } from '../../api/index.js';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: number
}

const AlertDetails = (props: Props) => {
  const AlertDetailsQuery = useQuery({
    queryKey: ['AlertDetails', id],
    queryFn: () => getAlertDetails(id),
  })

  if(AlertDetailsQuery.status === 'loading') return <Text>Loading</Text>
  if(AlertDetailsQuery.status === 'error') return <Text>{JSON.stringify(AlertDetailsQuery.error)}</Text>

  return (
    <Text>AlertDetails</Text>
  )
}

export default AlertDetails