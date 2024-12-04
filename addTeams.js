// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// // MongoDB connection string
// const uri = 'mongodb://localhost:27017/test'; // Replace 'test' with your actual database name

// // Connect to MongoDB
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.error("Could not connect to MongoDB", err));

// // Define the Team schema
// const teamSchema = new mongoose.Schema({
//     teamId: { type: Number, required: true },
//     members: [{
//         rollNo: { type: String, required: true },
//         name: { type: String, required: true },
//         email: { type: String, required: false },
//         password: { type: String, required: false },
//         role: { type: String, required: true, enum: ['teamLead', 'teamMember'] }
//     }]
// });

// // Create the model for teams
// const Team = mongoose.model('Team', teamSchema);

// // Sample team data
// const teams = [
//     {
//         teamId: 1,
//         members: [
//             { rollNo: "22B21A4525", name: "KUDUPUDI DURGA PRASAD", email: "durgaprasadkudupudi6@gmail.com", password: "KUDUPUDIDURGAPRASAD@25", role: "teamLead" },
//             { rollNo: "22B21A4408", name: "HEMALATHA SAPPA", email: null, password: null, role: "teamMember" },
//             { rollNo: "22JN1A4593", name: "JOGI. CHANDU MEGHANA", email: "jogiveera1234@gmail.com", password: "JOGICHANDUMEGHANA@93", role: "teamMember" },
//             { rollNo: "22JN1A45A6", name: "BANDI LAVANYA", email: "bandilavanya2004@gmail.com", password: "BANDILAVANYA@06", role: "teamMember" },
//             { rollNo: "22B21A4451", name: "J.GOWTHAM", email: "gowthamjuttiga@gmail.com", password: "J.GOWTHAM@51", role: "teamMember" },
//             { rollNo: "22JN1A45E3", name: "U.VINEETHA", email: "uppadavineetha123@gmail.com", password: "U.VINEETHA@03", role: "teamMember" }
//         ]
//     },
//     {
//         teamId: 2,
//         members: [
//             { rollNo: "22B21A4235", name: "A.PRADEEP", email: "dineshkrishnapradeep@gmail.com", password: "A.PRADEEP@35", role: "teamLead" },
//             { rollNo: "22B21A4484", name: "BHEEMAVARAPU HEMANTH DURGA PRASAD", email: null, password: null, role: "teamMember" },
//             { rollNo: "22JN1A4318", name: "GANDI PURNA CHANDRIKA ANUKA", email: "anukagandi454@gmail.com", password: "GANDIPURNACHANDRIKA@18", role: "teamMember" },
//             { rollNo: "22B21A4512", name: "ASAPU GOWRI BHAGYASRI", email: "gowribhagyasriasapu@gmail.com", password: "ASAPUGOWRIBHAGYASRI@12", role: "teamMember" },
//             { rollNo: "22JN1A4505", name: "BAIREDDY HYMAVATHI", email: "hymabaireddy1@gmail.com", password: "BAIREDDYHYMAVATHI@05", role: "teamMember" },
//             { rollNo: "22JN1A45D6", name: "SIDDA ANSHU", email: null, password: null, role: "teamMember" }
//         ]
//     },
//     {
//         "teamId": 3,
//         "members": [
//             { "rollNo": "22B21A4323", "name": "BOMMIREDDY AISHWARYA", "email": null, "password": null, "role": "teamLead" },
//             { "rollNo": "22JN1A45B1", "name": "DARLA SATHYASAI", "email": "sathyasaidarla11@gmail.com", "password": "DARLASATHYASAI@B1", "role": "teamMember" },
//             { "rollNo": "22JN1A4307", "name": "BHAVANI.PAILI", "email": "bhavanipaili2306@gmail.com", "password": "BHAVANIPAILI@07", "role": "teamMember" },
//             { "rollNo": "226Q1A4210", "name": "CHITTI. SYAM KUMAR", "email": "syamkumarchitti@gmail.com", "password": "CHITTISYAMKUMAR@10", "role": "teamMember" },
//             { "rollNo": "22B21A4436", "name": "RAYUDU BHARANI SATYA SIVA DURGAPRASAD", "email": "rayudubharani7288@gmail.com", "password": "RAYUDUBHARANISATYASIVADURGAPRASAD@36", "role": "teamMember" },
//             { "rollNo": "22B21A4349", "name": "K.SAI KIRAN", "email": "saikiranmain1708@gmail.com", "password": "KSAIKIRAN@49", "role": "teamMember" }
//         ]
//     }
//     ,
//     {
//         "teamId": 4,
//         "members": [
//             { "rollNo": "22B21A4444", "name": "ASHOK ATRAGADDA", "email": "ashok7075657409@gmail.com", "password": "ASHOKATRAGADDA@44", "role": "teamLead" },
//             { "rollNo": "226Q1A4621", "name": "CH.REVA VARUN", "email": "varunchandu1233@gmail.com", "password": "CHREVAVARUN@21", "role": "teamMember" },
//             { "rollNo": "22JN1A4565", "name": "P. MAHALAKSHMI", "email": null, "password": null, "role": "teamMember" },
//             { "rollNo": "22B21A4507", "name": "K.SYAMALA TEJASWI", "email": null, "password": null, "role": "teamMember" },
//             { "rollNo": "22B21A4595", "name": "CH.K.SOWJANYA", "email": null, "password": null, "role": "teamMember" },
//             { "rollNo": "22JN1A4547", "name": "D.BABY RANI", "email": "babyrani.87654@gmail.com", "password": "DBABYRANI@47", "role": "teamMember" }
//         ]
//     }
//     ,
//     {
//         "teamId": 5,
//         "members": [
//             { "rollNo": "22JN1A4325", "name": "EEMANI MARUTHI PRASANNA", "email": "prasannakuchipudi99@gmail.com", "password": "EEMANIMARUTHIPRASANNA@25", "role": "teamLead" },
//             { "rollNo": "22JN1A4526", "name": "GUNDEMEDA JYOTHI NAGESWARI", "email": "jyothigundemeda@gmail.com", "password": "GUNDEMEDAJYOTHINAGESWARI@26", "role": "teamMember" },
//             { "rollNo": "22JN1A4506", "name": "KALAGARLA AKHILA", "email": "akhilakalagarla@gmail.com", "password": "KALAGARLAAKHILA@06", "role": "teamMember" },
//             { "rollNo": "22B21A4230", "name": "K.N.V.S KIRAN KUMAR", "email": "kavalakiran98@gmail.com", "password": "K.N.V.S.KIRANKUMAR@30", "role": "teamMember" },
//             { "rollNo": "23B25A4201", "name": "K.V.D.RAGHU VARMA", "email": "vishnuvarma4201@gmail.com", "password": "K.V.D.RAGHUVARMA@01", "role": "teamMember" },
//             { "rollNo": "22B21A44A5", "name": "S.AKHIL", "email": null, "password": null, "role": "teamMember" }
//         ]
//     }
//     ,
//     {
//         "teamId": 6,
//         "members": [
//             { "rollNo": "22B21A44B1", "name": "Pilla Dayanand", "email": null, "password": null, "role": "teamLead" },
//             { "rollNo": "22B21A4341", "name": "M.RISHANTH", "email": "sunnymidde124@gmail.com", "password": "M.RISHANTH@41", "role": "teamMember" },
//             { "rollNo": "22JN1A4517", "name": "KOLLI PUSHPA", "email": "pushpakolli173@gmail.com", "password": "KOLLIPUSHPA@17", "role": "teamMember" },
//             { "rollNo": "22B21A4317", "name": "KONDEPUDI RAMA SAISRI", "email": "ramasaisrikondepudi@gmail.com", "password": "KONDEPUDIRAMASAISRI@17", "role": "teamMember" },
//             { "rollNo": "22JN1A4218", "name": "KUCHIPUDI SRI LAKSHMI PRASANNA", "email": "prasannakuchipudi99@gmail.com", "password": "KUCHIPUDISRILAKSHMIPRASANNA@18", "role": "teamMember" },
//             { "rollNo": "22B21A4518", "name": "T.SRIVALLI", "email": "srivallitamada82@gmail.com", "password": "T.SRIVALLI@18", "role": "teamMember" }
//         ]
//     }
//     ,
//     {
//         "teamId": 7,
//         "members": [
//             { "rollNo": "22JN1A4233", "name": "M. HEMA SATYAVENI", "email": "midathanasatya8@gmail.com", "password": "M.HEMASATYAVENI@33", "role": "teamLead" },
//             { "rollNo": "226Q1A4548", "name": "K.VENKATNARAYAN", "email": "venkatnarayanchowdary95@gmail.com", "password": "K.VENKATNARAYAN@48", "role": "teamMember" },
//             { "rollNo": "22B21A4558", "name": "KOMMOJU SATYA SAKETH", "email": null, "password": null, "role": "teamMember" },
//             { "rollNo": "22JN1A4261", "name": "NAMA ANURADHA", "email": "anuradhachowdarynama06@gmail.com", "password": "NAMAANURADHA@61", "role": "teamMember" },
//             { "rollNo": "22JN1A45D9", "name": "Y.SHARMILA", "email": "yellisettibaburao@gmail.com", "password": "Y.SHARMILA@D9", "role": "teamMember" }
//         ]
//     }
//     ,
//     {
//         "teamId": 8,
//         "members": [
//             { "rollNo": "22B21A4449", "name": "V.GURU BRAHMAM", "email": "vgurubrahmam338@gmail.com", "password": "V.GURUBRAHMAM@49", "role": "teamLead" },
//             { "rollNo": "22B21A4251", "name": "V.HARI CHARAN REDDY", "email": "haricharanreddyvinta@gmail.com", "password": "V.HARICHARANREDDY@51", "role": "teamMember" },
//             { "rollNo": "22JN1A4568", "name": "R.MOUNIKA", "email": "mounikarankireddy096@gmail.com", "password": "R.MOUNIKA@68", "role": "teamMember" },
//             { "rollNo": "226Q1A4507", "name": "ROKKAM KOKILA", "email": "rajaraorokkam5@gmail.com", "password": "ROKKAMKOKILA@07", "role": "teamMember" },
//             { "rollNo": "22JN1A45C9", "name": "SANTOSHI DADI", "email": "santhud2005@gmail.com", "password": "SANTOSHIDADI@C9", "role": "teamMember" },
//             { "rollNo": "22JN1A4255", "name": "T.VARSHITHA", "email": "tangeti2005@gmail.com", "password": "T.VARSHITHA@55", "role": "teamMember" }
//         ]
//     }
//     ,
//     {
//         "teamId": 9,
//         "members": [
//             { "rollNo": "22JN1A4322", "name": "NAGIREDDY KEERTHI DURGA", "email": "keerthinagireddy1711@gmail.com", "password": "NAGIREDDYKEERTHIDURGA@22", "role": "teamLead" },
//             { "rollNo": "22JN1A4502", "name": "NARASAPURAPU TEJASRI", "email": "tejasrinarasapurapu@gmail.com", "password": "NARASAPURAPUTEJASRI@02", "role": "teamMember" },
//             { "rollNo": "22B21A44A3", "name": "D.SAI SANTHOSH", "email": "saisanthoshdosapati2155@gmail.com", "password": "D.SAISANTHOSH@03", "role": "teamMember" },
//             { "rollNo": "22JN1A4522", "name": "CH.NIHARIKA", "email": null, "password": null, "role": "teamMember" },
//             { "rollNo": "226Q1A4206", "name": "M.VARUN", "email": "varun1430666@gmail.com", "password": "M.VARUN@06", "role": "teamMember" },
//             { "rollNo": "22JN1A4244", "name": "Y.HARITHA", "email": null, "password": null, "role": "teamMember" }
//         ]
//     }
//     ,
//     {
//         "teamId": 10,
//         "members": [
//             { "rollNo": "22B21A4278", "name": "M.SAHITHA", "email": "madapalasahitha@gmail.com", "password": "M.SAHITHA@78", "role": "teamLead" },
//             { "rollNo": "22B21A4398", "name": "P.JASMINE", "email": "jasminekumarip@gmail.com", "password": "P.JASMINE@98", "role": "teamMember" },
//             { "rollNo": "22JN1A4267", "name": "POTNURU RUTIKA SRI", "email": "rutikasripotnuru20@gmail.com", "password": "POTNURURUTIKASRI@67", "role": "teamMember" },
//             { "rollNo": "226Q1A4209", "name": "PILLA SURYA SAGAR", "email": "suryasagar5659@gmail.com", "password": "PILLASURYASAGAR@09", "role": "teamMember" },
//             { "rollNo": "226Q1A4212", "name": "PULLALACHERUVU SRINU", "email": "srinupullalacheruvu6@gmail.com", "password": "PULLALACHERUVUSRINU@12", "role": "teamMember" },
//             { "rollNo": "22B21A4231", "name": "P.C.H N.V.S. SRAVAN KUMAR", "email": "sravankumarpolisetti@gmail.com", "password": "P.C.HN.V.S.SRAVANKUMAR@31", "role": "teamMember" }
//         ]
//     }
// ];

