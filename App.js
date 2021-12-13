
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { exec } = require("child_process");
var cmd=require('node-cmd');
const { stdout } = require('process')

//*nix supports multiline commands

//    const d=cmd.runSync(
//         `node scripts/eth-matic-bridge.js`,
//         function(err, data, stderr){
//             console.log('examples dir now contains the example file along with : ',data)
//             //console.log(">>>>>DATA",d);
//         }
//     );
// console.log(">>>>>DATA",d);


// exec("node scripts/eth-matic-bridge.js", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
// console.log(stdout)
// app.get('/', function (req, res) {
//     //res.send('Hello World')
//     // res.json({
//     //     message:'Hello World'
//     // })
//     exec("truffle exec scripts/eth-token-balance.js --network ethTestnet", (error, stdout, stderr) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//         console.log(`stdout: ${stdout}`);

//         res.json({
//             message:stdout
//         })
//     });
    
//   })


app.get('/deployBSCcontract', function (req, res) {
    
    console.log("Deploying Binance Contract");
    console.log("Contract Deployment take upto 2 mins...");
    let contractdata=cmd.runSync(
        `truffle migrate --reset --network bscTestnet`,
        function(err, data, stderr){
            console.log('examples dir now contains the example file along with : ',data)
            
        }
    );
    console.log(">>RAw DATA_____",contractdata);
    console.log(">>>> Contract DATA",contractdata.data);
    
    console.log(contractdata.data.replace(/['"]+/g, ''));
    res.json({
        message:"Binance Contract Deployed successfully...."
    })
    
})

app.get('/deployPloygoncontract', function (req, res) {
 
    console.log("Deploying Ploygon Contract");
    console.log("Contract Deployment take upto 2 mins...");
    let contractdata=cmd.runSync(
        `truffle migrate --reset --network matic`,
        function(err, data, stderr){
            console.log('examples dir now contains the example file along with : ',data)
            
        }
    );
    console.log(">>RAw DATA_____",contractdata);
    console.log(">>>> Contract DATA",contractdata.data);
    
    console.log(contractdata.data.replace(/['"]+/g, ''));
    res.json({
        message:"Polygon Contract Deployed successfully...."
    })
    
})
app.get('/getBSCtokenbalance', function (req, res) {
    exec("truffle exec scripts/BscTokenBalance.js --network bscTestnet", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        stdout=stdout.replace(/[^0-9]/g, '')
        res.json({
            message:stdout+" tokens are in Binance network."
        })
    });
    
  })
  app.get('/getPolygontokenbalance', function (req, res) {
    exec("truffle exec scripts/MaticTokenBalance.js --network matic", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        stdout=stdout.replace(/[^0-9]/g, '')
        res.json({
            message:stdout+" tokens are in Polygon network."
        })
    });
    
  })

  app.get('/transferBinance2Polygon', function (req, res) {
    exec("truffle exec scripts/BscMaticTransfer.js --network bscTestnet", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        //stdout=stdout.replace(/[^0-9]/g, '')
        res.json({
            message:"Tokens are transfered"
        })
    });
    
  })

//   app.get('/Bridge_ETH2Ploy', function (req, res) {
 
//     console.log("Starting Bridge Between Ethereum To Matic....");
//     let getdata=cmd.runSync(
//         `node scripts/eth-matic-bridge.js`,
//         function(err, data, stderr){
//             console.log('examples dir now contains the example file along with : ',data)
            
//         }
//     );
//     console.log(">>RAw DATA_____",getdata);
//     console.log(">>>> Contract DATA",contractdata.data);
    
//     console.log(contractdata.data.replace(/['"]+/g, ''));
//     res.json({
//         message:"Polygon Contract Deployed successfully...."
//     })
    
//})
app.listen(process.env.PORT,(err) =>{
    console.log("Nodejs is running in PORT", process.env.PORT)
})

//console.log('Using network ethTestnet.\n\n1000\n'.replace(/[^0-9]/g, ''));

//ethereumcontractdata ='\nCompiling your contracts...\n===========================\n> Everything is up to date, there is nothing to compile.\n\n\n\nStarting migrations...\n======================\n> Network name:    \'ethTestnet\'\n> Network id:      4\n> Block gas limit: 29970648 (0x1c950d8)\n\n\n1_initial_migration.js\n======================\n\n   Replacing \'Migrations\'\n   ----------------------\n   > transaction hash:    0x77e8b88a22cbab9b617f60252d7b5007a7c31fb989366b0bc927d8b122d29ef3\n   > Blocks: 1            Seconds: 8\n   > contract address:    0x7991d58d566cD2119eEbCFa8A1E8ba2335CC6EA2\n   > block number:        9703430\n   > block timestamp:     1637834765\n   > account:             0xD5DD2a5A5e24a40BfFB87B0dbD85D1C5dB7dBAc2\n   > balance:             6.850387324283220802\n   > gas used:            245600 (0x3bf60)\n   > gas price:           2.500000014 gwei\n   > value sent:          0 ETH\n   > total cost:          0.0006140000034384 ETH\n\n\n   > Saving migration to chain.\n   > Saving artifacts\n   -------------------------------------\n   > Total cost:     0.0006140000034384 ETH\n\n\n2_deploy_contracts.js\n=====================\n\n   Replacing \'TokenEth\'\n   --------------------\n   > transaction hash:    0xe06b41d5afc76c45c638bcb55e6f5edd5e70bdb4dfd886c9087ed1fc85ec46a7\n   > Blocks: 5            Seconds: 93\n   > contract address:    0xde7AdAf85c893af48d65b35b7CBfcdB4d1F17763\n   > block number:        9703435\n   > block timestamp:     1637834840\n   > account:             0xD5DD2a5A5e24a40BfFB87B0dbD85D1C5dB7dBAc2\n   > balance:             6.846164906754600189\n   > gas used:            1643054 (0x19122e)\n   > gas price:           2.500000017 gwei\n   > value sent:          0 ETH\n   > total cost:          0.004107635027931918 ETH\n\n\n   Replacing \'BridgeEth\'\n   ---------------------\n   > transaction hash:    0x8406aaaf360ca2f4390864969463c4c0af52acb4562690eefd863f4b645d14d9\n   > Blocks: 2            Seconds: 30\n   > contract address:    0x2Fe90B94053D9956A52e4ae9439dED508B0A047a\n   > block number:        9703444\n   > block timestamp:     1637834975\n   > account:             0xD5DD2a5A5e24a40BfFB87B0dbD85D1C5dB7dBAc2\n   > balance:             6.844487841743124874\n   > gas used:            599553 (0x92601)\n   > gas price:           2.500000017 gwei\n   > value sent:          0 ETH\n   > total cost:          0.001498882510192401 ETH\n\n\n   > Saving migration to chain.\n   > Saving artifacts\n   -------------------------------------\n   > Total cost:     0.005606517538124319 ETH\n\n\nSummary\n=======\n> Total deployments:   3\n> Final cost:          0.006220517541562719 ETH\n\n\n';




//let contractdata = { data:'\nCompiling your contracts...\n===========================\n> Everything is up to date, there is nothing to compile.\n\n\n\nStarting migrations...\n======================\n> Network name:    \'matic\'\n> Network id:      80001\n> Block gas limit: 20000000 (0x1312d00)\n\n\n1_initial_migration.js\n======================\n\n   Replacing \'Migrations\'\n   ----------------------\n   > transaction hash:    0xd8c43cc3de2c0592bedec5c23100937604a6d7043e52f0d7893a1459ebb31630\n   > Blocks: 7            Seconds: 17\n   > contract address:    0x8996f20FD337d80E40d67Ed66bAb011af91D2904\n   > block number:        21903971\n   > block timestamp:     1637838256\n   > account:             0xD5DD2a5A5e24a40BfFB87B0dbD85D1C5dB7dBAc2\n   > balance:             2.705924989466288\n   > gas used:            245600 (0x3bf60)\n   > gas price:           3.5 gwei\n   > value sent:          0 ETH\n   > total cost:          0.0008596 ETH\n\n\n   > Saving migration to chain.\n   > Saving artifacts\n   -------------------------------------\n   > Total cost:           0.0008596 ETH\n\n\n2_deploy_contracts.js\n=====================\n\n   Replacing \'TokenMatic\'\n   ----------------------\n   > transaction hash:    0xe14e0402d44717aa15ab8e6f6b873bad6938741b1b919a683088d02811238ed9\n   > Blocks: 5            Seconds: 13\n   > contract address:    0x2C6b2903C2ef3d1921104F1C050059f383686F8c\n   > block number:        21903991\n   > block timestamp:     1637838296\n   > account:             0xD5DD2a5A5e24a40BfFB87B0dbD85D1C5dB7dBAc2\n   > balance:             2.700013436966288\n   > gas used:            1643102 (0x19125e)\n   > gas price:           3.5 gwei\n   > value sent:          0 ETH\n   > total cost:          0.005750857 ETH\n\n\n   Replacing \'BridgeMatic\'\n   -----------------------\n   > transaction hash:    0x33978215a4e99cefb790a5c91d781740b94abff85f2eca0d690195a6d1e8fbb3\n   > Blocks: 9            Seconds: 21\n   > contract address:    0x122538E0b8c6259c1DE90A902d61cbE50c79bb36\n   > block number:        21904001\n   > block timestamp:     1637838320\n   > account:             0xD5DD2a5A5e24a40BfFB87B0dbD85D1C5dB7dBAc2\n   > balance:             2.697915043466288\n   > gas used:            599541 (0x925f5)\n   > gas price:           3.5 gwei\n   > value sent:          0 ETH\n   > total cost:          0.0020983935 ETH\n\n\n   > Saving migration to chain.\n   > Saving artifacts\n   -------------------------------------\n   > Total cost:        0.0078492505 ETH\n\n\nSummary\n=======\n> Total deployments:   3\n> Final cost:          0.0087088505 ETH\n\n\n',
  // err: null,
  // stderr: null }