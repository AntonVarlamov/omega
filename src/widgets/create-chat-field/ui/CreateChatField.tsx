import { FC, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { createChat } from '../model/createChatSlice.ts';

import { useAppDispatch } from '@/app/store.ts';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { TextInput } from '@/widgets/create-chat-field/ui/TextInput/TextInput.tsx';

type ErrorsFields = {
  name: null | string;
  description: null | string;
  price: null | string;
};
export const CreateChatField: FC = () => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<ErrorsFields>({
    name: null,
    description: null,
    price: null,
  });
  const [image, setImage] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedUpdateParams: typeof updateParams = useDebounce(updateParams, 300);
  const enumFields = new Set(['price', 'description', 'name']);
  const name = searchParams.get('name');
  const description = searchParams.get('description');
  const price = searchParams.get('price');

  function updateParams(input: HTMLInputElement) {
    setSearchParams((prev) => {
      prev.set(input.name, input.value);
      if (input.value === '') {
        prev.delete(input.name);
      }

      return new URLSearchParams(prev);
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);

        const name = data.get('name') as string | null;
        const price = data.get('price') as string | null;
        const description = data.get('description') as string | null;

        const newErrors = { ...errors };

        if (!name || name.length === 0) {
          newErrors.name = 'Имя не должно быть пустым';
        } else {
          newErrors.name = null;
        }

        if (!price || price.length === 0) {
          newErrors.price = 'Цена не должна быть пустой';
        } else {
          newErrors.price = null;
        }

        if (!description || description.length === 0) {
          newErrors.description = 'Цена не должна быть пустой';
        } else {
          newErrors.description = null;
        }

        if (name && description && price && image) {
          dispatch(
            createChat({
              Name: name,
              Description: description,
              Price: Number(price),
              Image: image,
            }),
          );
          const form = e.target as HTMLFormElement;

          form.querySelectorAll('input').forEach((input) => {
            const copyInput = input;

            copyInput.value = '';
            setImage(null);
          });
        }

        setErrors(newErrors);
      }}
      onChange={(e) => {
        if ('name' in e.target && enumFields.has(e.target.name as string)) {
          debouncedUpdateParams(e.target as HTMLInputElement);
        } else if ('name' in e.target && e.target.name === 'file') {
          const files = (e.target as HTMLInputElement).files || [];
          const reader = new FileReader();

          if (files.length > 0) {
            const file = files[0];

            reader.readAsDataURL(file);

            reader.onload = function () {
              setImage(reader.result as string);
            };
          }
        }
      }}
      className="flex flex-col gap-16"
    >
      <div className="border border-dashed rounded-sm border-gray-200 relative w-[334px] h-[334px] flex justify-center items-center hover:bg-gray-300">
        {!!image && (
          <img className="absolute w-full h-full -z-10 opacity-20" src={image} alt="" />
        )}
        <div className="flex flex-col gap-2 items-center text-gray-500">
          <span>+</span>
          <span>{!image ? 'Upload image' : 'Upload another image'}</span>
        </div>
        <input
          type="file"
          className="block absolute h-full w-full opacity-0 top-0 cursor-pointer"
          name="file"
          accept="image/png, image/jpeg"
        />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <rect width={100} height={100} />
          <TextInput
            value={name || ''}
            id="name-create"
            name="name"
            placeholder="Enter your name"
            label="Name"
            error={errors.name}
          />
          <TextInput
            value={description || ''}
            id="description-create"
            name="description"
            placeholder="Enter your email"
            label="Description"
            error={errors.description}
          />
          <TextInput
            value={price || ''}
            id="price-create"
            name="price"
            placeholder="Enter your price"
            label="Price"
            type="number"
            error={errors.price}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-indigo-500 p-1.5 min-w-40 m-auto rounded hover:bg-indigo-600 active:scale-90"
        >
          Save
        </button>
      </div>
    </form>
  );
};
