import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Experience } from '@/components/Experience';
import { BlogSection } from '@/components/BlogSection';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground relative selection:bg-gray-200">
            <Navbar />
            <Hero />
            <Experience />
            <BlogSection />
            <Contact />
            <Footer />
        </main>
    );
}
