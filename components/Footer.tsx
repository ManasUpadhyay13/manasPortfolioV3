import { Container } from "./ui/Container";

export function Footer() {
  return (
    <footer className="py-8 border-t border-gray-100">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-medium">
        <div>
          &copy; {new Date().getFullYear()} Manas Upadhyay. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
           <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
           <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
           <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
        </div>
      </Container>
    </footer>
  );
}
