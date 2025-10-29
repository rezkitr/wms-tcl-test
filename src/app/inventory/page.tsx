'use client';

import { InboundForm, InventoryTable, PageHeaderTitle } from '@/components';
import { IInventoryItemData } from '@/types/inventory';
import { fetchData } from '@/utils/fetchData';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const InventoryPage = () => {
  const { data: inventory, isFetching } = useQuery({
    queryKey: ['inventory'],
    queryFn: () =>
      fetchData<IInventoryItemData[]>('http://localhost:5000/inventory'),
  });

  const [inventoryItems, setInventoryItems] = useState<IInventoryItemData[]>(
    [],
  );
  const [filteredInventoryItems, setFilteredInventoryItems] = useState<
    IInventoryItemData[]
  >([]);
  const [filterNotFound, setFilterNotFound] = useState<boolean>(false);

  const usedItems =
    filteredInventoryItems.length > 0 || filterNotFound
      ? filteredInventoryItems
      : inventoryItems;

  useEffect(() => {
    if (!isFetching && inventory) {
      setInventoryItems(inventory);
    }
  }, [inventory, isFetching]);

  const searchItems = (keyword: string) => {
    if (keyword) {
      const result = inventoryItems.filter(
        (item) =>
          item.sku.toLowerCase().includes(keyword.toLowerCase()) ||
          item.name.toLowerCase().includes(keyword.toLowerCase()),
      );
      setFilteredInventoryItems(result);
      if (result.length === 0) {
        setFilterNotFound(true);
      }
    } else {
      setFilteredInventoryItems([]);
      setFilterNotFound(false);
    }
  };

  const addItem = (item: IInventoryItemData) => {
    setInventoryItems((prev) => [item, ...prev]);
  };

  return (
    <div className="space-y-6">
      <PageHeaderTitle title="Inventory" />
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-12 gap-x-12">
          <div className="col-span-8">
            <InventoryTable items={usedItems} onSearch={searchItems} />
          </div>
          <div className="col-span-4">
            <InboundForm onAddItem={addItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
