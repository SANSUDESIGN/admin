import { getFooterContent } from '@/lib/content';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MotionProvider } from '@/components/motion-provider';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const footerContent = getFooterContent();
  return (
    <MotionProvider>
      <Navigation footerContent={footerContent} />
      {children}
      <Footer content={footerContent} />
    </MotionProvider>
  );
}
