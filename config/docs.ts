import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '',
    version: '1.0.0'
  },
  servers: [
    
  ]
}

const options = {
  swaggerDefinition,
  apis: [
    './src/api/v1/docs/*.yaml'
  ]
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec