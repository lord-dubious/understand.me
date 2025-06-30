import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Spacing } from '../../constants/Spacing';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'therapeutic' | 'supportive' | 'calming';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85} // Softer interaction for therapeutic feel
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'therapeutic' ? Colors.text.inverse : Colors.primary[500]}
          size="small"
          accessibilityLabel="Loading"
        />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 16, // Softer, more therapeutic corners
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: Spacing.component.touchTarget,
    paddingHorizontal: Spacing.padding.lg,
    paddingVertical: Spacing.padding.md,
  },

  // Therapeutic button variants
  primary: {
    backgroundColor: Colors.primary[500],
    shadowColor: Colors.primary[300], // Softer shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15, // Gentler shadow
    shadowRadius: 6,
    elevation: 3,
  },
  secondary: {
    backgroundColor: Colors.secondary[500],
    shadowColor: Colors.secondary[300],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  therapeutic: {
    backgroundColor: Colors.emotion.calm,
    shadowColor: Colors.emotion.calm,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  supportive: {
    backgroundColor: Colors.emotion.growth,
    shadowColor: Colors.emotion.growth,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  calming: {
    backgroundColor: Colors.primary[100],
    borderWidth: 1,
    borderColor: Colors.primary[300],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
    shadowRadius: 4,
    elevation: 4,
  },

  // Sizes
  small: {
    paddingVertical: Spacing.padding.sm,
    paddingHorizontal: Spacing.padding.md,
    minHeight: 36,
  },
  medium: {
    paddingVertical: Spacing.padding.md,
    paddingHorizontal: Spacing.padding.lg,
  },
  large: {
    paddingVertical: Spacing.padding.lg,
    paddingHorizontal: Spacing.padding.xl,
    minHeight: 56,
  },

  // Text styles
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  primaryText: {
    color: Colors.text.inverse,
    fontSize: Typography.sizes.base,
  },
  secondaryText: {
    color: Colors.text.inverse,
    fontSize: Typography.sizes.base,
  },
  therapeuticText: {
    color: Colors.text.inverse,
    fontSize: Typography.sizes.base,
  },
  supportiveText: {
    color: Colors.text.inverse,
    fontSize: Typography.sizes.base,
  },
  calmingText: {
    color: Colors.primary[700],
    fontSize: Typography.sizes.base,
  },
  outlineText: {
    color: Colors.primary[500],
    fontSize: Typography.sizes.base,
  },
  ghostText: {
    color: Colors.primary[500],
    fontSize: Typography.sizes.base,
  },

  // Size-specific text
  smallText: {
    fontSize: Typography.sizes.sm,
  },
  mediumText: {
    fontSize: Typography.sizes.base,
  },
  largeText: {
    fontSize: Typography.sizes.lg,
  },

  // States
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledText: {
    opacity: 0.7,
  },
  fullWidth: {
    width: '100%',
  },
});
