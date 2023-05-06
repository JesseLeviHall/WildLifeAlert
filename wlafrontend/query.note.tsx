/* 
1. Queries are fetches (get)
2. Mutations are changing some kind of data (post)
3. Subscriptions are listening to changes (listen)


example of enabled query:
export function AlertByUser(Props: Props) {
  const userQuery = useQuery({
    queryKey: ['user', alertQuery?.data?.id], //query formed after getting data from alertQuery
    anabled: alertQuery?.data?.id != null //only enabled if alertQuery has data. 
  })
  

*/