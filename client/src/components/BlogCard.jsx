import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Eye, Heart, MessageCircle, User, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cardHover, imageZoom, staggerItem } from '@/utils/animations'

// Category color mapping
const categoryColors = {
  technology: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6', border: '#3b82f6' },
  design: { bg: 'rgba(236, 72, 153, 0.1)', text: '#ec4899', border: '#ec4899' },
  business: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', border: '#10b981' },
  lifestyle: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b', border: '#f59e0b' },
  health: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', border: '#ef4444' },
  travel: { bg: 'rgba(6, 182, 212, 0.1)', text: '#06b6d4', border: '#06b6d4' },
  default: { bg: 'rgba(100, 116, 139, 0.1)', text: '#64748b', border: '#64748b' }
}

const getCategoryColor = (categoryName) => {
  const name = categoryName?.toLowerCase() || 'default'
  return categoryColors[name] || categoryColors.default
}

const formatDate = (dateString) => {
  if (!dateString) return 'Date not available'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Standard Blog Card
export const BlogCard = ({ post, index = 0 }) => {
  const categoryColor = getCategoryColor(post.category?.name || post.category)
  const imageUrl = post.image || post.featured_image || post.featuredImage || 
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop"
  
  return (
    <motion.article
      variants={staggerItem}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="group relative overflow-hidden rounded-2xl bg-card border border-border"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link to={`/article/${post._id || post.id || post.slug}`} className="block">
        {/* Image Container */}
        <motion.div 
          className="relative aspect-[16/10] overflow-hidden"
          variants={imageZoom}
        >
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop"
            }}
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge 
              className="category-badge backdrop-blur-sm border transition-all duration-300 group-hover:scale-105"
              style={{ 
                backgroundColor: categoryColor.bg, 
                color: categoryColor.text,
                borderColor: `${categoryColor.border}40`
              }}
            >
              {post.category?.name || post.category || "General"}
            </Badge>
          </div>
          
          {/* Trending Badge */}
          {post.views > 1000 && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-orange-500/90 text-white backdrop-blur-sm border-0 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </Badge>
            </div>
          )}
        </motion.div>
        
        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h3 className="font-serif text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {post.excerpt || post.content?.substring(0, 120) + '...'}
          </p>
          
          {/* Author & Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              {post.author?.avatar ? (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.fullName}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium">{post.author?.fullName || "Anonymous"}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(post.publishedAt || post.createdAt || post.created_at)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime || post.readTime || "5"} min</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <Heart className="w-3.5 h-3.5" />
              <span>{post.likes || 0}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-primary transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{post.comments?.length || post.comments || 0}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-green-500 transition-colors">
              <Eye className="w-3.5 h-3.5" />
              <span>{post.views || 0}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// Hero/Featured Card - Full Width
export const HeroCard = ({ post }) => {
  const categoryColor = getCategoryColor(post.category?.name || post.category)
  const imageUrl = post.image || post.featured_image || post.featuredImage || 
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop"
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-h-[70vh] rounded-3xl overflow-hidden cursor-pointer"
    >
      <Link to={`/article/${post._id || post.id || post.slug}`} className="block h-full">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[8s] ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl space-y-6">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4">
              <Badge 
                className="category-badge backdrop-blur-sm border text-sm px-4 py-1.5"
                style={{ 
                  backgroundColor: `${categoryColor.bg}`, 
                  color: categoryColor.text,
                  borderColor: `${categoryColor.border}60`
                }}
              >
                {post.category?.name || post.category || "Featured"}
              </Badge>
              
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime || "5"} min read
                </span>
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight group-hover:text-primary/90 transition-colors duration-500">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            <p className="text-lg md:text-xl text-white/80 line-clamp-2 max-w-2xl leading-relaxed">
              {post.excerpt || post.content?.substring(0, 180) + '...'}
            </p>
            
            {/* Author */}
            <div className="flex items-center gap-4 pt-4">
              {post.author?.avatar ? (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.fullName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <p className="text-white font-medium">{post.author?.fullName || "Anonymous"}</p>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views || 0} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Read More Indicator */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
          <motion.div 
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  )
}

// Medium-sized Featured Card
export const FeaturedCard = ({ post, index = 0 }) => {
  const categoryColor = getCategoryColor(post.category?.name || post.category)
  const imageUrl = post.image || post.featured_image || post.featuredImage || 
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer"
    >
      <Link to={`/article/${post._id || post.id || post.slug}`} className="block h-full">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge 
            className="category-badge backdrop-blur-sm border"
            style={{ 
              backgroundColor: categoryColor.bg, 
              color: categoryColor.text,
              borderColor: `${categoryColor.border}40`
            }}
          >
            {post.category?.name || post.category || "General"}
          </Badge>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white leading-tight line-clamp-2 group-hover:text-primary/90 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-white/70 text-sm line-clamp-2">
            {post.excerpt || post.content?.substring(0, 100) + '...'}
          </p>
          
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2">
              {post.author?.avatar ? (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.fullName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              <span className="text-white/80 text-sm">{post.author?.fullName || "Anonymous"}</span>
            </div>
            
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime || "5"} min</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// Compact/Small Card for sidebars
export const CompactCard = ({ post, index = 0 }) => {
  const imageUrl = post.image || post.featured_image || post.featuredImage || 
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=150&fit=crop"
  
  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
    >
      <Link to={`/article/${post._id || post.id || post.slug}`} className="flex gap-4 w-full">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1 min-w-0 space-y-1">
          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            <span>•</span>
            <span>{post.readingTime || "5"} min</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// Skeleton Loading Card
export const BlogCardSkeleton = () => (
  <div className="rounded-2xl bg-card border border-border overflow-hidden">
    <div className="aspect-[16/10] skeleton" />
    <div className="p-6 space-y-4">
      <div className="h-6 skeleton w-3/4" />
      <div className="space-y-2">
        <div className="h-4 skeleton w-full" />
        <div className="h-4 skeleton w-2/3" />
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <div className="w-8 h-8 rounded-full skeleton" />
        <div className="space-y-1">
          <div className="h-4 skeleton w-24" />
          <div className="h-3 skeleton w-16" />
        </div>
      </div>
    </div>
  </div>
)

export default BlogCard
