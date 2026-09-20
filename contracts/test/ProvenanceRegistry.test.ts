import { expect } from 'chai';
import hre from 'hardhat';
import { keccak256, toHex } from 'viem';

describe('ProvenanceRegistry', function () {
  async function deployProvenanceRegistryFixture() {
    const [owner, alice, bob, charlie] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const provenanceRegistry = await hre.viem.deployContract('ProvenanceRegistry', []);

    return { provenanceRegistry, owner, alice, bob, charlie, publicClient };
  }

  const sampleFingerprint = keccak256(toHex('meme_raw_bytes_sample_1'));
  const remixFingerprint = keccak256(toHex('meme_remix_bytes_sample_2'));
  const zeroBytes32 = '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`;

  describe('First Registration (Canonical Origin)', function () {
    it('should register a new fingerprint and record Alice as the earliest registrant', async function () {
      const { provenanceRegistry, alice } = await deployProvenanceRegistryFixture();

      const tx = await provenanceRegistry.write.registerFingerprint(
        [sampleFingerprint, zeroBytes32, 0, 'ipfs://QmSampleMetadata1'],
        { account: alice.account }
      );

      const isRegistered = await provenanceRegistry.read.isRegistered([sampleFingerprint]);
      expect(isRegistered).to.be.true;

      const [record, exists] = await provenanceRegistry.read.getEarliestRegistration([sampleFingerprint]);
      expect(exists).to.be.true;
      expect(record.registeredBy.toLowerCase()).to.equal(alice.account.address.toLowerCase());
      expect(record.fingerprint).to.equal(sampleFingerprint);
      expect(record.relationship).to.equal(1); // Relationship.FIRST_REGISTRATION
      expect(record.metadataUri).to.equal('ipfs://QmSampleMetadata1');
    });

    it('should revert when attempting to register a zero fingerprint', async function () {
      const { provenanceRegistry, alice } = await deployProvenanceRegistryFixture();

      await expect(
        provenanceRegistry.write.registerFingerprint(
          [zeroBytes32, zeroBytes32, 0, 'ipfs://QmInvalid'],
          { account: alice.account }
        )
      ).to.be.rejected;
    });
  });

  describe('Duplicate / Later Registration Invariant', function () {
    it('should maintain Alice as the earliest registrant even if Bob submits the same fingerprint later', async function () {
      const { provenanceRegistry, alice, bob } = await deployProvenanceRegistryFixture();

      // Alice registers first
      await provenanceRegistry.write.registerFingerprint(
        [sampleFingerprint, zeroBytes32, 0, 'ipfs://QmAliceVersion'],
        { account: alice.account }
      );

      // Bob submits the same fingerprint later (repost / duplicate)
      await provenanceRegistry.write.registerFingerprint(
        [sampleFingerprint, zeroBytes32, 2, 'ipfs://QmBobRepost'], // Relationship.REPOST = 2
        { account: bob.account }
      );

      // Verify earliest registrant remains Alice
      const [earliestRecord] = await provenanceRegistry.read.getEarliestRegistration([sampleFingerprint]);
      expect(earliestRecord.registeredBy.toLowerCase()).to.equal(alice.account.address.toLowerCase());

      // Total registrations across history should be 2
      const total = await provenanceRegistry.read.totalRegistrations();
      expect(total).to.equal(2n);
    });
  });

  describe('Remix & Derivative Linkage', function () {
    it('should allow Charlie to register a remix linked to Alice’s original fingerprint', async function () {
      const { provenanceRegistry, alice, charlie } = await deployProvenanceRegistryFixture();

      // Alice registers original
      await provenanceRegistry.write.registerFingerprint(
        [sampleFingerprint, zeroBytes32, 0, 'ipfs://QmAliceOriginal'],
        { account: alice.account }
      );

      // Charlie registers remix linking to Alice
      await provenanceRegistry.write.registerFingerprint(
        [remixFingerprint, sampleFingerprint, 3, 'ipfs://QmCharlieRemix'], // Relationship.REMIX = 3
        { account: charlie.account }
      );

      const [charlieRecord] = await provenanceRegistry.read.getEarliestRegistration([remixFingerprint]);
      expect(charlieRecord.registeredBy.toLowerCase()).to.equal(charlie.account.address.toLowerCase());
      expect(charlieRecord.parentFingerprint).to.equal(sampleFingerprint);
      expect(charlieRecord.relationship).to.equal(3);
    });
  });
});
