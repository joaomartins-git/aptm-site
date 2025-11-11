interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '6xl' | '7xl'
}

export default function Container({
  children,
  className = '',
  size = '6xl'
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  }

  const classes = `mx-auto ${sizeClasses[size]} px-4 sm:px-6 ${className}`

  return (
    <div className={classes}>
      {children}
    </div>
  )
}