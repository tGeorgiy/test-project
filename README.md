Please follow the instruction:
Firstly run `npm install`
After that you need to provide url to yours Postgre database in dotenv file
Then you need to run `npx prisma db push` and `npx prisma db seed`
                    or `npx prisma migrate dev` and database will be automatically seeded
After that run `npm run start` to start the project.

Routes guide:

To Login:
POST on `localhost:3000/users/login`
{
		"username": "asdfg@asdfg.com",
		"password": "asdfg"
}

To Logout:
GET on `localhost:3000/users/logout`

To get list of users:
Need to be authenticated
GET on `localhost:3000/users/logout`

To get one user:
GET on `localhost:3000/users/logout/:userId`

To create user:
POST on `localhost:3000/users/:userId`
{
		"name": "New User",
		"phone": "+7845448488",
		"email": "newuser@newuser.com",
		"password": "newuser"
}

To update user:
PATCH on `localhost:3000/users/:userId`
{
		"phone": "+999988887777",
		"email": "newemail@newemail.com"
}

To delete user:
DELETE on `localhost:3000/users/:userId`

To get user appointments with hairdresser:
GET on `localhost:3000/users/:userId/assign/`

To assign user to timeslot:
POST on `localhost:3000/users/:userId/assign/`
{
	"hairdresserId": "hairdresserId",
	"timeSlotId": "timeSlotId"
}

To un-assign user from timeslot:
PATCH on `localhost:3000/users/:userId/assign/`
{
	"timeSlotId": "timeSlotId"
}

To find all hairdresser timeslots:
GET on `localhost:3000/time-slots/:hairdresserId`

To create timeslot for hairdresser:
POST on `localhost:3000/time-slots/`
{
	"hairdresserId": "hairdresserId",
	"slotStart": "Date ISO string",
	"slotEnd": "Date ISO string"
}

To delete timeslot:
DELETE on `localhost:3000/time-slots/`
Admin route and need to be no user appointment on this slot.

To get all hairdressers:
GET on `localhost:3000/hairdressers/`

To get one hairdressers:
GET on `localhost:3000/hairdressers/:hairdresserId`

To create hairdressers:
POST on `localhost:3000/hairdressers/`
{
	"userId": "userId",
	"spec": "specialization of hairdresser"
}
Authenticated route

To update hairdressers spec:
PATCH on `localhost:3000/hairdressers/:hairdresserId`
{
	"spec": "specialization of hairdresser"
}

To delete hairdressers:
DELETE on `localhost:3000/hairdressers/:hairdresserId`