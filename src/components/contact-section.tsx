import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Copy,
  CheckCircle,
} from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import emailjs from '@emailjs/browser';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

export function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSendingEmail(true);
      
      const templateParams = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      };
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
            
      toast({
        title: (
          <div className="flex items-center text-green-500 font-semibold">
            Message sent successfully!
            <CheckCircle className="ml-2 h-5 w-5" />
          </div>
        ),
        description: "Thank you for reaching out. I'll respond within 24 hours.",
      });
      
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again or copy email directly.",
        variant: "destructive",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("abdallahedreeso2@gmail.com");
      setEmailCopied(true);
      toast({
        title: (
          <div className="flex items-center text-blue-400 font-semibold">
            Email copied!
            <CheckCircle className="ml-2 h-5 w-5" />
          </div>
        ),
        description: "Email address has been copied to your clipboard.",
      });
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abdallahedreeso2@gmail.com",
      action: copyEmail,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(+20) 1128616166",
      action: () => window.open("tel:+201128616166"),
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Cairo, Egypt",
      action: () => {},
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/abdallahedreeso",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/abdallahedreeso/",
    },
    {
      icon: Mail,
      label: "Email Direct",
      url: "mailto:abdallahedreeso2@gmail.com",
    },
  ];

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            Direct Communications
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            Let's Build <span className="text-blue-500">Together</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
            Have a project in mind or interested in architectural consulting? Send a message directly or connect via channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form Bento Card */}
          <BentoCard id="contact-form" title="Send a Message" badge="Interactive Form" className="lg:col-span-2">
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-mono text-neutral-400">YOUR NAME *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Abdallah Edrees"
                    className={cn(
                      "bg-neutral-100 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 text-sm focus:border-blue-500 focus:ring-blue-500/20",
                      errors.name && "border-red-500"
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-mono text-neutral-400">EMAIL ADDRESS *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your.email@company.com"
                    className={cn(
                      "bg-neutral-100 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 text-sm focus:border-blue-500 focus:ring-blue-500/20",
                      errors.email && "border-red-500"
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-xs font-mono text-neutral-400">SUBJECT *</Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="Architectural Consultation / New Project Inquiry"
                  className={cn(
                    "bg-neutral-100 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 text-sm focus:border-blue-500 focus:ring-blue-500/20",
                    errors.subject && "border-red-500"
                  )}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-mono text-neutral-400">MESSAGE *</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Details regarding your application requirements, timeline, and tech stack goals..."
                  rows={4}
                  className={cn(
                    "bg-neutral-100 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 text-sm focus:border-blue-500 focus:ring-blue-500/20 resize-none",
                    errors.message && "border-red-500"
                  )}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20 border border-blue-400/30 transition-all duration-300"
                disabled={isSubmitting || !isValid || sendingEmail}
              >
                {isSubmitting || sendingEmail ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Transmitting Message...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </BentoCard>

          {/* Contact Details & Social Links Bento Card */}
          <div className="space-y-6 lg:col-span-1">
            <BentoCard id="contact-channels" title="Direct Channels" badge="Reach Out">
              <div className="space-y-3 mt-2">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    onClick={info.action}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/40 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                        <info.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono block">{info.label}</span>
                        <span className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-blue-500 transition-colors">
                          {info.value}
                        </span>
                      </div>
                    </div>
                    {info.label === "Email" && (
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-neutral-400 hover:text-blue-400">
                        {emailCopied ? <CheckCircle className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono block mb-3 text-center">
                  SOCIAL ARCHITECTURES
                </span>
                <div className="flex justify-center gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 text-neutral-600 dark:text-neutral-300 hover:text-blue-500 transition-all hover:scale-105"
                    >
                      <s.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
