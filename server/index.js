import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync} from 'fs';

let database;
if (existsSync("server/database.json")) {
    database = JSON.parse(readFileSync("server/database.json"));
} else {
    database = {
        users: [],
        courses: []
    };
}
createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if (parsed.pathname === '/addnewuser') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.users.push({
                useremail: data.useremail,
                userpassword: data.userpassword,
                username: data.username,
                userschoolname: data.userschoolname,
                usergender: data.usergender,
                usermajor: data.usergender
            });
            // console.log(database);
            
            writeFile("server/database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                }else{
                    res.end();
                }
            });
        });
    }
    else if (parsed.pathname === '/addnewcourse') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.courses.push({
                courseschoolname: data.courseschoolname,
                coursesubject: data.coursesubject,
                coursenumber: data.coursenumber,
                courseprofessor: data.courseprofessor,
                coursedifficulty: data.coursedifficulty,
                coursetime: data.coursetime,
                courseoverall: data.courseoverall,
                coursecomment: data.coursecomment
            });
            
            writeFile("server/database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                }else{
                    res.end();
                }
            });
        });
    }
    else if (parsed.pathname === '/loadcourses') {
        res.end(JSON.stringify(
            database.courses
        ));
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