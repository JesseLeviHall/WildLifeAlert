/* 
1. Queries are fetches (get)
2. Mutations are changing some kind of data (post)

TODO:
Set up EventListener that listens to network changes. In the browser TanStack Query handles this automatically, but on mobile we need to set it up ourselves. 

example of enabled query:
export function AlertByUser(Props: Props) {
  const userQuery = useQuery({
    queryKey: ['user', alertQuery?.data?.id], //query formed after getting data from alertQuery
    anabled: alertQuery?.data?.id != null //only enabled if alertQuery has data. 
  })
  



  
*/