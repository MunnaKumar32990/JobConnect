import PropTypes from 'prop-types'

const Loading = ({ 
  size = 'md', 
  fullScreen = false,
  text = 'Loading...'
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }
  
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-gray-200 border-t-primary-600`} />
      {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  )
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }
  
  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  )
}

Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  fullScreen: PropTypes.bool,
  text: PropTypes.string
}

export default Loading
