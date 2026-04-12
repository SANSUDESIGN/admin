import { getFooterContent } from '@/lib/content';
import { FooterForm } from './FooterForm';

export default function FooterAdminPage() {
  const content = getFooterContent();
  return (
    <div className="p-10 max-w-2xl">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Sección</p>
      <h1 className="text-3xl font-light tracking-tighter mb-10">Footer</h1>
      <FooterForm defaultValues={content} />
    </div>
  );
}
