import PropTypes from 'prop-types'

const Card = ({ 
  children, 
  hover = false, 
  padding = 'md',
  className = '' 
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return (
    <div className={`
      bg-white rounded-xl shadow-soft border border-gray-100
      ${paddings[padding]}
      ${hover ? 'transition-all duration-200 hover:shadow-medium hover:-translate-y-1 cursor-pointer' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  hover: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  className: PropTypes.string
}

export default Card
