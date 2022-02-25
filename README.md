# Managing Gateways - Backend 



## Description 

This sample project is managing gateways - master devices that control multiple peripheral devices. 

Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database. 

When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

Each gateway has:
- a unique serial number (string), 
- human-readable name (string),
- IPv4 address (to be validated),
- multiple associated peripheral devices. 

Each peripheral device has:
- a UID (number),
- vendor (string),
- date created,
- status - online/offline.

## Stack
- Backend: NodeJS + Express + MongoDB REST API 

## How to?

1. Clone this repo: `git clone https://github.com/D4rk4ns/managing-gateways.git`
2. Move to the cloned directory: `cd `
3. Execute `npm install`


### Production environment

1. Rename the file `.env.template` to `.env` and adjust the variables values properly
2. Run `npm start`
3. The app should be ready on http://localhost:3000

### Development environment

1. Rename the file `.env.template` to `.env` and adjust the variables values properly
2. Execute `npm install` to get all dependencies including dev ones
3. Then execute `nodemon start`
4. The app should be ready on http://localhost:3000

### Testing environment

1. Rename the file `.env.template` to `.env` and adjust the variables values properly
2. Execute `npm install` to get all dependencies including test ones
3. Run `npm test`

### Live demo
You can use https://managing-gateways-backend.herokuapp.com/ as a live demo to test
the different functions of the REST API.

#### Gateway
| API Method       | METHOD |Route                |
| -----------      | ------ | -----------         |
| getGateways      | GET    | /gateway            |
| getGateway       | GET    | /gateway/:id        |
| createGateway    | POST   | /gateway            |
| updateGateway    | PUT    | /gateway/:id        |
| deleteGateway    | DELETE | /gateway/:id        |
| addPeripheral    | PUT    | /gateway/:id/add    |
| removePeripheral | DELETE | /gateway/:id/remove |

#### Device
| API Method       | METHOD |Route                |
| -----------      | ------ | -----------         |
| getDevices       | GET    | /device             |
| getDevice        | GET    | /device/:id         |
| createDevice     | POST   | /device             |
| updateDevice     | PUT    | /device/:id         |
| deleteDevice     | DELETE | /device/:id         |
