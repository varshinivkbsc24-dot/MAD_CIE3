import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

const OrderHistoryScreen = ({ navigation }) => {
  const [orders] = useState([
    {
      id: '1',
      date: '2024-12-15',
      time: '2:30 PM',
      items: ['Italian BMT', 'Meatball Marinara'],
      total: 24.99,
      status: 'Delivered',
    },
    {
      id: '2',
      date: '2024-12-10',
      time: '6:15 PM',
      items: ['Turkey Breast', 'Sweet Onion Chicken Teriyaki'],
      total: 28.50,
      status: 'Delivered',
    },
    {
      id: '3',
      date: '2024-12-05',
      time: '12:45 PM',
      items: ['Veggie Delite', 'Cold Cut Combo'],
      total: 19.99,
      status: 'Delivered',
    },
    {
      id: '4',
      date: '2024-11-28',
      time: '7:00 PM',
      items: ['Steak & Cheese', 'Spicy Italian'],
      total: 31.48,
      status: 'Delivered',
    },
    {
      id: '5',
      date: '2024-11-20',
      time: '1:20 PM',
      items: ['Tuna'],
      total: 15.99,
      status: 'Delivered',
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => setSelectedOrder(selectedOrder?.id === item.id ? null : item)}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderDate}>{item.date}</Text>
          <Text style={styles.orderTime}>{item.time}</Text>
        </View>
        <View style={styles.orderStatus}>
          <Text style={[styles.statusBadge, styles.deliveredBadge]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.itemCount}>{item.items.length} item{item.items.length > 1 ? 's' : ''}</Text>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
      </View>

      {selectedOrder?.id === item.id && (
        <View style={styles.expandedContent}>
          <View style={styles.itemsList}>
            {item.items.map((itemName, index) => (
              <View key={index} style={styles.expandedItem}>
                <Text style={styles.expandedItemText}>• {itemName}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.reorderButton}>
              <Text style={styles.reorderButtonText}>🔄 Reorder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const emptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📦</Text>
      <Text style={styles.emptyText}>No Orders Yet</Text>
      <Text style={styles.emptySubtext}>Start ordering from our menu to see your order history</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={styles.headerSpace} />
      </View>

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        emptyComponent()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#005e32',
  },
  backButton: {
    fontSize: 28,
    color: '#005e32',
    fontWeight: 'bold',
  },
  headerSpace: {
    width: 30,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#005e32',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  orderTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  orderStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deliveredBadge: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#005e32',
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  itemsList: {
    marginBottom: 16,
  },
  expandedItem: {
    paddingVertical: 6,
  },
  expandedItemText: {
    fontSize: 14,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  reorderButton: {
    flex: 1,
    backgroundColor: '#005e32',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default OrderHistoryScreen;
