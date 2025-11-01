import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

const API_URL = 'https://expensetracker-y93m.onrender.com/api';

export const useTransactions = (userId) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expense: 0
    });

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }, [userId]);

    const fetchSummary = useCallback(async () => {
        try {
            
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
            const data = await response.json();
            // console.log("fetched summary", data);
            setSummary(data);
        } catch (error) {
            console.error('Error fetching summary:', JSON.stringify(error, null, 1));
        }

    }, [userId]);


    const loadData = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            await Promise.all([fetchTransactions(), fetchSummary()]);
            console.log("summary after loadData", summary);
            // console.log("5555555555555555555555555");
            
        } catch (error) {
            console.error('Error loading data:', error);
            
        } finally {
            setLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userId]);


    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete transaction');
            }
            await loadData();
            Alert.alert('Success', 'Transaction deleted successfully');
        } catch (error) {
            console.error('Error deleting transaction:', error);
            Alert.alert('Error', error.message);
        }
    };


    return {transactions, loading, summary, loadData, deleteTransaction}

};