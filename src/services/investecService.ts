export class InvestecService {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    async getAccounts(){
        console.log('Starting getAccounts request...');
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Fetching accounts from Investec API...');
                console.log('Using token:', this.token); 
                const response = await fetch('https://openapisandbox.investec.com/za/pb/v1/accounts', {
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
    
}
