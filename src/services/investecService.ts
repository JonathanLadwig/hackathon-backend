export class InvestecService {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    async getAccounts() {
        console.log('Starting getAccounts request...');
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Fetching accounts from Investec API...');
                console.log('Using token:', this.token);
                const response = await fetch('https://king-prawn-app-z8rlu.ondigitalocean.app/za/pb/v1/accounts', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    console.error('Response status:', response.status);  // Log the response status
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Successfully fetched accounts:', data);
                resolve(data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
                reject({ error: 'Failed to fetch accounts' });
            }
        });
    }

    async getAccountBalance(accountId: string): Promise<any> {
        console.log(`Starting getAccountBalance request for account ID ${accountId}...`);
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Fetching balance from Investec API...');
                const response = await fetch(`https://king-prawn-app-z8rlu.ondigitalocean.app/za/pb/v1/accounts/${accountId}/balance`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    console.error('Response status:', response.status);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Successfully fetched balance:', data);
                resolve(data);
            } catch (error) {
                console.error('Error fetching balance:', error);
                reject({ error: 'Failed to fetch balance' });
            }
        });
    }

    async transferMultiple(accountId: string, transfers: any[]): Promise<any> {
        console.log(`Starting transferMultiple request for account ID ${accountId}...`);
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Posting transfers to Investec API...');
                const response = await fetch(`https://king-prawn-app-z8rlu.ondigitalocean.app/za/pb/v1/accounts/${accountId}/transfermultiple`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(transfers)
                });

                if (!response.ok) {
                    console.error('Response status:', response.status);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Successfully posted transfers:', data);
                resolve(data);
            } catch (error) {
                console.error('Error posting transfers:', error);
                reject({ error: 'Failed to post transfers' });
            }
        });
    }

}
