// Define middleware function
function jsonMiddleware (req, res, next) {
    // Construct your JSON data here (e.g., from a database query)
    const jsonData = {
        "data":[
        {
        "name":"A",
        "description":"This is a description of A",
        "parent":""
        },
        {
        "name":"B",
        "description":"This is a description of B",
        "parent":"A"
        },
        {
        "name":"C",
        "description":"This is a description of C",
        "parent":"A"
        },
        {
        "name":"D",
        "description":"This is a description of D",
        "parent":"A"
        },
        {
        "name":"B-1",
        "description":"This is a description of B-1",
        "parent":"B"
        },
        {
        "name":"B-2",
        "description":"This is a description of B-2",
        "parent":"B"
        },
        {
        "name":"B-3",
        "description":"This is a description of B-3",
        "parent":"B"
        }
        ]
        };

    // Set the response content type to JSON
    res.setHeader('Content-Type', 'application/json');

    // Send JSON data back to the client
    res.json(jsonData);
};
module.exports = { jsonMiddleware };