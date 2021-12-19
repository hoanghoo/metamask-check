Moralis.Cloud.define("balanceToken", async (request) => {
    return await getBalanceToken(request.params);
})

Moralis.Cloud.define("balanceNative", async (request) => {
    return await getBalanceNative(request.params);
})

Moralis.Cloud.define("transactions", async (request) => {
    return await getTransaction(request.params);
})

Moralis.Cloud.define("transferToken", async (request) => {
    return await getTransferToken(request.params);
})

Moralis.Cloud.define("allowance", async (request) => {
    return await getAllowance(request.params);
})