// // Hash password function
// const hashPassword = async (password) => {
//     const saltRounds = 10;
//     return await bcrypt.hash(password, saltRounds);
// };

// // Clear existing team data and insert new teams
// const insertTeams = async () => {
//     try {
//         // Clear existing data
//         await Team.deleteMany({});
//         console.log("Existing teams cleared!");

//         // Hash passwords and prepare the data for insertion
//         for (const team of teams) {
//             for (const member of team.members) {
//                 if (member.password) {
//                     member.password = await hashPassword(member.password);
//                 }
//             }
//         }

//         // Insert new teams
//         await Team.insertMany(teams);
//         console.log("Teams added successfully!");
//     } catch (error) {
//         console.error("Error adding teams:", error);
//     }
// };

// // Execute the insertion
// insertTeams()
//     .finally(() => {
//         mongoose.connection.close(); // Close the connection when done
//     });


// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// // MongoDB connection string
// const uri = 'mongodb://localhost:27017/test'; // Replace 'test' with your actual database name

// // Connect to MongoDB
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.error("Could not connect to MongoDB", err));

// // Define the Coordinator schema
// const coordinatorSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// // Create the model
// const Coordinator = mongoose.model('Coordinator', coordinatorSchema);

// // Sample coordinator data
// const coordinators = [
//     { name: "Surendra", email: "surendra1@gmail.com", password: "SURENDRA@1" },
//     { name: "Mounika", email: "mounika2@gmail.com", password: "MOUNIKA@2" },
//     { name: "Gopi", email: "gopi3@gmail.com", password: "GOPI@3" },
//     // Add more coordinators as needed...
// ];

// // Hash password function
// const hashPassword = async (password) => {
//     const saltRounds = 10;
//     return await bcrypt.hash(password, saltRounds);
// };

// // Clear existing data and insert new coordinators
// const insertData = async () => {
//     try {
//         // Clear existing coordinators
//         await Coordinator.deleteMany({});
//         console.log("Existing coordinators cleared!");

//         // Hash passwords for coordinators
//         for (const coordinator of coordinators) {
//             coordinator.password = await hashPassword(coordinator.password);
//         }

//         // Insert new coordinators
//         await Coordinator.insertMany(coordinators);
//         console.log("Coordinators added successfully!");
//     } catch (error) {
//         console.error("Error adding coordinators:", error);
//     }
// };

// // Execute the insertion
// insertData()
//     .finally(() => {
//         mongoose.connection.close(); // Close the connection when done
//     });
