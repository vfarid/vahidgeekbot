import {Operators} from "./operators"

export default class ipCommands {

    static execute ({ message }: { message: any }): any {
        return {
            chat_id: message.chat.id,
            text: "گزینه‌ی مورد نظر خود را انتخاب کنید:",
            reply_markup: {
                inline_keyboard: [
                    [{text: "دریافت آی‌پی تمیز", callback_data: "get-clean-ip"}],
                    [{text: "ارسال آی‌پی تمیز", callback_data: "send-clean-ip"}],
                    [{text: "تصدیق آی‌پی تمیز", callback_data: "verify-clean-ip"}],
                ]
            }
        }
    }

    static askForOperator ({ message }: { message: any }): any {
        var keyboard: Array<any> = [
            [
                {text: "همراه اول", callback_data: "operator-mci"},
                {text: "ایرانسل", callback_data: "operator-mtn"},
                {text: "رایتل", callback_data: "operator-rtl"},
            ],
        ]
        var i = 0, j = 0

        // for (var operator in Operators) {
        //     keyboard[i][j] = {
        //         text: Operators[operator],
        //         callback_data: `operator-${operator}`,
        //     }
        //     if (++j === 3) {
        //         i++
        //         j = 0
        //     }
        // }
        console.log(keyboard)
        return {
            chat_id: message.chat.id,
            text: "اپراتور خود را انتخاب کنید:",
            reply_markup: {
                inline_keyboard: keyboard
            }
        }
    }
}