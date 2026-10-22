import Avatar from '@/components/ui/avatar';
import type { WhiteboardMember } from '@/types/whiteboard';
import { randomColor } from '@/lib/utils';

interface Props {
  members: WhiteboardMember[];
}

const roleLabel: Record<string, string> = {
  OWNER: 'Chủ sở hữu',
  EDITOR: 'Biên tập',
  VIEWER: 'Xem',
};

const roleColor: Record<string, string> = {
  OWNER: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  EDITOR: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
  VIEWER: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

export default function MemberList({ members }: Props) {
  return (
    <aside className="w-64 shrink-0 flex flex-col gap-1 p-4 border-l border-white/10 bg-slate-950/50 overflow-y-auto">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Thành viên ({members.length})
      </h3>
      {members.map((m) => (
        <div key={m.userId} className="flex items-center gap-2.5 py-2 px-2 rounded-xl hover:bg-white/5">
          <Avatar
            name={m.user?.displayName ?? 'Unknown'}
            avatarUrl={m.user?.avatarUrl}
            size="sm"
            color={randomColor()}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{m.user?.displayName ?? 'Unknown'}</p>
            <span className={`text-xs px-1.5 py-0.5 rounded border ${roleColor[m.role]}`}>
              {roleLabel[m.role]}
            </span>
          </div>
        </div>
      ))}
    </aside>
  );
}
