'use client';

import { IInventoryItemData } from '@/types/inventory';
import { ILocationData } from '@/types/location';
import { fetchData } from '@/utils/fetchData';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IProps {
  onAddItem: (v: IInventoryItemData) => void;
}

const InboundForm = ({ onAddItem }: IProps) => {
  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: () => fetchData<ILocationData[]>('http://localhost:5000/location'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IInventoryItemData>();

  const onSubmit = (values: IInventoryItemData) => {
    onAddItem(values);
    toast.success('Item added successfully!');
    reset();
  };

  return (
    <div className="space-y-4 rounded-md bg-zinc-300 p-4">
      <h3 className="font-semibold">Inbound Form</h3>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            {...register('sku', { required: 'SKU is required' })}
          />
          {errors.sku && (
            <p className="input-error-msg">{errors.sku.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="input-error-msg">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="batch">Batch</label>
          <input
            type="text"
            id="batch"
            {...register('batch', { required: 'Batch is required' })}
          />
          {errors.batch && (
            <p className="input-error-msg">{errors.batch.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="expiry">Expiry</label>
          <input
            type="date"
            id="expiry"
            {...register('expiry', {
              required: 'Expiry date is required',
              validate: (value) => {
                const selectedDate = dayjs(value);
                const today = dayjs().startOf('day');
                return (
                  selectedDate.isSame(today) ||
                  selectedDate.isAfter(today) ||
                  'Expiry date must be today or later'
                );
              },
            })}
          />
          {errors.expiry && (
            <p className="input-error-msg">{errors.expiry.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="qty">Qty</label>
          <input
            type="number"
            id="qty"
            {...register('qty', {
              required: 'Qty is required',
              min: { value: 1, message: 'Min. 1' },
            })}
          />
          {errors.qty && (
            <p className="input-error-msg">{errors.qty.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="location">Location</label>
          <select
            defaultValue=""
            {...register('location', { required: 'Location is required' })}
          >
            <option value="" disabled>
              -
            </option>
            {locations?.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.label}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="input-error-msg">{errors.location.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-400 px-4 py-1 font-semibold text-white"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default InboundForm;
