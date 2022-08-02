import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/user'
import Env from '@ioc:Adonis/Core/Env'

export default class SocialsController {
  public async redirect ({
    params,
    ally,
    auth,
    response
  }: HttpContextContract) {
    if (await auth.check()) {
      return response.notAcceptable()
    }

    return response.send(
      await ally
        .use(params.provider)
        .stateless()
        .redirectUrl()
    )
  }
  public async callback ({ ally, auth, response, params }) {

    if (await auth.check())return response.notAcceptable()

    const provider = ally.use(params.provider).stateless()

    if (provider.accessDenied())return 'Access was denied'
    if (provider.hasError())return provider.getError()

    const { token } = await provider.accessToken()

    const providerUser = await provider.userFromToken(token)

    const userCreated = await User.firstOrCreate(
      {
        email: providerUser.email!
      },
      {
        username: providerUser.name,
        password: 'password'
      }
    )
    await userCreated.related('providers').firstOrCreate(
      {
        provider: params.provider,
        provider_id: providerUser.id
      },
      {
        avatar: providerUser.avatarUrl
      }
    )
    const oat = await auth.use('api').login(userCreated, {
      expiresIn: '1day'
    })
    // return response.json(providerUser)
    return response.redirect().toPath(`${Env.get('CLIENT_BASE_URL')}/callback/?token=${oat.token}`)
  }
}
