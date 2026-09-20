import hre from 'hardhat';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('Deploying ProvenanceRegistry to network:', hre.network.name);

  const [deployer] = await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();

  console.log('Deployer address:', deployer.account.address);
  const balance = await publicClient.getBalance({ address: deployer.account.address });
  console.log('Deployer balance:', balance.toString(), 'wei');

  const provenanceRegistry = await hre.viem.deployContract('ProvenanceRegistry', []);
  console.log('ProvenanceRegistry deployed successfully at address:', provenanceRegistry.address);

  // Write deployment result to deployments file
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    contractAddress: provenanceRegistry.address,
    deployerAddress: deployer.account.address,
    timestamp: new Date().toISOString(),
    explorerUrl: `https://testnet.snowtrace.io/address/${provenanceRegistry.address}`
  };

  const outDir = path.join(__dirname, '../deployments');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outDir, `${hre.network.name}-deployment.json`),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log('Deployment info saved to deployments folder:');
  console.log(JSON.stringify(deploymentInfo, null, 2));
}

main().catch((error) => {
  console.error('Deployment error:', error);
  process.exitCode = 1;
});
