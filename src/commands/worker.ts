import Helpers from "../helpers"
import Github from "../github"

export default class codeCommand {
    static codeChoices: any = {
        "worker-sub": "",
        "worker-clash": "",
    }

    
    static async execute({ message }: { message: any }): Promise<any> {
        return {
            chat_id: message.chat.id,
            text: "گزینه‌ی مورد نظر خود را انتخاب کنید:",
            reply_markup: {
                inline_keyboard: Helpers.toKeyboard({ choices: codeCommand.codeChoices })
            }
        }
    }
}