const winesModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:8976" :
        "https://jsramverk-wines-efostud.azurewebsites.net",
    getAllWines: async function getAllWines(token) {
        const response = await fetch(`${winesModel.baseUrl}/wines`, {
            headers: {
                "x-access-token": token,
            }
        });

        const wines = await response.json();

        return wines.data;
    },
    saveWine: async function saveWine(newWine) {
        const response = await fetch(`${winesModel.baseUrl}/wines`, {
            body: JSON.stringify(newWine),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        console.log(result);
    }
};

export default winesModel;
