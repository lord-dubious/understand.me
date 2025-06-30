import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Spacing';

interface TherapeuticCardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  style?: ViewStyle;
  elevation?: 'none' | 'subtle' | 'medium' | 'high';
  padding?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'small' | 'medium' | 'large' | 'xl';
  useGradient?: boolean;
  darkMode?: boolean;
  testID?: string;
}

const TherapeuticCard: React.FC<TherapeuticCardProps> = ({
  children,
  variant = 'primary',
  style,
  elevation = 'subtle',
  padding = 'medium',
  borderRadius = 'medium',
  useGradient = false,
  darkMode = false,
  testID,
}) => {
  const getVariantColors = () => {
    if (useGradient) {
      switch (variant) {
        case 'primary':
          return darkMode ? Colors.gradients.darkPrimary : Colors.gradients.primary;
        case 'secondary':
          return darkMode ? Colors.gradients.darkSecondary : Colors.gradients.secondary;
        case 'accent':
          return darkMode ? Colors.gradients.darkAccent : Colors.gradients.accent;
        case 'neutral':
          return darkMode ? Colors.gradients.darkNeutral : Colors.gradients.neutral;
        default:
          return Colors.gradients.primary;
      }
    } else {
      switch (variant) {
        case 'primary':
          return darkMode ? Colors.background.darkPrimary : Colors.background.primary;
        case 'secondary':
          return darkMode ? Colors.background.darkSecondary : Colors.background.secondary;
        case 'accent':
          return darkMode ? Colors.background.darkAccent : Colors.background.accent;
        case 'neutral':
          return darkMode ? Colors.background.darkNeutral : Colors.background.neutral;
        default:
          return Colors.background.primary;
      }
    }
  };

  const getElevationStyle = () => {
    switch (elevation) {
      case 'none':
        return {};
      case 'subtle':
        return {
          shadowColor: Colors.shadow.primary,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
        };
      case 'medium':
        return {
          shadowColor: Colors.shadow.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 3,
        };
      case 'high':
        return {
          shadowColor: Colors.shadow.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 6,
        };
      default:
        return {};
    }
  };

  const cardStyle = [
    styles.base,
    styles[padding],
    styles[borderRadius],
    getElevationStyle(),
    !useGradient && { backgroundColor: getVariantColors() as string },
    style,
  ];

  if (useGradient) {
    return (
      <View style={cardStyle} testID={testID}>
        <LinearGradient
          colors={getVariantColors() as string[]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {children}
      </View>
    );
  }

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    position: 'relative',
  },
  none: {
    padding: 0,
  },
  small: {
    padding: Spacing.xs,
  },
  medium: {
    padding: Spacing.md,
  },
  large: {
    padding: Spacing.lg,
  },
  small: {
    borderRadius: 8,
  },
  medium: {
    borderRadius: 12,
  },
  large: {
    borderRadius: 16,
  },
  xl: {
    borderRadius: 20,
  },
});

export default TherapeuticCard;
