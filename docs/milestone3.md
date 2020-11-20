# Milestone 2: Back-end Implementation
## Database Implementation (PostgreSQL)
### CREATE TABLEs:
CREATE TABLE users (userid SERIAL PRIMARY KEY, email VARCHAR(255), password VARCHAR[2], username VARCHAR(255), schoolname VARCHAR(255), gender VARCHAR(255), major VARCHAR(255));

CREATE TABLE courses (courseid SERIAL PRIMARY KEY, schoolname VARCHAR(255), coursesubject VARCHAR(255), coursenumber VARCHAR(255), instructor VARCHAR(255), difficulty INTEGER, time INTEGER, overall INTEGER);

CREATE TABLE coursecomments (courseid INTEGER, username VARCHAR(255), textcomment TEXT, difficulty INTEGER, time INTEGER, overall INTEGER);
#### TABLE users:
| Column | Data Type | Description |  
|--------------|-----------|--------------------------|  
| userid | SERIAL | Auto-increment User ID(Unique Identifier) |  
| email | VARCHAR(255) | User Email(Should be Unique) |
| password | Array VARCHAR[2] | User Password storing salt and hash as an array |
| username | VARCHAR(255) | User Name(Nick name) |
| schoolname | VARCHAR(255) | User School Name |
| gender | VARCHAR(255) | User gender |
| major | VARCHAR(255) | User major |

#### TABLE courses:
| Column | Data Type | Description |  
|--------------|-----------|--------------------------|  
| courseid | SERIAL | Auto-increment Course ID(Unique Identifier) |  
| schoolname | VARCHAR(255) | Course School Name(Umass Amherst) |
| coursesubject | VARCHAR(255) | Course Subject(CS) |
| coursenumber | VARCHAR(255) | Course Number(326) |
| instructor | VARCHAR(255) | Course Instructor |
| difficulty | INTEGER | Course Difficulty |
| time | INTEGER | Course Time Consumption |
| overall | INTEGER | Course Overall Evaluation |

#### TABLE coursecomments:
| Column | Data Type | Description |  
|--------------|-----------|--------------------------|  
| courseid | SERIAL | Auto-increment Course ID(Unique Identifier) |  
| username | VARCHAR(255) | User Name(Nickname) who commented(Default: Anonymous) |
| difficulty | INTEGER | Course Comment Difficulty |
| time | INTEGER | Course Comment Time Consumption |
| overall | INTEGER | Course Comment Overall Evaluation |