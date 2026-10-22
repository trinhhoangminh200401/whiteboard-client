'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LayoutGrid } from 'lucide-react';
import Modal from '@/components/ui/modal';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useWhiteboard } from '@/lib/hooks/useWhiteboard';

const schema = z.object({
  title: z.string().min(1, 'Tên bảng không được để trống').max(80),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateBoardModal({ open, onClose }: Props) {
  const { createBoard } = useWhiteboard();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      setServerError('');
      await createBoard({ title: values.title, visibility: 'LINK_ONLY' });
      reset();
      onClose();
    } catch (err: any) {
      setServerError(err?.response?.data?.message ?? 'Tạo bảng thất bại');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="New Workspace">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <Input
          id="board-title"
          label="Workspace Name"
          placeholder="e.g. Dream Project, Brainstorming..."
          icon={<LayoutGrid size={20} />}
          error={errors.title?.message}
          {...register('title')}
        />

        {serverError && (
          <p className="text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3 font-black uppercase tracking-widest">
            {serverError}
          </p>
        )}

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1 h-14 rounded-2xl">
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} variant="primary" className="flex-1 h-14 rounded-2xl shadow-teal-500/20">
            Create Space
          </Button>
        </div>
      </form>
    </Modal>
  );
}
