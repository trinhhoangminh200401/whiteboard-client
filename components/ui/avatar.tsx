import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: string;
}

const sizeMap = { sm: 'w-8 h-8 text-[10px]', md: 'w-11 h-11 text-xs', lg: 'w-14 h-14 text-sm' };

export default function Avatar({ name, avatarUrl, size = 'md', className, color }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name}
        className={cn('rounded-full object-cover ring-4 ring-white/5 border border-white/5', sizeMap[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-black text-white ring-4 ring-white/5 border border-white/10 backdrop-blur-md',
        sizeMap[size],
        className
      )}
      style={{ backgroundColor: color ?? '#0D9488' }}
      title={name}
    >
      {initials}
    </div>
  );
}
