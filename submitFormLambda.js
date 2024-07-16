const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);
    
    const params = {
        TableName: 'FormData',
        Item: {
            id: Date.now().toString(), // Generate unique id (timestamp)
            firstname: requestBody.firstname,
            lastname: requestBody.lastname,
            email: requestBody.email,
            password: requestBody.password
        }
    };
    
    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Form submitted successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error submitting form' })
        };
    }
};
