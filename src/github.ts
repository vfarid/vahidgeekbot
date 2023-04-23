const ipProviderLink = "https://raw.githubusercontent.com/vfarid/cf-clean-ips/main/list.json"

export default class Github {
    token: string

    constructor({ token }: { token: string }) {
        this.token = token
    }

    static async getIPv4Json({ operator }: { operator: string }) : Promise<any> {
        // console.log(operator)
        var cleanIPs = await fetch(ipProviderLink)
            .then((r: Response) => r.json())
            .then((j: any) => j.ipv4)
        return cleanIPs.filter((el: any) => el.operator == operator.toUpperCase())
    }
}