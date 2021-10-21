# Gitdenza

By hew

[![Netlify Status](https://api.netlify.com/api/v1/badges/92ae9d28-7022-4b70-aa7f-407dc5505682/deploy-status)](https://app.netlify.com/sites/flamboyant-stonebraker-bc9010/deploys)

## What Are We Looking At Here?

I recently saw Tyler Hobbs' [Fidenza collection](https://tylerxhobbs.com/fidenza), which centers around the use of [flow fields](https://tylerxhobbs.com/essays/2020/flow-fields).
I found this concept really interesting, but the math was a little much. I am not an artist or a much of a numbers guy, but the article states that _flow fields are based around grids_, and this is something that I can work with using my UI developer toolkit.

So put simply, this is a _super basic_ experiment in generative art.

## Website & Cryptonomics

Before I get into the cryptonomics, let's walk through how the website works:

### Dynamic / Random

- Theme-specific colors — I want to have some of re-loadability and randomness to the site, so with every reload the colors on the squares are re-organized.

### NFT-driven

- Theme - there are 4 themes
  - funk (30%)
  - deep (30%)
  - swiss (30%)
  - tosh (10%)
- Grid Columns
  - Four (40%)
  - Eight (30%)
  - Six (30%)
- Grid Gap
  - 10 (30%)
  - 6 (30%)
  - 4 (30%)
  - 0 (10%)
- Transforms
  - None (70%)
  - Skewed (20%)
  - Distorted (10%)

You mint a token for free (actually free, it's on Ropsten so just request some eth from the [Faucet](https://faucet.ropsten.be/)).

## Crypto Art: On-chain Or Off-chain Data?

Many of the NFT contracts on OpenSea are using IPFS to host a json file that contains the metadata for a given NFT token. When a peice of (for lack of a better word) "jpeg art"
is minted, a link is created to a json file hosted (typically) on IPFS that describes the metadata. That is one way to do things. Projects like Fidenza and the others on ArtBlocks
take a different approach where a seed algorithm is stored on-chain, and the art pieces are "minted" from the seed, which drives the creation of a completely new and original piece
of art.

Instead of hashing some algorithm or using IPFS, what I wanted to do with this project was instead save git hashes on-chain. Credit for this idea goes to [Matt DesLauriers](https://twitter.com/mattdesl/status/1449138381091377157).
