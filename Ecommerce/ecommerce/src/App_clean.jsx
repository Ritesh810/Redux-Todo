import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Chip,
  Rating,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Stack,
  ButtonGroup,
  Snackbar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Skeleton,
} from '@mui/material';

import {
  Search,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Menu,
  Person,
  FilterList,
  Star,
  Add,
  Remove,
  Delete,
  Close,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ShoppingBag,
  LocationOn,
  Phone,
  CreditCard,
  AccountBalanceWallet,
} from '@mui/icons-material';

// Enhanced Myntra-inspired theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3f6c',
      light: '#ff6b9d',
      dark: '#e91e63',
    },
    secondary: {
      main: '#282c3f',
      light: '#535766',
      dark: '#1a1d29',
    },
    success: {
      main: '#00b56a',
      light: '#00d084',
    },
    warning: {
      main: '#ff905a',
    },
    background: {
      default: '#ffffff',
      paper: '#fafafa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

// Optimized image component with lazy loading
const OptimizedImage = React.memo(({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box sx={{ position: 'relative', ...props.sx }}>
      {!loaded && !error && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={props.height || 340}
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <CardMedia
        component="img"
        {...props}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        sx={{
          ...props.sx,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {error && (
        <Box
          sx={{
            height: props.height || 340,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            color: 'text.secondary',
          }}
        >
          Image not available
        </Box>
      )}
    </Box>
  );
});

// Memoized Product Card Component
const ProductCard = React.memo(({ product, index, onAddToCart, onToggleFavorite, onQuickView, favorites }) => {
  const handleAddToCart = useCallback(() => {
    onAddToCart(product);
  }, [product, onAddToCart]);

  const handleToggleFavorite = useCallback((e) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  }, [product.id, onToggleFavorite]);

  const handleQuickView = useCallback((e) => {
    e.stopPropagation();
    onQuickView(product);
  }, [product, onQuickView]);

  const isFavorite = useMemo(() => favorites.includes(product.id), [favorites, product.id]);

  return (
    <Grid item xs={6} sm={6} md={4} key={product.id}>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          cursor: 'pointer',
          position: 'relative',
          background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.06)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.16)',
            borderColor: 'rgba(255, 63, 108, 0.2)',
            '& .product-image': {
              transform: 'scale(1.1)',
            },
            '& .quick-actions': {
              opacity: 1,
              transform: 'translateY(0)',
            },
            '& .product-overlay': {
              opacity: 1,
            }
          },
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(30px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            className="product-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(0,0,0,0.1) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              zIndex: 1,
            }}
          />
          
          <OptimizedImage
            height="340"
            src={product.image}
            alt={product.name}
            className="product-image"
            sx={{ 
              objectFit: 'cover',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: '#f8f9fa',
            }}
          />
          
          {product.isOnSale && (
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                background: 'linear-gradient(135deg, #ff3f6c 0%, #e91e63 100%)',
                color: 'white',
                px: 2.5,
                py: 1,
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '12px',
                boxShadow: '0 6px 20px rgba(255, 63, 108, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                zIndex: 2,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              🔥 {product.discount}
            </Box>
          )}
          
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              width: 40,
              height: 40,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 2,
              '&:hover': { 
                backgroundColor: 'white',
                transform: 'scale(1.15) rotate(10deg)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
              },
            }}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? (
              <Favorite sx={{ color: '#ff3f6c', fontSize: 20 }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: 20, color: '#666' }} />
            )}
          </IconButton>
          
          <Box
            className="quick-actions"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              color: 'white',
              p: 3,
              transform: 'translateY(100%)',
              opacity: 0,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 3,
              display: 'flex',
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={handleQuickView}
              sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#000',
                backdropFilter: 'blur(10px)',
                fontWeight: 'bold',
                fontSize: '11px',
                px: 2,
                borderRadius: 2,
                '&:hover': {
                  background: 'white',
                  transform: 'scale(1.05)',
                },
              }}
            >
              👁️ Quick View
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleAddToCart}
              sx={{
                background: 'linear-gradient(135deg, #ff3f6c 0%, #e91e63 100%)',
                fontWeight: 'bold',
                fontSize: '11px',
                px: 2,
                borderRadius: 2,
                flex: 1,
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              🛒 Add to Bag
            </Button>
          </Box>
        </Box>
        
        <CardContent sx={{ 
          flexGrow: 1, 
          p: 3,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'text.primary', 
                fontSize: '15px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {product.brand}
            </Typography>
            {product.isNew && (
              <Chip
                label="NEW"
                size="small"
                sx={{
                  backgroundColor: '#00d084',
                  color: 'white',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  height: 18,
                  animation: 'glow 2s ease-in-out infinite alternate',
                  '@keyframes glow': {
                    '0%': { boxShadow: '0 0 5px #00d084' },
                    '100%': { boxShadow: '0 0 15px #00d084' },
                  },
                }}
              />
            )}
          </Box>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2.5, 
              fontSize: '13px',
              lineHeight: 1.4,
              height: '2.8em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>
          
          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#000',
                  fontSize: '18px',
                }}
              >
                ₹{product.price.toLocaleString()}
              </Typography>
              {product.isOnSale && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ 
                    textDecoration: 'line-through', 
                    fontSize: '14px',
                    opacity: 0.7,
                  }}
                >
                  ₹{product.originalPrice.toLocaleString()}
                </Typography>
              )}
            </Box>
            {product.isOnSale && (
              <Chip
                label={`${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF`}
                size="small"
                sx={{ 
                  color: '#ff6b35', 
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  height: 22,
                  borderRadius: 2,
                  border: '1px solid rgba(255, 107, 53, 0.2)',
                }}
              />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: 'linear-gradient(135deg, #00d084 0%, #00b56a 100%)',
                color: 'white', 
                px: 1.5, 
                py: 0.5, 
                borderRadius: 2,
                boxShadow: '0 3px 10px rgba(0, 208, 132, 0.3)',
              }}
            >
              <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 'bold', mr: 0.5 }}>
                {product.rating}
              </Typography>
              <Star sx={{ fontSize: 13 }} />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px' }}>
              ({product.reviews.toLocaleString()} reviews)
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                fontSize: '12px', 
                mb: 1, 
                display: 'block',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Available Sizes
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {product.sizes.slice(0, 4).map((size) => (
                <Chip
                  key={size}
                  label={size}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    fontSize: '10px', 
                    height: 20,
                    minWidth: 28,
                    borderColor: 'rgba(0,0,0,0.15)',
                    color: 'text.secondary',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(255, 63, 108, 0.05)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
              {product.sizes.length > 4 && (
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ 
                    fontSize: '10px', 
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    ml: 0.5,
                  }}
                >
                  +{product.sizes.length - 4} more
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
        
        <CardActions sx={{ p: 3, pt: 0, background: 'rgba(248, 249, 250, 0.5)' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
            sx={{ 
              background: 'linear-gradient(135deg, #ff3f6c 0%, #e91e63 100%)',
              fontWeight: 'bold',
              fontSize: '14px',
              py: 1.8,
              borderRadius: 3,
              boxShadow: '0 6px 20px rgba(255, 63, 108, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'none',
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transition: 'left 0.5s',
              },
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 25px rgba(255, 63, 108, 0.4)',
                '&:before': {
                  left: '100%',
                },
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShoppingBag sx={{ fontSize: 18 }} />
              ADD TO BAG
            </Box>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
});

function App() {
  // Optimized state management with lazy initialization
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });
  
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cartItems')) || [];
    } catch {
      return [];
    }
  });
  
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    } catch {
      return [];
    }
  });

  // UI state
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('popularity');
  
  // Dialog states
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
  });
  
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [activeStep, setActiveStep] = useState(0);

  // Categories
  const categories = [
    'All', 'Men', 'Women', 'Kids', 'Home & Living', 'Beauty', 'Studio'
  ];

  // Sample products
  const products = [
    {
      id: 1,
      name: 'Roadster Men Casual Shirt',
      brand: 'Roadster',
      price: 899,
      originalPrice: 1799,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop',
      rating: 4.3,
      reviews: 1247,
      category: 'Men',
      discount: '50% OFF',
      isOnSale: true,
      isNew: true,
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 2,
      name: 'HRX Women Sports Bra',
      brand: 'HRX by Hrithik Roshan',
      price: 649,
      originalPrice: 1299,
      image: 'https://images.unsplash.com/photo-1506629905607-126d77bb9e50?w=400&h=600&fit=crop',
      rating: 4.4,
      reviews: 856,
      category: 'Women',
      discount: '50% OFF',
      isOnSale: true,
      sizes: ['XS', 'S', 'M', 'L'],
    },
    {
      id: 3,
      name: 'Levis 511 Slim Jeans',
      brand: 'Levis',
      price: 2999,
      originalPrice: 4999,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop',
      rating: 4.6,
      reviews: 2341,
      category: 'Men',
      discount: '40% OFF',
      isOnSale: true,
      isNew: true,
      sizes: ['28', '30', '32', '34', '36'],
    },
    {
      id: 4,
      name: 'ONLY Women Casual Top',
      brand: 'ONLY',
      price: 799,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1485231183945-ade043a753cd?w=400&h=600&fit=crop',
      rating: 4.2,
      reviews: 645,
      category: 'Women',
      discount: '50% OFF',
      isOnSale: true,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
      id: 5,
      name: 'H&M Kids T-Shirt',
      brand: 'H&M',
      price: 399,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad1c3?w=400&h=600&fit=crop',
      rating: 4.1,
      reviews: 342,
      category: 'Kids',
      discount: '50% OFF',
      isOnSale: true,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    },
    {
      id: 6,
      name: 'Nike Air Force 1',
      brand: 'Nike',
      price: 7995,
      originalPrice: 7995,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop',
      rating: 4.8,
      reviews: 1856,
      category: 'Men',
      discount: '',
      isOnSale: false,
      sizes: ['6', '7', '8', '9', '10', '11'],
    },
    {
      id: 7,
      name: 'Zara Women Blazer',
      brand: 'Zara',
      price: 2999,
      originalPrice: 4999,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop',
      rating: 4.5,
      reviews: 987,
      category: 'Women',
      discount: '40% OFF',
      isOnSale: true,
      sizes: ['XS', 'S', 'M', 'L'],
    },
    {
      id: 8,
      name: 'Lakme Lipstick Set',
      brand: 'Lakme',
      price: 1299,
      originalPrice: 1999,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=600&fit=crop',
      rating: 4.3,
      reviews: 543,
      category: 'Beauty',
      discount: '35% OFF',
      isOnSale: true,
      sizes: ['One Size'],
    },
  ];

  // Memoized callback functions for better performance
  const addToCart = useCallback((product, size = 'M', quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems(prev => [...prev, { ...product, size, quantity }]);
    }
    
    setSnackbar({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success'
    });
  }, [cartItems]);

  const removeFromCart = useCallback((productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.size === size)));
    setSnackbar({
      open: true,
      message: 'Item removed from cart',
      severity: 'info'
    });
  }, []);

  const updateCartQuantity = useCallback((productId, size, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size);
      return;
    }
    
    setCartItems(prev => prev.map(item =>
      item.id === productId && item.size === size
        ? { ...item, quantity: newQuantity }
        : item
    ));
  }, [removeFromCart]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getCartItemsCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const toggleFavorite = useCallback((productId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      setSnackbar({
        open: true,
        message: newFavorites.includes(productId) ? 'Added to favorites!' : 'Removed from favorites',
        severity: 'success'
      });
      
      return newFavorites;
    });
  }, []);

  const handleQuickView = useCallback((product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  }, []);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default:
        return filtered.sort((a, b) => b.reviews - a.reviews);
    }
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  // Authentication Functions
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        name: loginForm.email.split('@')[0],
        email: loginForm.email,
        avatar: `https://ui-avatars.com/api/?name=${loginForm.email.split('@')[0]}&background=ff3f6c&color=fff`
      });
      setLoginOpen(false);
      setLoginForm({ email: '', password: '' });
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'Welcome back! Login successful',
        severity: 'success'
      });
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setFavorites([]);
    setSnackbar({
      open: true,
      message: 'Logged out successfully',
      severity: 'info'
    });
  };

  // Checkout
  const handleCheckout = () => {
    if (!user) {
      setSnackbar({
        open: true,
        message: 'Please login to continue',
        severity: 'warning'
      });
      setLoginOpen(true);
      return;
    }
    
    if (cartItems.length === 0) {
      setSnackbar({
        open: true,
        message: 'Your cart is empty',
        severity: 'warning'
      });
      return;
    }
    
    setCheckoutOpen(true);
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid #eee', backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <Menu sx={{ color: '#282c3f' }} />
          </IconButton>
          
          <Typography variant="h5" sx={{ flexGrow: 1, ml: 2, fontWeight: 'bold', color: '#ff3f6c' }}>
            Myntra
          </Typography>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, mr: 3 }}>
            {categories.map((category) => (
              <Button
                key={category}
                color="inherit"
                onClick={() => setSelectedCategory(category)}
                sx={{
                  color: selectedCategory === category ? '#ff3f6c' : '#282c3f',
                  fontWeight: selectedCategory === category ? 'bold' : 'normal',
                  '&:hover': { color: '#ff3f6c' },
                }}
              >
                {category}
              </Button>
            ))}
          </Box>

          <TextField
            size="small"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mr: 2, minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <IconButton color="inherit" onClick={() => setFilterDrawerOpen(true)}>
            <FilterList sx={{ color: '#282c3f' }} />
          </IconButton>

          <IconButton color="inherit" onClick={() => setCartDrawerOpen(true)}>
            <Badge badgeContent={getCartItemsCount()} color="error">
              <ShoppingCart sx={{ color: '#282c3f' }} />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={() => user ? handleLogout() : setLoginOpen(true)}>
            {user ? (
              <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
            ) : (
              <Person sx={{ color: '#282c3f' }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ff3f6c 0%, #e91e63 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            BIGGEST FASHION SALE
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Upto 80% Off On 2 Lakh+ Styles
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: '#ff3f6c',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              fontSize: '16px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Filter Controls */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {filteredProducts.length} Products
          </Typography>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Customer Rating</MenuItem>
              <MenuItem value="newest">Newest First</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              onQuickView={handleQuickView}
              favorites={favorites}
            />
          ))}
        </Grid>
        
        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" color="text.secondary" sx={{ mb: 2 }}>
              😔 No products found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your filters or search terms
            </Typography>
          </Box>
        )}
      </Container>

      {/* Navigation Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Categories
          </Typography>
          <List>
            {categories.map((category) => (
              <ListItem
                key={category}
                button
                onClick={() => {
                  setSelectedCategory(category);
                  setDrawerOpen(false);
                }}
                sx={{
                  backgroundColor: selectedCategory === category ? 'rgba(255, 63, 108, 0.1)' : 'transparent',
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <ListItemText 
                  primary={category}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: selectedCategory === category ? 'bold' : 'normal',
                      color: selectedCategory === category ? '#ff3f6c' : 'inherit',
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Filter Drawer */}
      <Drawer anchor="right" open={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)}>
        <Box sx={{ width: 350, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Filters
            </Typography>
            <IconButton onClick={() => setFilterDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
              valueLabelFormat={(value) => `₹${value}`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">₹{priceRange[0]}</Typography>
              <Typography variant="caption">₹{priceRange[1]}</Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Shopping Cart Drawer */}
      <Drawer anchor="right" open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)}>
        <Box sx={{ width: 400, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Shopping Bag ({getCartItemsCount()})
            </Typography>
            <IconButton onClick={() => setCartDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <ShoppingBag sx={{ fontSize: 60, color: 'gray', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Your bag is empty
              </Typography>
              <Button
                variant="contained"
                onClick={() => setCartDrawerOpen(false)}
              >
                Continue Shopping
              </Button>
            </Box>
          ) : (
            <>
              <List sx={{ mb: 3 }}>
                {cartItems.map((item, index) => (
                  <ListItem key={`${item.id}-${item.size}`} sx={{ p: 2, mb: 2, border: '1px solid #eee', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
                      <Box
                        component="img"
                        src={item.image}
                        sx={{ width: 60, height: 80, objectFit: 'cover', borderRadius: 1 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                          {item.brand}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          ₹{item.price.toLocaleString()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip label={`Size: ${item.size}`} size="small" />
                          <ButtonGroup size="small">
                            <Button onClick={() => updateCartQuantity(item.id, item.size, item.quantity - 1)}>
                              <Remove fontSize="small" />
                            </Button>
                            <Button disabled>{item.quantity}</Button>
                            <Button onClick={() => updateCartQuantity(item.id, item.size, item.quantity + 1)}>
                              <Add fontSize="small" />
                            </Button>
                          </ButtonGroup>
                          <IconButton 
                            size="small" 
                            onClick={() => removeFromCart(item.id, item.size)}
                            sx={{ color: 'error.main' }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ borderTop: '1px solid #eee', pt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ₹{getCartTotal().toLocaleString()}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  sx={{ mb: 2 }}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            Welcome Back
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleLogin}
            disabled={loading || !loginForm.email || !loginForm.password}
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Button
            variant="text"
            onClick={() => {
              setLoginOpen(false);
              setRegisterOpen(true);
            }}
          >
            Don't have an account? Sign up
          </Button>
        </DialogActions>
      </Dialog>

      {/* Product Quick View Dialog */}
      <Suspense fallback={null}>
        {productDialogOpen && selectedProduct && (
          <Dialog open={productDialogOpen} onClose={() => setProductDialogOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>
              <IconButton
                onClick={() => setProductDialogOpen(false)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={selectedProduct.image}
                    sx={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {selectedProduct.brand}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {selectedProduct.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        ₹{selectedProduct.price.toLocaleString()}
                      </Typography>
                      {selectedProduct.isOnSale && (
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          ₹{selectedProduct.originalPrice.toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={selectedProduct.rating} precision={0.1} readOnly />
                      <Typography variant="body2">
                        ({selectedProduct.reviews.toLocaleString()} reviews)
                      </Typography>
                    </Box>
                    <Typography variant="h6">Select Size:</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {selectedProduct.sizes.map((size) => (
                        <Chip
                          key={size}
                          label={size}
                          clickable
                          variant="outlined"
                          sx={{ minWidth: 50 }}
                        />
                      ))}
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button
                variant="outlined"
                startIcon={<Favorite />}
                onClick={() => toggleFavorite(selectedProduct.id)}
                sx={{ mr: 1 }}
              >
                {favorites.includes(selectedProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={() => {
                  addToCart(selectedProduct);
                  setProductDialogOpen(false);
                }}
              >
                Add to Bag
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Suspense>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
