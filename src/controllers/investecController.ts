import { Elysia } from 'elysia';
import { InvestecService } from '../services/investecService';
import { bearer } from '../../env/env';

const token = bearer;
const investecService = new InvestecService(token);

export const investecController = new Elysia({ prefix: '/investec' })
    .get('/api/accounts', async (req: any, res: any) => {
        console.log('Received request for /api/accounts');
            const accounts = await investecService.getAccounts();
            return accounts;
    })

    .get('/api/accounts/:accountId/balance', async (req: any, res: any) => {
        const { accountId } = req.params;
        console.log(`Received request for /api/accounts/${accountId}/balance`);
            const balance = await investecService.getAccountBalance(accountId);
        return balance;
    });


console.log('Investec controller is set up with the /api/accounts route');
