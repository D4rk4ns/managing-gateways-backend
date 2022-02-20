# Gateways



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

- Frontend: React.js + Bootstrap 5
- Backend: NodeJS + Express + MongoDB REST API 

## How to?

1. Clone this repo: `git clone https://github.com/D4rk4ns/managing-gateways.git`
2. Move to the cloned directory: `cd `

