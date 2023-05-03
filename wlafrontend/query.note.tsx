/* 
1. Queries are fetches (get)
2. Mutations are changing some kind of data (post)

TODO:
Set up EventListener that listens to network changes. In the browser TanStack Query handles this automatically, but on mobile we need to set it up ourselves. 







import * as React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { StackNavigationProp } from '@react-navigation/stack';
import { LoadingIndicator } from '@app/components/LoadingIndicator';
import { ErrorMessage } from '@app/components/ErrorMessage';
import { Divider } from '@app/components/Divider';
import { ListItem } from '@app/components/ListItem';
import { useRefreshByUser } from '@app/hooks/useRefreshByUser';
import { useRefreshOnFocus } from '@app/hooks/useRefreshOnFocus';
import { fetchMovies, Movie } from '@app/lib/api';
import { MoviesStackNavigator } from '@app/navigation/types';

type MoviesListScreenNavigationProp = StackNavigationProp<
  MoviesStackNavigator,
  'MoviesList'
>;

type Props = {
  navigation: MoviesListScreenNavigationProp;
};

export function MoviesListScreen({ navigation }: Props) {
  const { isLoading, error, data, refetch } = useQuery<Movie[], Error>(
    ['movies'],
    fetchMovies
  );
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const onListItemPress = React.useCallback(
    (movie) => {
      navigation.navigate('MovieDetails', {
        movie,
      });
    },
    [navigation]
  );

  const renderItem = React.useCallback(
    ({ item }) => {
      return <ListItem item={item} onPress={onListItemPress} />;
    },
    [onListItemPress]
  );

  if (isLoading) return <LoadingIndicator />;

  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      ItemSeparatorComponent={() => <Divider />}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    ></FlatList>
  );
}
*/