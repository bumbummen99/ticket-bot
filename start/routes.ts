/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { Client } from 'discord.js'

Route.get('/', async ({ view }) => {
  const bot: Client = await import('@ioc:TicketBot/DiscordJS')
  const state: {
    [key: string]: any 
  } = {}

  if (bot.user) {
    state.joinUrl = `https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=0&scope=bot%20applications.commands`
  }

  return view.render('welcome', state)
})
