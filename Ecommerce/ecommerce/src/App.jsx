import React, { useState, useEffect } from 'react';
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
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Chip,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Slider,
  Tabs,
  Tab,
  Avatar,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  LinearProgress,
  ButtonGroup
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  Menu,
  Favorite,
  FavoriteBorder,
  Person,
  LocalOffer,
  FilterList,
  Sort,
  Star,
  ShoppingBag,
  Close,
  Add,
  Remove,
  Delete,
  Login,
  Logout,
  AccountCircle,
  CreditCard,
  LocalShipping,
  Security,
  ExpandMore,
  CheckCircle,
  Visibility,
  VisibilityOff,
  LocationOn,
  Phone,
  Email
} from '@mui/icons-material';

// Enhanced Myntra-inspired theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3f6c', // Myntra pink
      light: '#ff6b9d',
      dark: '#e91e63',
    },
    secondary: {
      main: '#282c3f', // Dark gray
      light: '#535766',
      dark: '#1a1d29',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#282c3f',
      secondary: '#696b79',
    },
    success: {
      main: '#00b852',
    },
    warning: {
      main: '#ff905a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 700,
      color: '#282c3f',
    },
    h6: {
      fontWeight: 600,
      color: '#282c3f',
    },
    body1: {
      fontSize: '0.95rem',
    },
    body2: {
      fontSize: '0.85rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 12,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
            border: '1px solid rgba(255, 63, 108, 0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '8px 20px',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          boxShadow: '0 2px 8px rgba(255, 63, 108, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(255, 63, 108, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff3f6c',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff3f6c',
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
  },
});

