import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync} from 'fs';

let database;
if (existsSync("database.json")) {
    database = JSON.parse(readFileSync("database.json"));
} else {
    database = {
        user: [],
        searchResult: [],
        courseDetail: []
    };
}
createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if (parsed.pathname === '/user') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.user.push({
                userEmail: data.userEmail,
                userPassword: data.userPassword,
                userName: data.userName,
                schoolName: data.schoolName,
                gender: data.gender,
                major: data.major
            });
            
            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                }else{
                    res.end();
                }
            });
        });
    } else if (parsed.pathname === '/searchResult') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.searchResult.push({
                courseSchool: data.courseSchool,
                subject: data.subject,
                courseNumber: data.courseNumber,
                courseProfessor: data,courseProfessor,
                courseDifficulty: data.courseDifficulty,
                courseTimeConsumption: data.courseTimeConsumption,
                courseOverall: data.courseOverall
            });
            
            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                }else{
                    res.end();
                }
            });
        });
    } else if (parsed.pathname === '/courseDetail') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.courseDetail.push({
                studentName: data.studentName,
                comment: data.comment,
                courseDifficulty: data.courseDifficulty,
                courseTimeConsumption: data.courseTimeConsumption,
                courseOverall: data.courseOverall
            });
            
            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                }else{
                    res.end();
                }
            });
        });
    } 
    // else if (parsed.pathname === '/highestWordScores') {
    //     res.end(JSON.stringify(
    //         database.wordScores.sort((a, b) => b.score - a.score).filter((v, i) => i < 10)
    //     ));
    // } else if (parsed.pathname === '/highestGameScores') {
    //     res.end(JSON.stringify(
    //         database.gameScores.sort((a, b) => b.score - a.score).filter((v, i) => i < 10)
    //     ));
    // } 
    else {
        // If the client did not request an API endpoint, we assume we need to fetch a file.
        // This is terrible security-wise, since we don't check the file requested is in the same directory.
        // This will do for our purposes.
        const filename = parsed.pathname === '/' ? "index.html" : parsed.pathname.replace('/', '');
        const path = join("client/", filename);
        console.log("trying to serve " + path + "...");
        if (existsSync(path)) {
            if (filename.endsWith("html")) {
                res.writeHead(200, {"Content-Type" : "text/html"});
            } else if (filename.endsWith("css")) {
                res.writeHead(200, {"Content-Type" : "text/css"});
            } else if (filename.endsWith("js")) {
                res.writeHead(200, {"Content-Type" : "text/javascript"});
            } else {
                res.writeHead(200);
            }

            res.write(readFileSync(path));
            res.end();
        } else {
            res.writeHead(404);
            res.end();
        }
    }
}).listen(8080);