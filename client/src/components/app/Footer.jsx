import React, { useState } from 'react'
import { Heart, Github, Twitter, Mail, Linkedin, ChevronUp, Send, ArrowRight, Sparkles, BookOpen, Users, PenTool } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from '../../utils/toast'
import logo from '../../assets/logo.png'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error('Please enter your email')
      return
    }
    
    setSubscribing(true)
    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Thanks for subscribing!')
    setEmail('')
    setSubscribing(false)
  }

  const footerLinks = {
    explore: [
      { name: 'Home', path: '/' },
      { name: 'All Articles', path: '/blogs' },
      { name: 'Categories', path: '/categories' },
      { name: 'Search', path: '/search' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Writers', path: '/writers' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@inkly.com', label: 'Email' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Join Our Community
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold">
              Stay Inspired, Stay Informed
            </h3>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Get the best stories, insights, and creative inspiration delivered to your inbox every week.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 rounded-full px-6 bg-background border-primary/20 focus:border-primary"
              />
              <Button 
                type="submit" 
                disabled={subscribing}
                className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
              >
                {subscribing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/" className="inline-block">
                <img src={logo} alt="Inkly" className="h-10" />
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                Inkly is a modern publishing platform where writers share their stories and readers discover inspiring content. Join thousands of creative minds.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 rounded-xl bg-background/50">
                  <BookOpen className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-lg font-bold">10K+</p>
                  <p className="text-xs text-muted-foreground">Articles</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-background/50">
                  <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-lg font-bold">50K+</p>
                  <p className="text-xs text-muted-foreground">Readers</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-background/50">
                  <PenTool className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-lg font-bold">500+</p>
                  <p className="text-xs text-muted-foreground">Writers</p>
                </div>
              </div>
            </div>

            {/* Explore Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Explore</h4>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="h-px w-0 group-hover:w-3 bg-primary transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="h-px w-0 group-hover:w-3 bg-primary transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="h-px w-0 group-hover:w-3 bg-primary transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Connect</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                Follow us for updates and creative inspiration.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © {new Date().getFullYear()} Inkly. All rights reserved. Developed with{' '}
                <Heart className="inline-block w-4 h-4 text-red-500 fill-red-500 mx-1" />
                by{' '}
                <span className="font-medium text-foreground">
                  Khurram Pervaiz
                </span>
              </p>
              
              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                Back to top
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ChevronUp className="w-4 h-4" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer