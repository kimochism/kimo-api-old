'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('customers', 'CustomerController').validator(new Map([
  [['customers.store'], ['StoreCustomer']],
  [['customers.update'], ['UpdateCustomer']]
]))

Route.resource('users', 'UserController').validator(new Map([
  [['users.store'], ['StoreUser']],
  [['users.update'], ['UpdateUser']]
]))

Route.post('auth', 'UserController.auth')
.middleware('guest')

