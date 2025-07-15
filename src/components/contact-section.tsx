import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(100, "Subject must be less than 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false)
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange"
  })

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    })

    reset()
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("abdallah.edrees@example.com")
      setEmailCopied(true)
      toast({
        title: "Email copied!",
        description: "Email address has been copied to your clipboard.",
      })
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abdallah.edrees@example.com",
      action: copyEmail
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+20 123 456 7890",
      action: () => window.open("tel:+201234567890")
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Cairo, Egypt",
      action: () => {}
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/abdallah-edrees",
      color: "hover:text-gray-800 dark:hover:text-gray-200"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/abdallah-edrees",
      color: "hover:text-blue-600"
    },
    {
      icon: Mail,
      label: "Email",
      url: "mailto:abdallah.edrees@example.com",
      color: "hover:text-red-600"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm always excited to work on new projects and collaborate with amazing people.
            Let's discuss how we can bring your ideas to life!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-elegant hover:shadow-glow transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Send me a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Your full name"
                        className={cn(
                          "transition-colors duration-200",
                          errors.name 
                            ? "border-destructive focus-visible:ring-destructive" 
                            : "focus-visible:ring-primary"
                        )}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p 
                          id="name-error" 
                          className="text-sm text-destructive animate-fade-in"
                          role="alert"
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your.email@example.com"
                        className={cn(
                          "transition-colors duration-200",
                          errors.email 
                            ? "border-destructive focus-visible:ring-destructive" 
                            : "focus-visible:ring-primary"
                        )}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p 
                          id="email-error" 
                          className="text-sm text-destructive animate-fade-in"
                          role="alert"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="What's this about?"
                      className={cn(
                        "transition-colors duration-200",
                        errors.subject 
                          ? "border-destructive focus-visible:ring-destructive" 
                          : "focus-visible:ring-primary"
                      )}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p 
                        id="subject-error" 
                        className="text-sm text-destructive animate-fade-in"
                        role="alert"
                      >
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Tell me about your project..."
                      rows={6}
                      className={cn(
                        "transition-colors duration-200 resize-none",
                        errors.message 
                          ? "border-destructive focus-visible:ring-destructive" 
                          : "focus-visible:ring-primary"
                      )}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p 
                        id="message-error" 
                        className="text-sm text-destructive animate-fade-in"
                        role="alert"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                    disabled={isSubmitting || !isValid}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <Card className="shadow-elegant hover:shadow-glow transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                    onClick={info.action}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-foreground">{info.label}</h4>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                    {info.label === "Email" && (
                      <Button variant="ghost" size="sm">
                        {emailCopied ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="shadow-elegant hover:shadow-glow transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Connect with me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      className={`p-3 bg-muted rounded-full transition-all duration-300 ${social.color}`}
                    >
                      <social.icon className="h-6 w-6" />
                    </motion.a>
                  ))}
                </div>
                <p className="text-center text-muted-foreground mt-6">
                  Follow me on social media for updates and insights
                </p>
              </CardContent>
            </Card>

            {/* Quick Response Info */}
            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">Quick Response</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  I typically respond to messages within 24 hours. Looking forward to hearing from you!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}