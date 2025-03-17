# node-a03
node-a03

## instruction

### install packages

```
npm install mongodb
npm install dotenv
npm install mongoose
npm install multer
```

### check your mongosh is installed

```
mongosh --version
```

### connect to your mongoDB

- mongo URI

```
MONGO_URI=mongodb+srv://flatbase1012:hB1On4p1tavw37Fi@yoshi.kk0el.mongodb.net/A03?retryWrites=true&w=majority&appName=Yoshi
```

```
mongosh "mongodb+srv://DBUSER:PASSWORD@xxxxx.xxxxx.mongodb.net/DBNAME?retryWrites=true&w=majority&appName=ANY"
```

### insert records

```
db.projects.insertMany([
  {
    title: "Project One",
    summary: "An API-driven dashboard.",
    description: "A detailed explanation of the project.",
    tech: ["Node.js", "Express", "MongoDB"],
    screenshot: "/images/pizza_1024.png"
  },
  {
    title: "Admin Dashboard",
    summary: "A real-time dashboard for admins.",
    description: "Detailed description for Admin Dashboard project.",
    tech: ["React", "Node.js", "GraphQL"],
    screenshot: "/images/pizza_1024.png"
  }
])
```

### to query records

we can reference contact messages like this.

```
db.contactmessages.find().pretty()
```
