// PageHeader component types - following TypeScript best practices
export interface IPageHeaderProps {
  loading: boolean;
  onAddLogClick: () => void;
}

export interface IActionButtonProps {
  loading: boolean;
  onAddLogClick: () => void;
}

// For extensibility - following Open/Closed Principle
export interface IPageHeaderConfig {
  showIcon?: boolean;
  showSubtitle?: boolean;
  buttonVariant?: 'gradient' | 'primary' | 'secondary';
}

// Future enhancement - theme configuration
export interface IPageHeaderTheme {
  colors?: {
    iconGradient?: string[];
    titleGradient?: string[];
    underlineGradient?: string[];
  };
  spacing?: {
    headerMargin?: string;
    iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  };
}
