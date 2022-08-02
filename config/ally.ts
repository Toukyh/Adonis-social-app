/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { AllyConfig } from '@ioc:Adonis/Addons/Ally'

/*
|--------------------------------------------------------------------------
| Ally Config
|--------------------------------------------------------------------------
|
| The `AllyConfig` relies on the `SocialProviders` interface which is
| defined inside `contracts/ally.ts` file.
|
*/
const allyConfig: AllyConfig = {
	/*
	|--------------------------------------------------------------------------
	| Github driver
	|--------------------------------------------------------------------------
	*/
	github: {
		driver: 'github',
		clientId: Env.get('GITHUB_CLIENT_ID'),
		clientSecret: Env.get('GITHUB_CLIENT_SECRET'),
		callbackUrl: Env.get('GITHUB_CLIENT_CALLBACK')
	},
	/*
	|--------------------------------------------------------------------------
	| Google driver
	|--------------------------------------------------------------------------
	*/
	google: {
		driver: 'google',
		clientId: Env.get('GOOGLE_CLIENT_ID'),
		clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
		callbackUrl: Env.get('GOOGLE_CLIENT_CALLBACK'),
	},
  /*
  |--------------------------------------------------------------------------
  | Facebook driver
  |--------------------------------------------------------------------------
  */
  facebook: {
    driver: 'facebook',
    clientId: Env.get('FACEBOOK_CLIENT_ID'),
    clientSecret: Env.get('FACEBOOK_CLIENT_SECRET'),
    callbackUrl: Env.get('FACEBOOK_CLIENT_CALLBACK'),
  },
}

export default allyConfig
