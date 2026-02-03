import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  PenTool, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Star, 
  ArrowRight, 
  Sparkles,
  Mail,
  ChevronRight,
  Zap,
  Globe,
  Award
} from 'lucide-react'
import { BlogCard, HeroCard, FeaturedCard, BlogCardSkeleton } from '@/components/BlogCard'
import { staggerContainer, staggerItem } from '@/utils/animations'

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [latestPosts, setLatestPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      setLoading(true)
      
      const [postsResponse, categoriesResponse, statsResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}users/articles?limit=10`),
        fetch(`${import.meta.env.VITE_API_BASE_URL}categories`),
        fetch(`${import.meta.env.VITE_API_BASE_URL}stats`)
      ])

      if (postsResponse.ok) {
        const postsData = await postsResponse.json()
        if (postsData.success) {
          const articles = postsData.data?.articles || []
          setFeaturedPosts(articles.slice(0, 4))
          setLatestPosts(articles.slice(0, 6))
        }
      }

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json()
        if (categoriesData.success) {
          setCategories(categoriesData.data?.categories?.slice(0, 8) || [])
        }
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        if (statsData.success) {
          setStats([
            { icon: BookOpen, label: "Articles", value: statsData.data?.totalArticles || "150+", color: "from-blue-500 to-cyan-500" },
            { icon: Users, label: "Writers", value: statsData.data?.totalWriters || "25+", color: "from-purple-500 to-pink-500" },
            { icon: TrendingUp, label: "Monthly Reads", value: statsData.data?.monthlyViews || "50K+", color: "from-orange-500 to-red-500" },
            { icon: Star, label: "Rating", value: statsData.data?.rating || "4.9", color: "from-yellow-500 to-orange-500" }
          ])
        }
      } else {
        setStats([
          { icon: BookOpen, label: "Articles", value: "150+", color: "from-blue-500 to-cyan-500" },
          { icon: Users, label: "Writers", value: "25+", color: "from-purple-500 to-pink-500" },
          { icon: TrendingUp, label: "Monthly Reads", value: "50K+", color: "from-orange-500 to-red-500" },
          { icon: Star, label: "Rating", value: "4.9", color: "from-yellow-500 to-orange-500" }
        ])
      }

    } catch (error) {
      console.error('Home data fetch error:', error)
      setStats([
        { icon: BookOpen, label: "Articles", value: "150+", color: "from-blue-500 to-cyan-500" },
        { icon: Users, label: "Writers", value: "25+", color: "from-purple-500 to-pink-500" },
        { icon: TrendingUp, label: "Monthly Reads", value: "50K+", color: "from-orange-500 to-red-500" },
        { icon: Star, label: "Rating", value: "4.9", color: "from-yellow-500 to-orange-500" }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const categoryIcons = {
    technology: Zap,
    design: Sparkles,
    business: TrendingUp,
    lifestyle: Globe,
    health: Award,
    travel: Globe,
  }

  return (
    <div className="flex-1 w-full min-h-screen bg-background overflow-hidden">
      
      {/* HERO SECTION */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <Badge className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to the future of storytelling
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight"
            >
              <span className="block">Where Stories</span>
              <span className="block gradient-text">Come Alive</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Discover extraordinary stories, insights, and perspectives from our community of passionate writers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25">
                <PenTool className="w-5 h-5 mr-2" />
                Start Writing
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-2" asChild>
                <Link to="/blogs">
                  Explore Stories
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
            >
              <motion.div 
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* STATS SECTION */}
      <section className="py-16 px-6 bg-muted/30 border-y border-border">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={staggerItem} className="text-center group">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="text-4xl md:text-5xl font-bold font-serif">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FEATURED POST */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Featured Story</h2>
                <p className="text-muted-foreground mt-2">Our editor's pick for today</p>
              </div>
            </motion.div>
            <HeroCard post={featuredPosts[0]} />
          </div>
        </section>
      )}

      {/* TRENDING POSTS */}
      {featuredPosts.length > 1 && (
        <section className="py-16 px-6 bg-muted/20">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Trending Now</h2>
                <p className="text-muted-foreground mt-2">Stories capturing everyone's attention</p>
              </div>
              <Button variant="ghost" className="group" asChild>
                <Link to="/blogs">View all<ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts[1] && (
                <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
                  <FeaturedCard post={featuredPosts[1]} index={0} />
                </div>
              )}
              {featuredPosts.slice(2, 4).map((post, idx) => (
                <div key={post._id || post.id} className="h-[240px] md:h-auto">
                  <FeaturedCard post={post} index={idx + 1} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LATEST ARTICLES */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Latest Stories</h2>
              <p className="text-muted-foreground mt-2">Fresh perspectives from our community</p>
            </div>
            <Button variant="ghost" className="group" asChild>
              <Link to="/blogs">Browse all<ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
          </motion.div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)}
            </div>
          ) : (
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, index) => (
                <BlogCard key={post._id || post.id} post={post} index={index} />
              ))}
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
              <Link to="/blogs">View All Articles<ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-6 bg-gradient-to-b from-muted/30 to-background">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Explore by Topic</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Dive into the subjects that interest you most</p>
          </motion.div>

          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.length > 0 ? categories.map((category, index) => {
              const IconComponent = categoryIcons[category.name?.toLowerCase()] || BookOpen
              return (
                <motion.div key={category._id || index} variants={staggerItem}>
                  <Link to={`/category/${category._id || category.slug}`}>
                    <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{category.name}</h3>
                        <Badge variant="secondary" className="text-xs">{category.count || category.articleCount || 0} articles</Badge>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            }) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Categories coming soon</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="newsletter-section text-center text-white">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex p-3 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Stay in the Loop</h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto">Get the best stories delivered straight to your inbox. No spam, just quality content twice a week.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 h-12 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/60" required />
                <Button type="submit" size="lg" className="h-12 px-8 rounded-full bg-white text-primary hover:bg-white/90 font-semibold">Subscribe<ArrowRight className="w-4 h-4 ml-2" /></Button>
              </form>
              <p className="text-sm text-white/60">Join 10,000+ readers. Unsubscribe anytime.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
              Ready to Share Your
              <span className="block gradient-text">Story?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Join thousands of writers who have found their voice on Inkly.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="text-lg px-10 py-7 rounded-full bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/25">
                <PenTool className="w-5 h-5 mr-2" />
                Start Writing Today
              </Button>
              <Button variant="link" size="lg" className="text-lg text-muted-foreground">Learn more<ChevronRight className="w-4 h-4 ml-1" /></Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home