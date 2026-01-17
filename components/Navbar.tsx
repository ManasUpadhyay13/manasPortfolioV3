"use client";

import { Container } from "@/components/ui/Container";

export function Navbar() {
  return (
    <header className="py-8">
      <Container className="flex items-center justify-between">
        <span className="text-2xl font-bold tracking-tight">
          M
        </span>
        <a
           href="mailto:manasupadhyay1318@gmail.com"
           className="inline-flex items-center justify-center text-sm font-medium text-gray-medium hover:text-foreground transition-colors"
        >
           Get in Touch
        </a>
      </Container>
    </header>
  );
}
