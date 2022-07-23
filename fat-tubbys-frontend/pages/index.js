import Head from 'next/head'
import Image from 'next/image'
import Web3Modal from 'web3modal'
import { useEffect, useRef, useState } from 'react'
import { Contract, providers, utils } from "ethers";
import Navbar from './Navbar'

export default function Home() {

  const [walletConnected, setWalletConnected] = useState(false)

  const [loading, setLoading] = useState(false)

  const web3ModalRef = useRef()

  const connectWallet = async () => {
    try {
      const provider = await getProviderOrSigner()
      console.log(provider.getAddress)
      setWalletConnected(true)
    } catch(err) {
      console.log(err)
    } 
  }

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect()
    const web3Provider = new providers.Web3Provider(provider)

    const { chainId } = await web3Provider.getNetwork()
    if (chainId !== 80001) {
      window.alert("Please change the network to Mumbai Testnet")
      throw new Error("Please change the network to Mumbai Testnet")
    }

    if (needSigner) {
      const signer = web3Provider.getSigner()
      return signer
    }

    return web3Provider
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      })

      connectWallet()
    }
  }, [walletConnected])

  return (
    <div>
      <Head>
        <title>Fat Tubbys</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

    </div>
  )
}