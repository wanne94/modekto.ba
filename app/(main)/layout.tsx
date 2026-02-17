import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ChatBubbleWrapper from '@/components/ChatBubbleWrapper';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ChatBubbleWrapper />
    </>
  );
}
