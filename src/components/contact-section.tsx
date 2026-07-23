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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";

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
          <div className="flex items-center gap-2">
            <span>Message transmitted successfully!</span>
            <CheckCircle className="h-5 w-5 text-emerald-400" />
          </div>
        ),
        description: "Thank you for reaching out. I will respond within 24 hours.",
      });

      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Transmission failed",
        description: "There was an issue sending your message. Please try again.",
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
          <div className="flex items-center gap-2">
            <span>Email copied to clipboard</span>
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          </div>
        ),
        description: "abdallahedreeso2@gmail.com copied successfully.",
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
      label: "Email",
      url: "mailto:abdallahedreeso2@gmail.com",
    },
  ];

  return (
    <section id="contact" className="w-full h-full pt-20 pb-20 px-4 lg:px-8 overflow-y-auto allow-inner-scroll">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Get In <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Open for high-impact frontend architectural opportunities, collaborations, and technological discussions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-primary/20 bg-card/60 backdrop-blur-md shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-primary">Send a Direct Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs">Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Your full name"
                        className={cn(
                          "bg-background/50 border-primary/20 text-xs transition-colors",
                          errors.name && "border-destructive"
                        )}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your.email@example.com"
                        className={cn(
                          "bg-background/50 border-primary/20 text-xs transition-colors",
                          errors.email && "border-destructive"
                        )}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-xs">Subject *</Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="Project opportunity / Inquiry"
                      className={cn(
                        "bg-background/50 border-primary/20 text-xs transition-colors",
                        errors.subject && "border-destructive"
                      )}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Share project scope or message..."
                      rows={4}
                      className={cn(
                        "bg-background/50 border-primary/20 text-xs resize-none transition-colors",
                        errors.message && "border-destructive"
                      )}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-xs"
                    disabled={isSubmitting || !isValid || sendingEmail}
                  >
                    {sendingEmail ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-3.5 w-3.5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="border-primary/20 bg-card/60 backdrop-blur-md shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-primary">Direct Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    onClick={info.action}
                    className="flex items-center gap-3 p-3 rounded-lg border border-primary/10 bg-background/30 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <info.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-foreground">{info.label}</h4>
                      <p className="text-xs text-muted-foreground truncate">{info.value}</p>
                    </div>
                    {info.label === "Email" && (
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        {emailCopied ? (
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/60 backdrop-blur-md shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-primary">Connect & Follow</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-around items-center pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-background/50 border border-primary/20 text-foreground hover:text-primary hover:border-primary/60 hover:bg-primary/10 hover:scale-110 transition-all duration-200"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
