CS3800 Chat Application

Things that must be downloaded/updated to work:<br/>
[Latest Version of Node](https://nodejs.org/en/download/current) <br/>
[ Yarn ](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) <br/>

Setup client:<br/>
`cd client`<br/>
`yarn add socket.io-client`<br/>
`yarn add --dev typescript @types/react`<br/>

Run Client:<br/>
`yarn dev`<br/>

Setup Server:<br/>
`cd server`<br/>
`yarn add express config socket.io`<br/>
`yarn add @types/express @types/node ts-node typescript @types/config -D`<br/>

Run Server:<br/>
`yarn dev`<br/>