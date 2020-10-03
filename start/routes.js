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

// auth
Route.post('auth', 'UserController.auth')
// .middleware('guest')

// customers
Route.resource('customers', 'CustomerController').validator(new Map([
  [['customers.store'], ['StoreCustomer']],
  [['customers.update'], ['UpdateCustomer']]
])).middleware('auth')


// users
Route.resource('users', 'UserController').validator(new Map([
  [['users.store'], ['StoreUser']],
  [['users.update'], ['UpdateUser']]
]))

// products
Route.resource('products', 'ProductController')

// product categories
Route.resource('productCategories', 'ProductCategoryController').middleware('auth')

// product images
Route.resource('productImages', 'ProductImageController').middleware('auth')

// categories
Route.resource('categories', 'CategoryController').middleware('auth')

// orders
Route.resource('orders', 'OrderController').middleware('auth')

// images
Route.resource('images', 'ImageController').middleware('auth');

// customer bags
Route.resource('customerBags', 'CustomerBagController').middleware('auth')
