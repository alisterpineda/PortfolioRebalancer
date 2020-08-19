export class AlphaVantageClient {
    private baseUrl: string = 'https://www.alphavantage.co/query';
    apiKey: string = "";

    constructor() {}

    async fetchPrice(symbol: string): Promise<number> {
        return fetch(this.baseUrl + `?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`)
            .then(response => response.json())
            .then(json => {
                const price = parseFloat(json['Global Quote']['05. price'])
                if (!isNaN(price)){
                    return price
                } else {
                    throw new Error("Could not retrieve price!");
                }
            })
    }
}