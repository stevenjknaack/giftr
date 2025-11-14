import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ExchangeTabsParamList } from '@/navigation/Navigation'; // Adjust the import path as needed
import ExchangeApi from '@/services/exchanges.service';
import { Exchange } from '@/types';

type ExchangeGeneralScreenProps = {
  route: RouteProp<ExchangeTabsParamList, 'General'>;
};

const ExchangeGeneralScreen: React.FC<ExchangeGeneralScreenProps> = ({
  route,
}) => {
  const { exchangeId } = route.params;
  const [data, setData] = useState<Exchange | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    await setLoading(true);
    await setData((await ExchangeApi.get(parseInt(exchangeId))).data);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, [exchangeId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exchange {exchangeId}</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
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
});

export default ExchangeGeneralScreen;
