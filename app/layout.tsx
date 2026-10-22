import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Collaborative Whiteboard',
  description: 'Cộng tác vẽ theo thời gian thực với Socket.IO và NestJS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark">
     
      <body>{children}</body>
    </html>
  );
}
