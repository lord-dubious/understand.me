import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    secondary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },
  fonts: {
    heading: 'System',
    body: 'System',
    mono: 'Courier'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60
  },
  space: {
    px: 1,
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    32: 128,
    40: 160,
    48: 192,
    56: 224,
    64: 256
  },
  radii: {
    none: 0,
    sm: 2,
    base: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 24,
    full: 9999
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1
    },
    base: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10
      },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 8
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 20
      },
      shadowOpacity: 0.25,
      shadowRadius: 25,
      elevation: 12
    }
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg',
        _text: {
          fontWeight: 'semibold'
        }
      },
      sizes: {
        sm: {
          px: 3,
          py: 2,
          _text: {
            fontSize: 'sm'
          }
        },
        md: {
          px: 4,
          py: 3,
          _text: {
            fontSize: 'md'
          }
        },
        lg: {
          px: 6,
          py: 4,
          _text: {
            fontSize: 'lg'
          }
        }
      },
      variants: {
        solid: {
          bg: 'primary.500',
          _text: {
            color: 'white'
          },
          _pressed: {
            bg: 'primary.600'
          }
        },
        outline: {
          borderWidth: 1,
          borderColor: 'primary.500',
          bg: 'transparent',
          _text: {
            color: 'primary.500'
          },
          _pressed: {
            bg: 'primary.50'
          }
        },
        ghost: {
          bg: 'transparent',
          _text: {
            color: 'primary.500'
          },
          _pressed: {
            bg: 'primary.50'
          }
        }
      }
    },
    Input: {
      baseStyle: {
        borderRadius: 'lg',
        borderWidth: 1,
        borderColor: 'gray.300',
        px: 4,
        py: 3,
        fontSize: 'md',
        _focus: {
          borderColor: 'primary.500',
          bg: 'white'
        }
      }
    },
    Card: {
      baseStyle: {
        borderRadius: 'xl',
        bg: 'white',
        shadow: 'sm',
        borderWidth: 1,
        borderColor: 'gray.100'
      }
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        px: 2,
        py: 1,
        _text: {
          fontSize: 'xs',
          fontWeight: 'medium'
        }
      }
    }
  }
})
