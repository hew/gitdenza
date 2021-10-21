import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import {nftaddress} from '../config';
import NFT from '../artifacts/contracts/GitDenza.sol/GitDenza.json';
import {motion} from 'framer-motion';
import {
  determineColumns,
  determineGap,
  determineRandomStyle,
  determineStyle,
  SEED,
} from '../utils';

const infuraId = '07238825609d49fe891a96e3f14ecf2a'

const container = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01,
    },
  },
};

export async function getServerSideProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://ropsten.infura.io/v3/${infuraId}`,
  );
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const seedItemId = await tokenContract.fetchLatestSeed();

  if (seedItemId.toNumber() === 0) {
    return {
      props: {
        hash: 'fef1e88d9251a29f9720ce447208dd654da3ec57', // random default
        mode: process.env.RANDOM_MODE === 'true' ? 'random' : 'normal',
      },
    };
  }

  const hash = await tokenContract.tokenURI(seedItemId.toNumber() - 1);

  return {
    props: {
      hash,
      mode: process.env.RANDOM_MODE === 'true' ? 'random' : 'normal',
    },
  };
}

export default function Home({hash, mode}) {
  const [seed, setSeed] = useState({
    hashArr: [],
    numbers: [],
    letters: [],
    numberTotal: 0,
    letterTotal: 0,
    ratio: 0.0,
  });

  useEffect(() => {
    setSeed(SEED(hash));
  }, [hash]);

  if (!seed?.numbers?.length) return null;



  const {ratio, numberTotal, letterTotal, hashArr} = seed;
  const {effect, data} = determineRandomStyle(ratio, mode);
  const columnCount = determineColumns(letterTotal, mode);
  const gridGap = determineGap(numberTotal, mode);
  const colors = determineStyle(ratio, mode);

  return (
    <div>
      {effect === 'DISTORT' && data}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{columnCount, gridGap}}
        transition={{type: 'spring'}}
      >
        {hashArr.map((_, index) => {
          const random = Math.floor(Math.random() * (colors.length - 0 + 1) + 0);

          const item = {
            hidden: {
              opacity: 0,
              backgroundColor: colors[0],
              color: colors[0],
              transform: effect === 'SKEW' ? data[0] : undefined,
            },
            show: {
              opacity: 1,
              backgroundColor: colors[random],
              color: colors[random],
              transform: effect === 'SKEW' ? data[1] : undefined,
            },
          };

          // TODO: implement "rando squares?"
          // const borders = ['0', 'f'].includes(char);

          return (
            <>
              <motion.div
                // data-border={borders ? 'true' : 'false'}
                key={index}
                variants={item}
                className="square"
              />
            </>
          );
        })}
      </motion.div>
    </div>
  );
}
