'use client';

import { PageHeaderTitle, StorageInfo } from '@/components';
import { IStorageData } from '@/types/storage';
import { fetchData } from '@/utils/fetchData';
import { useQuery } from '@tanstack/react-query';

const DashboardPage = () => {
  const { data: storages, isFetching } = useQuery({
    queryKey: ['storages'],
    queryFn: () => fetchData<IStorageData[]>('http://localhost:5000/storages'),
    refetchInterval: 10000,
  });

  return (
    <div className="space-y-6">
      <PageHeaderTitle title="Storages" />
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {storages?.map((storage) => (
            <StorageInfo key={storage.name} storage={storage} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
