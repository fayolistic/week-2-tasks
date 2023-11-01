function findDuplicateTransactions(transactions) {
        const batchTransactions = {};
    
        // Create a unique key for each transaction based on originAccount, selectAccount, category, and amount
        transactions.forEach((transaction) => {
            const key = `${transaction.originAccount}-${transaction.selectAccount}-${transaction.category}-${transaction.amount}`;
            if (!batchTransactions[key]) {
                batchTransactions[key] = [transaction];
            } else {
                batchTransactions[key].push(transaction);
            }
        });
    
        // Find and collect batch transactions with time difference less than 1 minute
        const batchOfTransactions = [];
    
        for (const key in batchTransactions) {
            const batch = batchTransactions[key];
            if (batch.length > 1) {
                batch.sort((a, b) => new Date(a.time) - new Date(b.time));
                const startTime = 60 * 1000; // 1 minute in milliseconds
                let presentBatch = [batch[0]];
    
                for (let i = 1; i < batch.length; i++) {
                    const prevTime = new Date(presentBatch[presentBatch.length - 1].time);
                    const currentTime = new Date(batch[i].time);
                    const timeDifference = Math.abs(currentTime - prevTime);
    
                    if (timeDifference <= startTime) {
                        presentBatch.push(batch[i]);
                    } else {
                        if (presentBatch.length > 1) {
                            batchOfTransactions.push(presentBatch);
                        }
                        presentBatch = [batch[i]];
                    }
                }
    
                if (presentBatch.length > 1) {
                    batchOfTransactions.push(presentBatch);
                }
            }
        }
    
        // Sort batchg by the time of the first transaction in each batch
        batchOfTransactions.sort((a, b) => new Date(a[0].time) - new Date(b[0].time));
    
        return batchOfTransactions;
    }


export default findDuplicateTransactions;




  