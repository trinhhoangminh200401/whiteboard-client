'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  CircleAlert,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';

const schema = z
  .object({
    displayName: z
      .string()
      .min(2, 'Tên hiển thị tối thiểu 2 ký tự'),

    email: z
      .string()
      .min(1, 'Vui lòng nhập email')
      .email('Email không hợp lệ'),

    password: z
      .string()
      .min(6, 'Mật khẩu tối thiểu 6 ký tự'),

    confirmPassword: z
      .string()
      .min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine(
    (values) => values.password === values.confirmPassword,
    {
      message: 'Mật khẩu xác nhận không khớp',
      path: ['confirmPassword'],
    },
  );

type FormValues = z.infer<typeof schema>;

export default function RegisterForm() {
  const { register: createAccount } = useAuth();

  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setServerError('');

      await createAccount({
        name: values.displayName,
        email: values.email,
        password: values.password,
      });
    } catch (err: any) {
      setServerError(
        err?.response?.data?.message ??
          err?.response?.data?.error?.message ??
          'Không thể tạo tài khoản',
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070817] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bgles-none">
        <div className="absolute -left-40 top-10 size-[500px] rounded-full bg-cyan-500/15 blur-[150px]" />

        <div className="absolute -right-40 bottom-0 size-[520px] rounded-full bg-violet-600/20 blur-[160px]" />

        <div className="absolute left-1/2 top-1/2 size-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[150px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.055] shadow dold-2xl shadow-black/40 backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left panel */}
          <aside className="relative hidden min-h-[760px] overflow-hidden border-r border-white/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-pink-500/10 p-12 lg:flex lg:flex-col lg:justify-between xl:p-16">
            <div className="absolute -left-24 -top-24 size-72 rounded-full border border-cyan-300/15" />

            <div className="absolute -left-5 top-4 size-48 rounded-full border border-violet-300/15" />

            <div className="relative">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                  <Sparkles size={19} />
                </div>

                <div>
                  <p className="font-mono text-sm font-black tracking-[0.18em]">
                    WHITEBOARD
                    <span className="text-cyan-300">_PRO</span>
                  </p>

                  <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-white/35">
                    CREATIVE WORKSPACE
                  </p>
                </div>
              </div>

              <div className="mt-28">
                <p className="mb-5 font-mono text-xs tracking-[0.2em] text-cyan-300">
                  CREATE YOUR WORKSPACE
                </p>

                <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.055em] xl:text-6xl">
                  Start creating
                  <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
                    without limits.
                  </span>
                </h1>

                <p className="mt-7 max-w-md text-base leading-7 text-slate-300/65">
                  Tạo tài khoản để thiết kế, chia sẻ ý tưởng và cộng tác cùng
                  đội nhóm trong một không gian duy nhất.
                </p>
              </div>
            </div>

          </aside>

          {/* Register panel */}
          <div className="flex min-h-[720px] items-center px-5 py-10 sm:px-10 lg:min-h-[760px] lg:px-14 xl:px-16">
            <div className="mx-auto w-full max-w-xl">
              {/* Mobile brand */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-lg shadow-violet-500/20">
                  <Sparkles size={20} />
                </div>

                <span className="font-mono text-sm font-black tracking-[0.15em]">
                  WHITEBOARD_PRO
                </span>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5">
                  <span className="size-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_#c4b5fd]" />

                  <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-violet-300">
                    CREATE ACCOUNT
                  </span>
                </div>

                <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  Tạo tài khoản mới
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Điền thông tin để bắt đầu sử dụng WhiteboardPro.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-5"
                noValidate
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    id="reg-name"
                    type="text"
                    label="Tên hiển thị"
                    placeholder="Nguyễn Văn A"
                    autoComplete="name"
                    icon={
                      <User
                        size={17}
                        className="text-violet-400"
                      />
                    }
                    error={errors.displayName?.message}
                    {...register('displayName')}
                  />

                  <Input
                    id="reg-email"
                    type="email"
                    label="Địa chỉ email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    icon={
                      <Mail
                        size={17}
                        className="text-cyan-400"
                      />
                    }
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    id="reg-password"
                
                    type="password"
                    label="Mật khẩu"
                    placeholder="Tối thiểu 6 ký tự"
                    autoComplete="new-password"
                    icon={
                      <Lock
                        size={17}
                        className="text-indigo-400"
                      />
                    }
                    error={errors.password?.message}
                    {...register('password')}
                  />

                  <Input
                    id="reg-confirm"
                    type="password"
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    autoComplete="new-password"
                    icon={
                      <ShieldCheck
                        size={17}
                        className="text-pink-400"
                      />
                    }
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                  />
                </div>

                {serverError && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3"
                  >
                    <CircleAlert
                      size={18}
                      className="mt-0.5 shrink-0 text-rose-400"
                    />

                    <div>
                      <p className="text-sm font-semibold text-rose-300">
                        Không thể tạo tài khoản
                      </p>

                      <p className="mt-1 text-sm text-rose-200/70">
                        {serverError}
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="group mt-1 h-14 w-full rounded-xl border-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-sm font-bold text-white shadow-[0_15px_35px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(139,92,246,0.35)]"
                >
                  {isSubmitting ? (
                    'Đang tạo tài khoản...'
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Tạo tài khoản

                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  )}
                </Button>

                <p className="px-4 text-center text-xs leading-5 text-slate-500">
                  Bằng việc tạo tài khoản, bạn đồng ý với điều khoản sử dụng và
                  chính sách bảo mật của WhiteboardPro.
                </p>
              </form>

              <div className="mt-6 border-t border-white/10 pt-6 text-center">
                <p className="text-sm text-slate-400">
                  Đã có tài khoản?{' '}
                  <Link
                    href="/login"
                    className="font-semibold text-cyan-300 transition hover:text-cyan-200"
                  >
                    Đăng nhập ngay
                  </Link>
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={13} />
                Thông tin của bạn được mã hóa an toàn
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
