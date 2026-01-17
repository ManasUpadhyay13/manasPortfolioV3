"use client";

import { Container } from "./ui/Container";
import { Section } from "./ui/Section";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <Section id="contact" className="py-24 md:py-32 bg-gray-50">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ready to build something <span className="text-gray-medium">remarkable?</span>
          </h2>
          <p className="text-xl text-gray-medium">
            I&apos;m currently available for freelance projects and advisory roles.
            Let&apos;s discuss how we can work together.
          </p>
          <div className="pt-4">
            <a
              href="mailto:contact@manas.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
