'use client';

import { IInventoryItemData } from '@/types/inventory';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';

interface IProps {
  items: IInventoryItemData[];
  // eslint-disable-next-line no-unused-vars
  onSearch: (keyword: string) => void;
}

const InventoryTable = ({ items, onSearch }: IProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="keyword">Search</label>
        <div className="flex items-center gap-x-2">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="SKU/Name"
            className="w-64"
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
          />
          <button
            className="rounded-md bg-blue-300 px-2 disabled:cursor-not-allowed disabled:bg-zinc-400"
            onClick={() => onSearch(searchKeyword)}
            disabled={searchKeyword.length === 0}
          >
            Submit
          </button>
          {searchKeyword.length > 0 && (
            <button
              className="rounded-md bg-zinc-300 px-2"
              onClick={() => {
                setSearchKeyword('');
                onSearch('');
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <div>
        <table className="w-full">
          <thead className="bg-zinc-400 text-left">
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Batch</th>
              <th>Expiry</th>
              <th>Qty</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const expiryDate = dayjs(item.expiry);
              const isExpiryLessThan30d = expiryDate.diff(dayjs(), 'day') <= 30;
              return (
                <tr key={item.sku} className="border-b border-zinc-500">
                  <td>{item.sku}</td>
                  <td>{item.name}</td>
                  <td>{item.batch}</td>
                  <td className={clsx(isExpiryLessThan30d && 'bg-red-400')}>
                    {dayjs(item.expiry).format('MMM DD, YYYY')}
                  </td>
                  <td>{item.qty}</td>
                  <td>{item.location}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
