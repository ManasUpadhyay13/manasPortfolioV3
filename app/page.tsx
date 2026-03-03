import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import AboutBento from '@/components/AboutBento';

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground relative selection:bg-gray-200">
            <Navbar />
            <Hero />
            <AboutBento />
            <Experience />
            {/* <Projects /> */}
            <Contact />
            <Footer />
        </main>
    );
}
