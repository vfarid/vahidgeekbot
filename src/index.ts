/*!
  * VahidGeek's Telegram Bot Backend using Worker
  * Copyright 2023 Vahid Farid (https://twitter.com/vahidfarid)
  * Licensed under GPLv3 (https://github.com/vfarid/vahidgeekbot/blob/main/Licence.md)
  */

import Telegram from "./telegram"
import ipCommands from "./ip-command"

export interface Env {
  	API_TOKEN: string;
}

export default {
	async fetch(
		request: Request,
		env: Env,
	): Promise<Response> {
		var url = new URL(request.url)
		var path = url.pathname.replace(/^\/|\/$/g, "")
		const telegram = new Telegram({ token: env.API_TOKEN })
		if (
			path.toLowerCase() === "webhook" &&
			request.method.toLowerCase() === "post"
		) { // Webhook post request
			const data: any = await request.json();
			console.log(data)

			var reply:any = null
			if (data.hasOwnProperty("callback_query")) { // Inline keaboard reply
				const message = data.callback_query.message
				const callbackData = data.callback_query.data

				reply = ipCommands.askForOperator({ message: message })
				reply = telegram.answerCallbackQuery({ message: reply })

			} else if (data.hasOwnProperty("message")) {
				const message = data.message
				if (
					message.hasOwnProperty("entities") &&
					message.entities.length === 1 &&
					message.entities[0].type === "bot_command"
				) {
					const command = getCommand({ message: message })
					if (command === "ip") {
						reply = ipCommands.execute({ message: message })
					}
				} else {
					//
				}
			}
			if (reply) {
				console.log(reply)
				return telegram.sendMessage({ message: reply })
			}
		}
		return new Response("Nothing to show :)");
	},
}

function getCommand({ message }: {
	message: any;
}): string {
	const command: string = message.text.substring(
		message.entities[0].offset,
		message.entities[0].length
	).replace(/^\//g, "")
	return command.toLowerCase()
}

function executeCommand({ message }: { message: any }): any {
	const command = getCommand({
		message: message
	})
	console.log(command)
}