function App() {
  // State Management
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  
  // User Authentication State
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', email: '', password: '', confirmPassword: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  
  // Product & Order State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // UI State
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

  // Checkout Form State
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    pincode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Categories like Myntra
  const categories = [
    'Men', 'Women', 'Kids', 'Home & Living', 'Beauty', 'Studio'
  ];

  // Sample fashion products like Myntra
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

  // Enhanced Product Functions
  const addToCart = (product, size = 'M', quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, size, quantity }]);
    }
    
    setSnackbar({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success'
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems(cartItems.filter(item => !(item.id === productId && item.size === size)));
    setSnackbar({
      open: true,
      message: 'Item removed from cart',
      severity: 'info'
    });
  };

  const updateCartQuantity = (productId, size, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.id === productId && item.size === size
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleFavorite = (productId) => {
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
  };

  // Authentication Functions
  const handleLogin = () => {
    setLoading(true);
    // Simulate API call
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

  const handleRegister = () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        name: registerForm.name,
        email: registerForm.email,
        avatar: `https://ui-avatars.com/api/?name=${registerForm.name}&background=ff3f6c&color=fff`
      });
      setRegisterOpen(false);
      setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'Account created successfully! Welcome!',
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

  // Checkout Functions
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

  const handlePlaceOrder = () => {
    setLoading(true);
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      setCartItems([]);
      setActiveStep(0);
      setLoading(false);
      setSnackbar({
        open: true,
        message: 'Order placed successfully!',
        severity: 'success'
      });
    }, 2000);
  };

  const steps = ['Shipping Information', 'Payment Details', 'Review Order'];

  // Load saved data on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('myntra_user');
    const savedCart = localStorage.getItem('myntra_cart');
    const savedFavorites = localStorage.getItem('myntra_favorites');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('myntra_user', JSON.stringify(user));
    else localStorage.removeItem('myntra_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('myntra_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('myntra_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Enhanced Header - Myntra Style */}
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ py: 1.5, px: 3 }}>
          {/* Enhanced Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 6 }}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #ff3f6c 0%, #ff6b9d 100%)',
                borderRadius: '12px',
                p: 1,
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                boxShadow: '0 4px 12px rgba(255, 63, 108, 0.3)',
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                M
              </Typography>
            </Box>
            <Typography 
              variant="h5" 
              sx={{ 
                background: 'linear-gradient(135deg, #ff3f6c 0%, #ff6b9d 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                fontSize: '24px',
              }}
            >
              Myntra
            </Typography>
          </Box>
          
          {/* Enhanced Category Tabs */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => {
                setSelectedTab(newValue);
                setSelectedCategory(categories[newValue]);
              }}
              sx={{
                '& .MuiTab-root': {
                  color: theme.palette.text.primary,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '13px',
                  minWidth: 'auto',
                  px: 3,
                  py: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'translateY(-1px)',
                  },
                },
                '& .Mui-selected': {
                  color: `${theme.palette.primary.main} !important`,
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                  height: 3,
                  borderRadius: '2px 2px 0 0',
                },
              }}
            >
              {categories.map((category) => (
                <Tab key={category} label={category} />
              ))}
            </Tabs>
          </Box>
          
          {/* Enhanced Search */}
          <TextField
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ 
              mr: 3, 
              width: 350,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                '& fieldset': { 
                  border: '2px solid transparent',
                },
                '&:hover fieldset': {
                  border: '2px solid #ff3f6c',
                },
                '&.Mui-focused fieldset': {
                  border: '2px solid #ff3f6c',
                },
              },
              '& .MuiInputBase-input': {
                py: 1.5,
                fontSize: '14px',
                fontWeight: 500,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          
          {/* Enhanced Icons */}
          <Stack direction="row" spacing={1}>
            {user ? (
              <Tooltip title={`Hello, ${user.name}`}>
                <IconButton 
                  sx={{ 
                    color: theme.palette.text.primary,
                    p: 1.5,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 63, 108, 0.1)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                  onClick={() => setDrawerOpen(true)}
                >
                  <Avatar 
                    src={user.avatar} 
                    sx={{ width: 28, height: 28 }}
                  >
                    {user.name[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                startIcon={<Login />}
                onClick={() => setLoginOpen(true)}
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 63, 108, 0.1)',
                  },
                }}
              >
                Login
              </Button>
            )}
            
            <IconButton 
              sx={{ 
                color: theme.palette.text.primary,
                p: 1.5,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 63, 108, 0.1)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <Badge 
                badgeContent={favorites.length} 
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#ff3f6c',
                    fontWeight: 'bold',
                  },
                }}
              >
                <Favorite fontSize="medium" />
              </Badge>
            </IconButton>
            
            <IconButton 
              sx={{ 
                color: theme.palette.text.primary,
                p: 1.5,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 63, 108, 0.1)',
                  transform: 'translateY(-1px)',
                },
              }}
              onClick={() => setCartDrawerOpen(true)}
            >
              <Badge 
                badgeContent={getCartItemsCount()} 
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#ff3f6c',
                    fontWeight: 'bold',
                  },
                }}
              >
                <ShoppingBag fontSize="medium" />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Enhanced Filter Drawer */}
      <Drawer anchor="left" open={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)}>
        <Box sx={{ 
          width: 320, 
          p: 4,
          background: 'linear-gradient(180deg, #fff 0%, #fafafa 100%)',
          height: '100%',
        }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', color: theme.palette.primary.main }}>
            🎯 FILTERS
          </Typography>
          
          {/* Categories */}
          <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              📂 CATEGORIES
            </Typography>
            <Stack spacing={1}>
              {['All', ...categories].map((category) => (
                <Box
                  key={category}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: selectedCategory === category ? 'rgba(255, 63, 108, 0.1)' : 'transparent',
                    border: selectedCategory === category ? '2px solid #ff3f6c' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 63, 108, 0.05)',
                    },
                  }}
                  onClick={() => setSelectedCategory(category)}
                >
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={selectedCategory === category}
                        sx={{
                          color: theme.palette.primary.main,
                          '&.Mui-checked': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontWeight: selectedCategory === category ? 600 : 400 }}>
                        {category}
                      </Typography>
                    }
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
          
          {/* Price Range */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              💰 PRICE RANGE
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                sx={{ 
                  color: theme.palette.primary.main,
                  height: 8,
                  '& .MuiSlider-thumb': {
                    height: 20,
                    width: 20,
                    backgroundColor: '#fff',
                    border: '3px solid #ff3f6c',
                    boxShadow: '0 3px 12px rgba(255, 63, 108, 0.3)',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(255, 63, 108, 0.4)',
                    },
                  },
                  '& .MuiSlider-track': {
                    height: 8,
                    borderRadius: 4,
                  },
                  '& .MuiSlider-rail': {
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#e0e0e0',
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Chip 
                  label={`₹${priceRange[0]}`} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
                <Chip 
                  label={`₹${priceRange[1]}`} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Drawer>

      {/* User Profile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar src={user.avatar} sx={{ width: 60, height: 60, mr: 2 }}>
                  {user.name[0]}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              
              <List>
                <ListItem button>
                  <AccountCircle sx={{ mr: 2 }} />
                  <ListItemText primary="My Profile" />
                </ListItem>
                <ListItem button>
                  <ShoppingBag sx={{ mr: 2 }} />
                  <ListItemText primary="My Orders" />
                </ListItem>
                <ListItem button>
                  <Favorite sx={{ mr: 2 }} />
                  <ListItemText primary={`Wishlist (${favorites.length})`} />
                </ListItem>
                <ListItem button>
                  <CreditCard sx={{ mr: 2 }} />
                  <ListItemText primary="Payment Methods" />
                </ListItem>
                <ListItem button>
                  <LocationOn sx={{ mr: 2 }} />
                  <ListItemText primary="Addresses" />
                </ListItem>
                <Divider sx={{ my: 2 }} />
                <ListItem button onClick={handleLogout}>
                  <Logout sx={{ mr: 2 }} />
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <AccountCircle sx={{ fontSize: 60, color: 'gray', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Welcome to Myntra
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setDrawerOpen(false);
                  setLoginOpen(true);
                }}
                sx={{ mb: 1 }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setDrawerOpen(false);
                  setRegisterOpen(true);
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
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
                    <Security />
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
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleLogin}
              disabled={loading || !loginForm.email || !loginForm.password}
              sx={{ position: 'relative' }}
            >
              {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />}
              Login
            </Button>
            <Button
              variant="text"
              fullWidth
              onClick={() => {
                setLoginOpen(false);
                setRegisterOpen(true);
              }}
            >
              Don't have an account? Sign Up
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      {/* Enhanced Promotional Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ff3f6c 0%, #ff6b9d 50%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              textShadow: '0 4px 12px rgba(0,0,0,0.2)',
              mb: 2,
            }}
          >
            FLAT 50-80% OFF
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              opacity: 0.95,
              fontWeight: 500,
              textShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            ✨ Extra 10% Off on Everything + Free Shipping ✨
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: theme.palette.primary.main,
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
              },
            }}
          >
            🛍️ Shop Now
          </Button>
        </Container>
      </Box>

      {/* Enhanced Product Toolbar */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button
                startIcon={<FilterList />}
                onClick={() => setFilterDrawerOpen(true)}
                variant="outlined"
                sx={{ 
                  color: theme.palette.text.primary,
                  borderColor: 'rgba(0,0,0,0.2)',
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Filter
              </Button>
              <Chip 
                label={`${filteredProducts.length} items found`}
                color="primary"
                variant="outlined"
                sx={{ 
                  fontWeight: 600,
                  px: 1,
                }}
              />
            </Box>
            
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                displayEmpty
                startAdornment={<Sort sx={{ mr: 1, color: theme.palette.text.secondary }} />}
                sx={{
                  borderRadius: 2,
                  fontWeight: 500,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0,0,0,0.2)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <MenuItem value="popularity">🔥 Popularity</MenuItem>
                <MenuItem value="price-low">💰 Price: Low to High</MenuItem>
                <MenuItem value="price-high">💸 Price: High to Low</MenuItem>
                <MenuItem value="rating">⭐ Customer Rating</MenuItem>
                <MenuItem value="newest">✨ What's New</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
      </Container>

      {/* Enhanced Products Grid */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Grid container spacing={3}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  cursor: 'pointer',
                  position: 'relative',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
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
                  <CardMedia
                    component="img"
                    height="320"
                    image={product.image}
                    alt={product.name}
                    sx={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  
                  {/* Enhanced Sale Badge */}
                  {product.isOnSale && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: 'linear-gradient(135deg, #ff3f6c 0%, #e91e63 100%)',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        boxShadow: '0 4px 12px rgba(255, 63, 108, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      🔥 {product.discount}
                    </Box>
                  )}
                  
                  {/* Enhanced Favorite Button */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      width: 36,
                      height: 36,
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: 'white',
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites.includes(product.id) ? (
                      <Favorite sx={{ color: '#ff3f6c', fontSize: 18 }} />
                    ) : (
                      <FavoriteBorder sx={{ fontSize: 18, color: '#666' }} />
                    )}
                  </IconButton>
                  
                  {/* Quick View Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      color: 'white',
                      p: 2,
                      transform: 'translateY(100%)',
                      transition: 'transform 0.3s ease',
                      '.MuiCard-root:hover &': {
                        transform: 'translateY(0)',
                      },
                    }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setProductDialogOpen(true);
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      👁️ Quick View
                    </Typography>
                  </Box>
                </Box>
                
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: theme.palette.text.primary, 
                      mb: 0.5,
                      fontSize: '15px',
                    }}
                  >
                    {product.brand}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2, 
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
                  
                  {/* Enhanced Price Section */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                      ₹{product.price.toLocaleString()}
                    </Typography>
                    {product.isOnSale && (
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through', fontSize: '13px' }}
                        >
                          ₹{product.originalPrice.toLocaleString()}
                        </Typography>
                        <Chip
                          label={`${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF`}
                          size="small"
                          sx={{ 
                            color: theme.palette.warning.main, 
                            backgroundColor: 'rgba(255, 144, 90, 0.1)',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            height: 20,
                          }}
                        />
                      </>
                    )}
                  </Box>
                  
                  {/* Enhanced Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        backgroundColor: theme.palette.success.main,
                        color: 'white', 
                        px: 1, 
                        py: 0.3, 
                        borderRadius: 1,
                        boxShadow: '0 2px 6px rgba(0, 184, 82, 0.3)',
                      }}
                    >
                      <Typography variant="caption" sx={{ fontSize: '11px', fontWeight: 'bold', mr: 0.3 }}>
                        {product.rating}
                      </Typography>
                      <Star sx={{ fontSize: 12 }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
                      ({product.reviews.toLocaleString()})
                    </Typography>
                  </Box>
                  
                  {/* Size Options */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px', mb: 0.5, display: 'block' }}>
                      Sizes Available:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {product.sizes.slice(0, 4).map((size) => (
                        <Chip
                          key={size}
                          label={size}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontSize: '9px', 
                            height: 18,
                            borderColor: 'rgba(0,0,0,0.2)',
                            color: theme.palette.text.secondary,
                          }}
                        />
                      ))}
                      {product.sizes.length > 4 && (
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '9px', alignSelf: 'center' }}>
                          +{product.sizes.length - 4}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => addToCart(product)}
                    sx={{ 
                      background: 'linear-gradient(135deg, #ff3f6c 0%, #e91e63 100%)',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      py: 1.5,
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(255, 63, 108, 0.3)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 16px rgba(255, 63, 108, 0.4)',
                      },
                    }}
                  >
                    🛒 ADD TO BAG
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* No Products Found */}
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

      {/* Footer - Myntra Style */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#fafbfc',
          borderTop: '1px solid #e4e5e7',
          py: 4,
          mt: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                ONLINE SHOPPING
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Men</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Women</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Kids</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Home & Living</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Beauty</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                CUSTOMER POLICIES
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Contact Us</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>FAQ</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>T&C</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Track Orders</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Shipping</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                EXPERIENCE MYNTRA APP
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Paper elevation={1} sx={{ p: 1, cursor: 'pointer' }}>
                  <Typography variant="caption">Google Play</Typography>
                </Paper>
                <Paper elevation={1} sx={{ p: 1, cursor: 'pointer' }}>
                  <Typography variant="caption">App Store</Typography>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                KEEP IN TOUCH
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Facebook</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Twitter</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>YouTube</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Instagram</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              © 2025 www.myntra.com. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Terms of Use
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Global Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Register Dialog */}
      <Dialog open={registerOpen} onClose={() => setRegisterOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            Join Myntra
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
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
              value={registerForm.password}
              onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Security />
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
            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Security />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleRegister}
              disabled={loading || !registerForm.name || !registerForm.email || !registerForm.password}
              sx={{ position: 'relative' }}
            >
              {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />}
              Create Account
            </Button>
            <Button
              variant="text"
              fullWidth
              onClick={() => {
                setRegisterOpen(false);
                setLoginOpen(true);
              }}
            >
              Already have an account? Login
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>
        <DialogContent>
          {activeStep === 0 && (
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Typography variant="h6">Shipping Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="City"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={shippingInfo.pincode}
                    onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
          )}

          {activeStep === 1 && (
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Typography variant="h6">Payment Method</Typography>
              <FormControl>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                  <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                  <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                </RadioGroup>
              </FormControl>
              
              {paymentMethod === 'card' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      value={cardInfo.cardNumber}
                      onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCard />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cardholder Name"
                      value={cardInfo.cardName}
                      onChange={(e) => setCardInfo({...cardInfo, cardName: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      value={cardInfo.expiryDate}
                      onChange={(e) => setCardInfo({...cardInfo, expiryDate: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      value={cardInfo.cvv}
                      onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                    />
                  </Grid>
                </Grid>
              )}
            </Stack>
          )}

          {activeStep === 2 && (
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Typography variant="h6">Order Summary</Typography>
              <Paper elevation={1} sx={{ p: 2 }}>
                {cartItems.map((item) => (
                  <Box key={`${item.id}-${item.size}`} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{item.name} (Size: {item.size}) x {item.quantity}</Typography>
                    <Typography>₹{(item.price * item.quantity).toLocaleString()}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ₹{getCartTotal().toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setCheckoutOpen(false)}>Cancel</Button>
          {activeStep > 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={() => setActiveStep(activeStep + 1)}>
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handlePlaceOrder}
              disabled={loading}
              sx={{ position: 'relative' }}
            >
              {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />}
              Place Order
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Order Success Dialog */}
      <Dialog open={orderComplete} onClose={() => setOrderComplete(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Thank you for shopping with us. Your order will be delivered soon.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOrderComplete(false);
              setCheckoutOpen(false);
            }}
          >
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>

      {/* Product Quick View Dialog */}
      <Dialog open={productDialogOpen} onClose={() => setProductDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedProduct && (
          <>
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
          </>
        )}
      </Dialog>
    </ThemeProvider>
  );
}

export default App
