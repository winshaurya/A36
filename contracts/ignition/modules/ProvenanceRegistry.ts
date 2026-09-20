import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const ProvenanceRegistryModule = buildModule('ProvenanceRegistryModule', (m) => {
  const provenanceRegistry = m.contract('ProvenanceRegistry', []);

  return { provenanceRegistry };
});

export default ProvenanceRegistryModule;
