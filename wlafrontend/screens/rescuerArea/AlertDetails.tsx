import React from 'react'
import { Text } from 'react-native';
import { getAlertDetails } from '../../api/index';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: number
}

const AlertDetails = (props: Props) => {
  

  

  return (
    <Text>AlertDetails</Text>
  )
}

export default AlertDetails

/* const AlertDetailsQuery = useQuery({
    queryKey: ['AlertDetails', id],
    queryFn: () => getAlertDetails(id),
  })
  if(AlertDetailsQuery.status === 'loading') return <Text>Loading</Text>
  if(AlertDetailsQuery.status === 'error') return <Text>{JSON.stringify(AlertDetailsQuery.error)}</Text>
  */