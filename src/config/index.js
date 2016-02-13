
const config = {
  development: {
    env: 'development',
    debug: true,
    base: '/',
    api: 'http://127.0.0.1:8000/'
  },

  production: {
    env: 'production',
    debug: false,
    base: '/',
    api: '/api/'
  }
}

export default config[process.env.NODE_ENV || 'development']
