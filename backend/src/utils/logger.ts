import winston from 'winston'

const logLevel = process.env.LOG_LEVEL || 'info'
const nodeEnv = process.env.NODE_ENV || 'development'

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json()
)

// Create logger instance
export const logger = winston.createLogger({
  level: logLevel,
  format: logFormat,
  defaultMeta: {
    service: 'understand-me-backend',
    environment: nodeEnv
  },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

// Add file transport for production
if (nodeEnv === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  )

  logger.add(
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  )
}

// Create a stream object for Morgan HTTP logging
export const loggerStream = {
  write: (message: string) => {
    logger.info(message.trim())
  }
}

// Helper functions for structured logging
export const logError = (message: string, error: any, metadata?: any) => {
  logger.error(message, {
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name
    },
    ...metadata
  })
}

export const logInfo = (message: string, metadata?: any) => {
  logger.info(message, metadata)
}

export const logWarn = (message: string, metadata?: any) => {
  logger.warn(message, metadata)
}

export const logDebug = (message: string, metadata?: any) => {
  logger.debug(message, metadata)
}
