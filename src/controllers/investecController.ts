import { Elysia } from 'elysia';
import { InvestecService } from '../services/investecService';
import { bearer } from '../../env/env';

const token = bearer;
const investecService = new InvestecService(token);

export const investecController = new Elysia({ prefix: '/investec' })
    .get('/api/accounts', async (req: any, res: any) => {
        console.log('Received request for /api/accounts');
        try {
            console.log('Calling getAccounts service...');
            const accounts = await investecService.getAccounts();
            console.log('Accounts retrieved successfully:', accounts);
            res.send(accounts);
        } catch (error) {
            console.error('Error fetching accounts:', error);
            res.status(500).send({ error: 'Failed to fetch accounts' });
        }
    });

console.log('Investec controller is set up with the /api/accounts route');
