import React, { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2,
  User,
  Loader2,
  AlertCircle,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  BookOpen,
  ChevronUp,
  Hash
} from 'lucide-react'
import { useApi } from '../hooks/useApi'
import { toast } from '../utils/toast'
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations'
import { BlogCard, BlogCardSkeleton } from '../components/BlogCard'

const ArticlePage = () => {
  const { identifier } = useParams()
  const navigate = useNavigate()
  const { get } = useApi()
  
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [tableOfContents, setTableOfContents] = useState([])
  
  // Reading progress
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    if (identifier) {
      fetchArticle()
    }
  }, [identifier])

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Extract table of contents from article content
  useEffect(() => {
    if (article?.content) {
      const headingRegex = /<h([2-3])[^>]*>([^<]+)<\/h[2-3]>/gi
      const headings = []
      let match
      while ((match = headingRegex.exec(article.content)) !== null) {
        headings.push({
          level: parseInt(match[1]),
          text: match[2],
          id: match[2].toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        })
      }
      setTableOfContents(headings)
    }
  }, [article])

  const fetchArticle = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await get(`${import.meta.env.VITE_API_BASE_URL}users/articles/${identifier}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Article not found')
        }
        throw new Error('Failed to fetch article')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setArticle(data.data)
      } else {
        throw new Error(data.message || 'Failed to fetch article')
      }
    } catch (error) {
      console.error('Article fetch error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = async (platform) => {
    const url = window.location.href
    const title = article?.title || 'Check out this article'
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    }
    
    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
      } catch (error) {
        toast.error('Failed to copy link')
      }
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    } else if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-primary" />
            </motion.div>
            <p className="text-muted-foreground text-lg">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center min-h-[60vh]"
          >
            <Card className="w-full max-w-md border-destructive/50">
              <CardContent className="text-center py-12 space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold">Article Not Found</h3>
                  <p className="text-muted-foreground">{error}</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => navigate(-1)} variant="outline" className="rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                  </Button>
                  <Button onClick={() => navigate('/')} className="rounded-full">
                    Go Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!article) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <motion.div 
        className="reading-progress no-print"
        style={{ scaleX }}
      >
        <div className="reading-progress-bar" style={{ transform: 'none' }} />
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.8 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center hover:scale-110 transition-transform no-print"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>

      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${article.featuredImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        <div className={`container mx-auto px-4 ${article.featuredImage ? '-mt-32 relative z-10' : 'pt-12'}`}>
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="rounded-full hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </motion.div>

            {/* Category */}
            {article.category && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <Link to={`/category/${article.category.slug || article.category._id}`}>
                  <Badge 
                    className="category-badge text-sm px-4 py-1.5"
                    style={{ 
                      borderColor: article.category.color,
                      color: article.category.color,
                      backgroundColor: `${article.category.color}15`
                    }}
                  >
                    {article.category.name}
                  </Badge>
                </Link>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6"
            >
              {article.title}
            </motion.h1>

            {/* Excerpt */}
            {article.excerpt && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8"
              >
                {article.excerpt}
              </motion.p>
            )}

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-6 border-y border-border"
            >
              {/* Author */}
              <div className="flex items-center gap-4">
                {article.author?.avatar ? (
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.fullName}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-lg">{article.author?.fullName}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readingTime} min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats & Share */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {article.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {article.comments?.length || 0}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex gap-12 max-w-7xl mx-auto">
          {/* Sidebar - Share & TOC */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Share Buttons */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Share</h4>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start rounded-full"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start rounded-full"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start rounded-full"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start rounded-full"
                    onClick={() => handleShare('copy')}
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>

              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contents</h4>
                  <nav className="space-y-2">
                    {tableOfContents.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`block text-sm text-muted-foreground hover:text-primary transition-colors ${
                          heading.level === 3 ? 'pl-4' : ''
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </aside>

          {/* Article Content */}
          <article className="flex-1 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="prose prose-lg max-w-none"
            >
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </motion.div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-border"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <Hash className="w-5 h-5 text-muted-foreground" />
                  {article.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="rounded-full px-4 py-1 hover:bg-primary/10 cursor-pointer transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Mobile Share Buttons */}
            <div className="lg:hidden mt-8 flex gap-2 justify-center">
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare('twitter')}>
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare('facebook')}>
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare('linkedin')}>
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare('copy')}>
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Author Bio */}
            {article.author?.bio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <Card className="bg-muted/30 border-0">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      {article.author.avatar ? (
                        <img 
                          src={article.author.avatar} 
                          alt={article.author.fullName}
                          className="w-20 h-20 rounded-full object-cover ring-4 ring-background"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                          <User className="w-10 h-10 text-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Written by</p>
                        <h3 className="text-xl font-serif font-bold mb-2">{article.author.fullName}</h3>
                        <p className="text-muted-foreground leading-relaxed">{article.author.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Comments Section */}
            {article.comments && article.comments.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-16"
              >
                <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  Comments ({article.comments.length})
                </h3>
                <div className="space-y-6">
                  {article.comments.map((comment) => (
                    <Card key={comment.id} className="border-l-4 border-l-primary/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {comment.user?.avatar ? (
                            <img 
                              src={comment.user.avatar} 
                              alt={comment.user.fullName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                              <User className="w-5 h-5 text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">{comment.user?.fullName}</span>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{comment.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Articles */}
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-16"
              >
                <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Related Articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {article.relatedArticles.map((related, index) => (
                    <BlogCard key={related.id || index} post={related} index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </article>
        </div>
      </main>
    </div>
  )
}

export default ArticlePage
