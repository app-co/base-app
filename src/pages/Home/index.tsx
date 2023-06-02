/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Box } from 'native-base';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';

import { colecao } from '../../collection';
import { Header } from '../../components/Header';
import { ListPost } from '../../components/ListPost';
import { IPostsDtos, IProfileDto, IUserDtos } from '../../dtos';
import theme from '../../global/styles/theme';
import { api } from '../../services/api';
import { ButonPost, Container, Flat } from './styles';

export interface Res {
  post: IPostsDtos;
  user: IUserDtos;
}

export function Home() {
  const navigation = useNavigation();

  const [post, setPost] = useState<Res[]>([]);
  // const [users, setUsers] = React.useState<IUserDtos[]>([]);
  const [state, setState] = useState(false);
  const [load, setLoad] = useState(true);

  const navigateToPost = useCallback(() => {
    navigation.navigate('Post');
  }, [navigation]);

  const posts = React.useCallback(async () => {
    await api
      .get('/user/list-all-user')
      .then(async us => {
        const users = us.data as IUserDtos[];

        await api
          .get('/post')
          .then(h => {
            const rs = h.data as IPostsDtos[];
            const fil = rs
              .filter(p => {
                if (p !== null) {
                  return p;
                }
              })
              .map(p => {
                const filuser = users.find(u => u.id === p.fk_id_user);

                if (filuser) {
                  if (filuser.id === p.fk_id_user) {
                    const date = new Date(p.created_at).getTime();
                    return {
                      post: {
                        ...p,
                        date,
                      },
                      user: filuser,
                    };
                  }
                }
              })
              .sort((a, b) => {
                return b.post.date - a.post.date;
              });

            const postfil = fil.filter(p => p !== undefined);

            setPost(postfil);
          })

          .catch(h => {
            console.log('erro ao carregar post na lela home', h);
            Alert.alert('Erro', h.response.message);
          })
          .finally(() => setLoad(false));
      })
      .catch(h => console.log(h.response.data, h));
  }, []);

  useFocusEffect(
    useCallback(() => {
      posts();
    }, [posts]),
  );

  const handleLike = useCallback(async (id: string) => {
    await api.post('/post/like', {
      fk_id_post: id,
    });
  }, []);

  if (!post) {
    <ActivityIndicator />;
  }

  return (
    <Container>
      <Header />

      <FlatList
        data={post}
        keyExtractor={p => p.post.id}
        renderItem={({ item: h }) => (
          <Box>
            <ListPost
              state={state}
              presLike={() => handleLike(h.post.id)}
              avater={h.user.profile.avatar}
              user_name={h.user.nome}
              image={h.post.image}
              descriçao={h.post.description}
              like={h.post.like.length + 1}
            />
          </Box>
        )}
      />
      <ButonPost onPress={navigateToPost}>
        <AntDesign name="plus" size={35} color={theme.colors.primary} />
      </ButonPost>
    </Container>
  );
}
