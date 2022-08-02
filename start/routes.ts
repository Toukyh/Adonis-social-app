import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login').as('login')
  Route.post('/register', 'AuthController.register').as('register')
  Route.post('/logout', 'AuthController.logout').as('logout')

  Route.get('/authenticated', 'AuthController.authenticated').middleware(
    'auth:api'
  )
  Route.get('/:provider/redirect', 'SocialsController.redirect')
  Route.get('/:provider/callback', 'SocialsController.callback')
}).prefix('api')
