const axios = require('axios');
const nacl = require('tweetnacl');
const { PublicKey } = require('@solana/web3.js');

async function verifyTwitterToken(token) {
  try {
    const response = await axios.get('https://api.twitter.com/1.1/account/verify_credentials.json', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data.id_str;
  } catch (error) {
    throw new Error('Invalid Twitter token');
  }
}

async function verifySolanaSignature(publicKeyString, signedMessage, message) {
  try {
    const publicKey = new PublicKey(publicKeyString);
    const signature = Uint8Array.from(signedMessage);
    const messageUint8 = Uint8Array.from(message);

    return nacl.sign.detached.verify(messageUint8, signature, publicKey.toBytes());
  } catch (error) {
    console.error('Error verifying Solana signature:', error);
    return false;
  }
}

module.exports = { verifyTwitterToken, verifySolanaSignature };
