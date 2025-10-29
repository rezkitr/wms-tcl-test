import { IStorageData } from '@/types/storage';
import clsx from 'clsx';

interface IProps {
  storage: IStorageData;
}

const StorageInfo = ({ storage }: IProps) => {
  const isNormalTemperature =
    storage.temperature >= -20 && storage.temperature <= -16;

  return (
    <div
      className={clsx(
        'space-y-2 rounded-md p-4',
        isNormalTemperature ? 'bg-blue-500' : 'bg-red-600',
      )}
    >
      <h3 className="text-xl font-semibold text-white">{storage.name}</h3>
      <div className="text-lg font-semibold text-zinc-700">
        {storage.temperature}°C [{isNormalTemperature ? 'Normal' : 'Abnormal'}]
      </div>
    </div>
  );
};

export default StorageInfo;
