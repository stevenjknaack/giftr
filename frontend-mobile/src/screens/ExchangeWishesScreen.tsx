import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ExchangeTabsParamList } from '@/navigation/Navigation'; // Adjust the import path as needed
import { Wish } from '@/api/types';
import WishApi from '@/api/wishes';
import { useAuth } from '@/contexts/AuthContext';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import StyledModal from '@/generic-components/StyledModal';

type ExchangeWishesScreenProps = {
  route: RouteProp<ExchangeTabsParamList, 'Wishes'>;
};

const ExchangeWishesScreen: React.FC<ExchangeWishesScreenProps> = ({
  route,
}) => {
  const { user } = useAuth();
  const { exchangeId } = route.params;
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create');
  const [wishName, setWishName] = useState<string>('');
  const [wishUrl, setWishUrl] = useState<string>('');
  const [editWishId, setEditWishId] = useState<number | null>(null);

  const refreshWishes = async () => {
    await setRefreshing(true);

    const response = await WishApi.list({
      exchange: exchangeId,
      user: user?.id.toString(),
    });

    if (response.status !== 200) {
      Alert.alert('Api Error');
    } else {
      setWishes(response.data);
    }
    setRefreshing(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setWishName('');
    setWishUrl('');
  };

  useEffect(() => {
    refreshWishes();
  }, [exchangeId]);

  const handleCreateWish = async () => {
    if (wishName === '') {
      Alert.alert('Error', 'Please add a name');
      return;
    }

    const response = await WishApi.create({
      name: wishName,
      url: wishUrl || null,
      user: user?.id ?? -1,
      exchange: parseInt(exchangeId),
    });

    if (response.status !== 201) {
      Alert.alert('Api Error', 'Failed to create wish');
      return;
    }

    Alert.alert('Success', 'Wish successfully created');
    closeModal();
    refreshWishes();
  };

  const handleUpdateWish = async (id: number) => {
    if (wishName === '') {
      Alert.alert('Error', 'Please add a name');
      return;
    }

    const response = await WishApi.partialUpdate(id, {
      name: wishName,
      url: wishUrl || null,
    });

    if (response.status !== 200) {
      Alert.alert('Api Error', 'Failed to update wish');
      return;
    }

    Alert.alert('Success', 'Wish successfully updated');
    closeModal();
    setEditWishId(null);
    refreshWishes();
  };

  const handleDeleteWish = async (id: number) => {
    const response = await WishApi.delete(id);

    if (response.status !== 204) {
      Alert.alert('Api Error', 'Failed to delete wish');
      return;
    }

    Alert.alert('Success', 'Wish successfully deleted');
    refreshWishes();
  };

  type WishCardProps = {
    wish: Wish;
  };

  const WishCard: React.FC<WishCardProps> = ({ wish }) => {
    return (
      <View
        style={{
          backgroundColor: '#aaa',
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>{wish.name}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              title="edit"
              onPress={() => {
                setWishName(wish.name);
                setWishUrl(wish.url ?? '');
                setModalMode('update');
                setEditWishId(wish.id);
                setModalVisible(true);
              }}
            />
            <Button title="delete" onPress={() => handleDeleteWish(wish.id)} />
          </View>
        </View>
        <Text>Since {new Date(wish.created_at).toLocaleDateString()}</Text>
        <Text>Url: {wish.url || 'No url yet!'}</Text>
      </View>
    );
  };

  if (refreshing) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <>
      <StyledModal visible={modalVisible} closeModal={closeModal}>
        <Text style={{ marginBottom: 15 }}>{modalMode} Wish</Text>
        <Text>Name</Text>
        <TextInput
          value={wishName}
          onChangeText={setWishName}
          placeholder="Name"
          style={styles.input}
        />
        <Text>Url</Text>
        <TextInput
          value={wishUrl}
          onChangeText={setWishUrl}
          placeholder="Url"
          style={styles.input}
        />
        <Button
          title={modalMode}
          onPress={() => {
            if (modalMode === 'create') handleCreateWish();
            else handleUpdateWish(editWishId || -1);
          }}
        />
      </StyledModal>

      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            maxHeight: 50,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <Text style={styles.title}>Exchange {exchangeId} Wishes</Text>
          <Button
            title="Add"
            onPress={() => {
              setModalMode('create');
              setModalVisible(true);
            }}
          />
        </View>
        <FlatList
          data={wishes}
          renderItem={({ item }) => <WishCard wish={item} />}
          refreshing={refreshing}
          onRefresh={refreshWishes}
          ListEmptyComponent={<Text>No Wishes Yet</Text>}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: 150,
  },
});

export default ExchangeWishesScreen;
