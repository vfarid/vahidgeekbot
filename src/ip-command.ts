import {Operators} from "./operators"
import Helpers from "./helpers"
import Github from "./github"

export default class ipCommand {
    static cleanIpChoices: any = {
        "get-clean-ip": "دریافت آی‌پی تمیز",
        "send-clean-ip": "ارسال آی‌پی تمیز",
        "verify-clean-ip": "تصدیق آی‌پی تمیز",
    }

    
    static async execute({ message }: { message: any }): Promise<any> {
        return {
            chat_id: message.chat.id,
            text: "گزینه‌ی مورد نظر خود را انتخاب کنید:",
            reply_markup: {
                inline_keyboard: Helpers.toKeyboard({ choices: ipCommand.cleanIpChoices })
            }
        }
    }

    static async askForOperator({ message, choice }: {
        message: any
        choice: string
    }): Promise<any> {
        return {
            chat_id: message.chat.id,
            text: `گزینه‌ی انتخابی شما: ${choice}.\n\nلطفا اپراتور خود را انتخاب کنید:`,
            reply_markup: {
                inline_keyboard: Helpers.toKeyboard({ choices: Operators, cols: 3, prefix: "operator-" })
            }
        }
    }

    static async sendIPForOperator({ message, operator }: {
        message: any
        operator: string
    }): Promise<any> {
        const ipList = await Github.getIPv4Json({ operator: operator })
        // console.log(ipList)
        return {
            chat_id: message.chat.id,
            parse_mode: "Markdown",
            text:
                `آی‌پی تمیز برای ${Operators[operator]}:\n\n` +
                Helpers.getRandomNElements({ arr: ipList, num: 3 })
                    .map((el: any) => `\`${el.ip}\``)
                    .join("\n\n"),
        }
    }
}