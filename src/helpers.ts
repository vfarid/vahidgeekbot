export default class Helpers {
    static getCancelMessage({ message }: { message: any }): any {
        return {
            chat_id: message.chat.id,
            text: "عملیات لغو گردید.",
            reply_markup: { remove_keyboard: true },
        }
    }

    static getHelpMessage({ message }: { message: any }): any {
        return {
            chat_id: message.chat.id,
            text: `\
خوش آمدید.
برای استفاده از ربات، یکی از دستورات زیر را انتخاب نمایید:

/ip - دریافت/ارسال آی‌پی تمیز
/worker - راهنمای ساخت ورکر
/help - راهنمای فعلی
/cancel - لغو عملیات

برای کسب اطلاعات بیشتر به کانال تلگرامی من مراجعه فرمایید:
@VahidGeek
`,
        }
    }
    
    static getUnderDevelopmentMessage({ message }: { message: any }): any {
        return {
            chat_id: message.chat.id,
            text: "این بخش در حال توسعه می باشد...",
        }
    }
    
    static getRandomNElements({ arr, num }: {
        arr: Array<any>
        num: number
    }): Array<any> {
        const shuffled = arr.sort(() => 0.5 - Math.random())
        return shuffled.slice(0, num)
    }

    static toKeyboard({ choices, cols = 1, prefix = "", cancel = true }: {
        choices: any
        cols?: number
        prefix?: string
        cancel?: boolean
    }): Array<any> {
        var i = 0, j = 0
        var keyboard: Array<any> = []
        var row: Array<any> = []
        console.log(choices, cols, prefix)
        for (const [key, value] of Object.entries(choices)) {
            row.push({
                text: value,
                callback_data: `${prefix}${key}`,
            })
            if (++j === cols) {
                i++
                j = 0
                keyboard.push(row)
                row = []
            }
        }
        if (row.length) {
            keyboard.push(row)
        }
        if (cancel) {
            keyboard.push([{
                text: "لغو عملیات",
                callback_data: `cancel`,
            }])
        }
        console.log(keyboard)
        return keyboard
    }
}