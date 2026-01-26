import { StickyHeader } from '@/components/StickyHeader';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function SubPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground relative selection:bg-gray-200 flex flex-col">
            <StickyHeader />
            <main className="flex-1">{children}</main>
            <Contact />
            <Footer />
        </div>
    );
}
