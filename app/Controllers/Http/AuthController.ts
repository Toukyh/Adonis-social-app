import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/user'

export default class AuthController {
  public async login ({ request, response, auth }: HttpContextContract) {
    const password = await request.input('password')
    const email = await request.input('email')

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '24hours'
      })
      return token.toJSON()
    } catch {
      return response.status(401).send({
        error: {
          message: 'User with provided credentials could not be found'
        }
      })
    }
  }
  public async register ({ request,auth, response }: HttpContextContract) {
    // validate email
    const validations = await schema.create({
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' })
      ]),
      password: schema.string({}, [rules.confirmed()]),
      username: schema.string({}, [
        rules.unique({ table: 'users', column: 'username' })
      ])
    })
    const data = await request.validate({ schema: validations })
    const user = await User.create(data)
    const token = await auth.use('api').generate(user)

    return response.json({user,token})
  }
  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200)
  }
  public async authenticated ({ auth, response }: HttpContextContract) {
    const user = await auth.use('api').authenticate()

    return response.json({user:user})
  }
}
