import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext'; // Accessing auth context
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/Navigation';
import { FlatList, Pressable, TextInput } from 'react-native-gesture-handler';
import { Exchange } from '@/types';
import exchangeService from '@/services/exchanges.service';
import StyledModal from '@/components/StyledModal';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [refreshingExchanges, setRefreshingExchanges] = useState<boolean>(true);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [exchangeName, setExchangeName] = useState<string>('');

  const refreshExchanges = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'Problem with logged in User');
      return;
    }

    setRefreshingExchanges(true);
    try {
      const data = await exchangeService.list({
        member: user.id,
        owner: user.id,
      });
      setExchanges(data);
    } catch {
      Alert.alert('Error', `Error loading exchanges`);
    }

    setRefreshingExchanges(false);
  };

  useEffect(() => {
    refreshExchanges();
  }, []);

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const goToExchange = (id: number) => {
    navigation.push('Exchange', { exchangeId: id.toString() });
  };

  const handleCreateExchange = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'Problem with logged in User');
      return;
    }

    try {
      await exchangeService.create({
        name: exchangeName,
        owner: user.id,
        members: [user.id],
      });

      Alert.alert('Success', 'Your exchange was created!');
      setModalVisible(false);
      setExchangeName('');
      refreshExchanges();
    } catch {
      Alert.alert('Error', 'Failed to add exchange');
    }
  };

  type ExchangeCardProps = {
    exchange: Exchange;
  };

  const ExchangeCard: React.FC<ExchangeCardProps> = ({ exchange }) => (
    <Pressable onPress={() => goToExchange(exchange.id)}>
      <View style={[styles.container, styles.exchangeCard]}>
        <Text>{exchange.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <>
      <StyledModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
      >
        <Text>Add new exchange</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={exchangeName}
          onChangeText={setExchangeName}
        />
        <Button title="add" onPress={handleCreateExchange} />
      </StyledModal>

      <View style={styles.container}>
        <View
          style={[
            styles._links,
            {
              maxHeight: 50,
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            },
          ]}
        >
          <Text style={styles.text}>Giftr</Text>
          <Button title="Profile" onPress={goToProfile} />
        </View>
        <View
          style={[
            styles._links,
            {
              maxHeight: 50,
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginBottom: 10,
            },
          ]}
        >
          <Text>My Exchanges</Text>
          <Button title="Add" onPress={() => setModalVisible(true)} />
        </View>
        <FlatList
          data={exchanges}
          renderItem={({ item }) => <ExchangeCard exchange={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          refreshing={refreshingExchanges}
          onRefresh={refreshExchanges} // TODO: need to keep track of refreshing state
          ListEmptyComponent={<Text>Nothing to see here.</Text>}
          columnWrapperStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    flex: 1,
    // gap: 0,
  },
  text: {
    fontSize: 20,
    // marginBottom: 20,
  },
  _links: {
    flex: 1,
    flexDirection: 'row',
    // marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exchangeCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa',
    height: 100,
    width: 150,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default HomeScreen;
