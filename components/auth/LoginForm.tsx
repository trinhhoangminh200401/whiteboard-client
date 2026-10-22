'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

type FormValues = z.infer<typeof schema>;


export default function LoginForm() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      setServerError('');
      await login(values);
    } catch (err: any) {
      setServerError(err?.response?.data?.message ?? 'Đăng nhập thất bại');
    }
  };

  return (
  <main className="relative min-h-screen overflow-hidden bg-[#060817] text-white">
    {/* Background gradient */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.22),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(236,72,153,0.12),transparent_35%)]" />

    {/* Grid */}
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:50px_50px]" />

    {/* Decorative blur */}
    <div className="pointer-events-none absolute -left-40 top-20 size-[420px] rounded-full bg-cyan-500/20 blur-[130px]" />
    <div className="pointer-events-none absolute -right-40 bottom-10 size-[460px] rounded-full bg-violet-600/25 blur-[140px]" />

    <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.055] shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left panel */}
        <div className="relative hidden min-h-[700px] overflow-hidden border-r border-white/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-pink-500/10 p-14 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-24 -top-24 size-72 rounded-full border border-cyan-300/20" />
          <div className="absolute -left-4 top-4 size-48 rounded-full border border-violet-300/20" />

          <div className="relative">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                <Sparkles size={19} className="text-white" />
              </div>

              <div>
                <p className="font-mono text-sm font-black tracking-[0.18em]">
                  NEXUS_CORE
                </p>

                <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-cyan-300">
                  SECURITY NETWORK
                </p>
              </div>
            </div>

            <div className="mt-28">
              <p className="mb-5 font-mono text-xs tracking-[0.22em] text-cyan-300">
                SECURE DIGITAL ACCESS
              </p>

              <h1 className="max-w-xl text-6xl font-black leading-[0.95] tracking-[-0.06em] xl:text-7xl">
                Welcome to
                <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
                  your workspace.
                </span>
              </h1>

              <p className="mt-8 max-w-md text-base leading-7 text-slate-300/70">
                Truy cập hệ thống quản lý tập trung với phiên đăng nhập được
                bảo vệ và mã hóa an toàn.
              </p>
            </div>
          </div>

          {/* <div class className="relative grid grid-cols-3 gap-4">
            <StatusCard
              label="SERVER"
              value="ACTIVE"
              color="bg-emerald-400"
            />

            <StatusCard
              label="SECURITY"
              value="AES-256"
              color="bg-cyan-400"
            />

            <StatusCard
              label="LATENCY"
              value="12 MS"
              color="bg-violet-400"
            />
          </div> */}
        </div>

        {/* Login form */}
        <div className="flex min-h-[680px] items-center px-5 py-12 sm:px-10 lg:min-h-[700px] lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10">
              <div className="mb-7 flex items-center gap-3 lg:hidden">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-lg shadow-violet-500/20">
                  <Sparkles size={20} />
                </div>

                <span className="font-mono text-sm font-black tracking-[0.16em]">
                  NEXUS_CORE
                </span>
              </div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] text-cyan-300">
                <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
                SECURE LOGIN
              </div>

              <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Welcome back
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Đăng nhập để tiếp tục quản lý tài khoản và dữ liệu của bạn.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <Input
                id="login-email"
                type="email"
                label="EMAIL ADDRESS"
                placeholder="name@example.com"
                icon={
                  <Mail
                    size={18}
                    className="text-cyan-400"
                  />
                }
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                id="login-password"
                type="password"
                label="PASSWORD"
                placeholder="Nhập mật khẩu"
                icon={
                  <Lock
                    size={18}
                    className="text-violet-400"
                  />
                }
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-white/20 bg-white/5 accent-violet-500"
                  />
                  Ghi nhớ đăng nhập
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {serverError && (
                <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3">
                  <p className="font-mono text-xs font-bold tracking-wider text-rose-300">
                    LOGIN FAILED
                  </p>

                  <p className="mt-1 text-sm text-rose-200/70">
                    {serverError}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                className="group h-14 w-full rounded-xl border-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_15px_35px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(139,92,246,0.35)]"
              >
                LOGIN TO SYSTEM

                {!isSubmitting && (
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-9 border-t border-white/10 pt-7 text-center">
              <p className="text-sm text-slate-400">
                Chưa có tài khoản?{' '}
                <Link
                  href="/register"
                  className="font-bold text-violet-300 transition hover:text-violet-200"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock size={12} />
              Your connection is protected
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  );
}
