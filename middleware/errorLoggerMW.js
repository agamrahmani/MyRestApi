const fs = require('fs');
const path = require('path');

function logErrorToFile(statusCode, errorMessage) {
    const logDir = path.join(__dirname, '..', 'logs'); 
    const date = new Date().toISOString().split('T')[0]; 
    const logFile = path.join(logDir, `${date}.log`); 
    
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    const logMessage = `${new Date().toISOString()} - Status: ${statusCode} - Error: ${errorMessage}\n`;

    fs.appendFile(logFile, logMessage, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        } else {
            console.log("Error logged to file:", logFile);
        }
    });
}


module.exports = (req, res, next) => {
    res.on('finish', () => {
        if (res.statusCode >= 400) { 
            const errorMessage = `Error: ${res.statusMessage}`;
            logErrorToFile(res.statusCode, errorMessage); 
        }
    });
    next();
};

