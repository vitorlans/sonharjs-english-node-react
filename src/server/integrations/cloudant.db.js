import Cloudant from 'cloudant';

let cloudant_url = process.env.DATABASE_URL;
//var services = {};
// Check if services are bound to your project
// if(process.env.VCAP_SERVICES)
// {
// 	services = JSON.parse(process.env.VCAP_SERVICES);
// 	if(services.cloudantNoSQLDB) //
// 	{
// 		cloudant_url = services.cloudantNoSQLDB[0].credentials.url;
// 		//console.log("Name = " + services.cloudantNoSQLDB[0].name);
// 		//console.log("URL = " + services.cloudantNoSQLDB[0].credentials.url);
//         //console.log("username = " + services.cloudantNoSQLDB[0].credentials.username);
// 		//console.log("password = " + services.cloudantNoSQLDB[0].credentials.password);
// 	}
// }


let cloudant = Cloudant({url: cloudant_url});
let dbname = process.env.DATABASE_NAME;
let db;

//Create database
cloudant.db.create(dbname, function(err, data) {
	db = cloudant.db.use(dbname);
});

db = cloudant.db.use(dbname);
export default db;
