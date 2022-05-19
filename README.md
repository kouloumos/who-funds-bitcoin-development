# Who Funds Bitcoin Development

> Bitcoin is open-source and decentralized. No single entity should control it. But equally, no single entity is responsible for improving it. It is easy for Bitcoin users and companies to free-ride without contributing to Bitcoin development — a classic tragedy of the commons [src](https://www.paradigm.xyz/2020/07/funding-bitcoin-development-2/)

An exploration tool for the Bitcoin open-source ecosystem. Showcasing who funds Bitcoin development and what developers are working on. 


## Contributing

### Adding yourself (or any other entity) to the graph
If you are currently working on a bitcoin related open source project, open a PR to get yourself added.

#### Addition template / available options

```json
{
  "name": "Your name",
  "twitter": "Twitter username without @",
  "github": "GitHub username",
  "website": "Personal website"
  "avatar": "Avatar URL OR GitHub-ID(you can find it in your GitHub avatar link) ",
  "description": "A short bio of 210 characters (limit might change in the future) ",
    "tags": [
    "Bitcoin Core",
    "Lightning"
  ]
}
```

### Adding a funding record
If you are funded, either by employment or grant, after adding yourself to the graph, please add a funding record. If a `.json` file of your employer or funder already exists, append the record to the end of it. If not, append the record to the misc funding sources ([employment.json](./src/data/funding/employment.json), [funding.json](./src/data/funding/funding.json))

#### Addition template / available options

```json
{
	"source": "Source of grant/employment",
	"target": "Grantee/employee",
	"btc": "{Grant amount if received in BTC} if available",
  	"amount": "{Grant amount if received in USD} if available",
   	"year": "{Year} the grant was announced OR [start, end?] period of employment",
   	"src": "Link to announcement"
}
```
## TO-DO

### Missing employment information 

- [ ] Blockstream
- [ ] DG Labs
- [ ] Acinq
- [ ] Spiral
- [ ] Lightning Labs

## Local build

The dependencies are managed via yarn. Once you have cloned this repo, you can setup the pacakges with `yarn install` and then `yarn start` runs the app in the development mode. 

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



