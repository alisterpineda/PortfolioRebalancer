export class AlphaVantageClient {
    private baseUrl: string = 'https://www.alphavantage.co/query';
    apiKey: string = "";

    constructor() {}

    async fetchPrice(symbol: string): Promise<number> {
        return fetch(this.baseUrl + `?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`)
            .then(response => {
                if (response.status !== 200) {
                    throw `An AlphaVantage error occurred.\n${response.status}: ${response.text()}`;
                }
                return response.json();
            })
            .then(json => {
                if (json['Global Quote'] == null) {
                    throw `An AlphaVantage error occurred.\n${json['Information'] || JSON.stringify(json)}}`;
                }
                return parseFloat(json['Global Quote']['05. price'])
            })
    }
}