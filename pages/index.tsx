import { ConnectWallet, useAddress, useContract, useContractRead, useContractWrite, useClaimedNFTs, useOwnedNFTs } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const tokenType = ethers.utils.formatBytes32String('CHP01')
  // Contracts deployed to Mumbai Polygon Technology Network
  const NFT_CONTRACT_ADDR = "0x5aa0C98693C94D039056E5504594A708Cc68c424"
  const PUB_CONTRACT_ADDR = "0xD4273Bb3FAc03AA0e052e3A2A742A4654D7cb5Dc"
  const address = useAddress();
  // NFT Contract
  const { contract: tokenContract } = useContract(NFT_CONTRACT_ADDR)
  // Channel Publication Contract
  const { contract: publicationContract } = useContract(PUB_CONTRACT_ADDR);
  // Load user's NFTs
  const { data: nfts, isLoading: isReadingNfts } = useOwnedNFTs(tokenContract, address)
  // Load a NFT's publication
  const { data: publishedContent, isLoading } = useContractRead(publicationContract, "ChannelPublication.version")//, [tokenType, 2])
  console.log('My address: ', address)
  console.log('My NFTs: ', nfts, (nfts && nfts?.length > 0))
  console.log('Published Content: ', publishedContent, tokenType)

  // const { data: tokenURI, isLoading: loadingBalance } = useContractRead(
  //   contract,
  //   "tokenURI", // The name of the view/mapping/variable on your contract
  //   0
  // )
  // console.log('tokenURI: ', tokenURI)
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://thirdweb.com/">thirdweb</a>!
        </h1>

        <p className={styles.description}>
          Get started by configuring your desired network in{" "}
          <code className={styles.code}>pages/_app.tsx</code>, then modify the{" "}
          <code className={styles.code}>pages/index.tsx</code> file!
        </p>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <div className={styles.grid}>
          <h2>My NFT Count: {nfts?.length}</h2>
          <p>{publishedContent}</p>
        </div>
        
        <div className={styles.grid}>
          {
            //(nfts && nfts?.length > 0) && 
            nfts?.map((nft: NFT, index: number) => {
              return <a href={`/nfts/${nft.metadata.id}`} className={styles.card} key={index}>
                <h2>{ nft.metadata.name }</h2>
                <p>
                  { nft.metadata.description }
                </p>
                <img style={ { maxWidth: '100%' } } src={nft.metadata.image!} alt={ `${nft.metadata.name}` } />
              </a>
            })
          }
        </div>

        <div>
          <h2>Claim</h2>
          <iframe
            src="https://gateway.ipfscdn.io/ipfs/QmPaVYdGue8zEXFKqrtVHpvzBvufM1DYzw5n1of3KVPG88/nft-drop.html?contract=0x5aa0C98693C94D039056E5504594A708Cc68c424&chainId=80001"
            width="600px"
            height="600px"
            frameBorder="0"
          >
          </iframe>
        </div>
      </main>
    </div>
  );
};

export default Home;
